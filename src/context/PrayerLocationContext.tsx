/**
 * NoorTools Centralized Location & Prayer State Context
 * 
 * Provides a single, authoritative source of truth across the entire app for:
 * 1. Location state (GPS coordinates, manual city fallback, permissions, privacy)
 * 2. Live synchronized clock (ticks every second, avoids component drift)
 * 3. Daily prayer schedule & countdown (guarantees next prayer accuracy, midnight handling)
 * 4. Dual Gregorian and Hijri calendar dates
 */

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { UserSettings, CalculationMethod, AsrMadhhab, HighLatitudeRule, PrayerTimesData } from '../types';
import { storageService } from '../services/storage';
import { calculatePrayerTimes } from '../services/prayerTimes';
import { getHijriDate, PrayerStatusEvaluation } from '../services/dateTime';

export interface LocationState {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  timezone: string;
  isGps: boolean;
  isLoading: boolean;
  error: string | null;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'unsupported';
}

export interface PrayerContextValue {
  // Location
  location: LocationState;
  requestGpsLocation: () => Promise<void>;
  setManualLocation: (city: string, country: string, lat: number, lng: number) => void;
  resetLocation: () => void;

  // Real-time Clock
  currentTime: Date;
  hijriDate: ReturnType<typeof getHijriDate>;

  // Prayer Times & Evaluation
  prayerTimes: PrayerTimesData;
  evaluation: PrayerStatusEvaluation;
  method: CalculationMethod;
  madhhab: AsrMadhhab;
  highLatitudeRule: HighLatitudeRule;
  updateCalculationSettings: (settings: {
    method?: CalculationMethod;
    madhhab?: AsrMadhhab;
    highLatitudeRule?: HighLatitudeRule;
  }) => void;
}

const PrayerLocationContext = createContext<PrayerContextValue | null>(null);

export const MAJOR_WORLD_CITIES = [
  { city: 'Makkah', country: 'Saudi Arabia', latitude: 21.4225, longitude: 39.8262, method: 'Makkah' as CalculationMethod },
  { city: 'Madinah', country: 'Saudi Arabia', latitude: 24.4672, longitude: 39.6111, method: 'Makkah' as CalculationMethod },
  { city: 'Jerusalem', country: 'Palestine', latitude: 31.7784, longitude: 35.2354, method: 'MWL' as CalculationMethod },
  { city: 'Cairo', country: 'Egypt', latitude: 30.0444, longitude: 31.2357, method: 'Egypt' as CalculationMethod },
  { city: 'Istanbul', country: 'Turkey', latitude: 41.0082, longitude: 28.9784, method: 'MWL' as CalculationMethod },
  { city: 'London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, method: 'MWL' as CalculationMethod },
  { city: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006, method: 'ISNA' as CalculationMethod },
  { city: 'Toronto', country: 'Canada', latitude: 43.6532, longitude: -79.3832, method: 'ISNA' as CalculationMethod },
  { city: 'Dubai', country: 'United Arab Emirates', latitude: 25.2048, longitude: 55.2708, method: 'Gulf' as CalculationMethod },
  { city: 'Karachi', country: 'Pakistan', latitude: 24.8607, longitude: 67.0011, method: 'Karachi' as CalculationMethod },
  { city: 'Jakarta', country: 'Indonesia', latitude: -6.2088, longitude: 106.8456, method: 'MWL' as CalculationMethod },
  { city: 'Kuala Lumpur', country: 'Malaysia', latitude: 3.139, longitude: 101.6869, method: 'MWL' as CalculationMethod },
  { city: 'Sydney', country: 'Australia', latitude: -33.8688, longitude: 151.2093, method: 'MWL' as CalculationMethod },
  { city: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522, method: 'MWL' as CalculationMethod },
  { city: 'Berlin', country: 'Germany', latitude: 52.52, longitude: 13.405, method: 'MWL' as CalculationMethod },
  { city: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, method: 'MWL' as CalculationMethod },
];

export interface PrayerLocationProviderProps {
  children: React.ReactNode;
  settings?: UserSettings;
  onUpdateSettings?: (newSettings: Partial<UserSettings>) => void;
}

export const PrayerLocationProvider: React.FC<PrayerLocationProviderProps> = ({
  children,
  settings: propSettings,
  onUpdateSettings,
}) => {
  // Load saved settings
  const [internalSettings, setInternalSettings] = useState<UserSettings>(() => storageService.getSettings());
  const effectiveSettings = propSettings || internalSettings;

  const updateSettingsState = useCallback(
    (newSettings: UserSettings, partial?: Partial<UserSettings>) => {
      setInternalSettings(newSettings);
      if (onUpdateSettings) {
        onUpdateSettings(partial || newSettings);
      }
    },
    [onUpdateSettings]
  );

  // Location state
  const [location, setLocation] = useState<LocationState>(() => ({
    latitude: effectiveSettings.latitude || 21.4225,
    longitude: effectiveSettings.longitude || 39.8262,
    city: effectiveSettings.city || 'Makkah',
    country: 'Saudi Arabia',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    isGps: !!effectiveSettings.location?.useGps,
    isLoading: false,
    error: null,
    permissionStatus: 'prompt',
  }));

  // Synchronize when propSettings updates
  useEffect(() => {
    if (propSettings) {
      setInternalSettings(propSettings);
      if (
        propSettings.latitude &&
        propSettings.longitude &&
        (propSettings.latitude !== location.latitude || propSettings.longitude !== location.longitude)
      ) {
        setLocation((prev) => ({
          ...prev,
          latitude: propSettings.latitude || prev.latitude,
          longitude: propSettings.longitude || prev.longitude,
          city: propSettings.city || prev.city,
        }));
      }
    }
  }, [propSettings]);

  // Synchronized live clock
  const [currentTime, setCurrentTime] = useState<Date>(() => new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Check initial browser geolocation permission state safely
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          setLocation((prev) => ({
            ...prev,
            permissionStatus: result.state as 'prompt' | 'granted' | 'denied',
          }));
          result.onchange = () => {
            setLocation((prev) => ({
              ...prev,
              permissionStatus: result.state as 'prompt' | 'granted' | 'denied',
            }));
          };
        })
        .catch(() => {
          // Permissions API query not supported in this environment
        });
    }
  }, []);

  // Request GPS Location handler
  const requestGpsLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Geolocation is not supported by your browser.',
        permissionStatus: 'unsupported',
      }));
      return;
    }

    setLocation((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 min cache
        });
      });

      const { latitude, longitude } = position.coords;

      // Attempt reverse geocoding using free OpenStreetMap Nominatim or fallback to Local Coordinates
      let detectedCity = `Near ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;
      let detectedCountry = '';

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          { headers: { 'Accept-Language': 'en' } }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.address) {
            detectedCity =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.county ||
              detectedCity;
            detectedCountry = data.address.country || '';
          }
        }
      } catch {
        // Reverse geocoding network fail, keep coordinate label
      }

      const updatedLocation: LocationState = {
        latitude,
        longitude,
        city: detectedCity,
        country: detectedCountry,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        isGps: true,
        isLoading: false,
        error: null,
        permissionStatus: 'granted',
      };

      setLocation(updatedLocation);

      // Persist in local settings
      const partialUpdate: Partial<UserSettings> = {
        latitude,
        longitude,
        city: detectedCity,
        location: {
          useGps: true,
          city: detectedCity,
          country: detectedCountry,
          latitude,
          longitude,
        },
      };
      const newSettings = storageService.saveSettings(partialUpdate);
      updateSettingsState(newSettings, partialUpdate);
    } catch (err: any) {
      let errorMsg = 'Could not retrieve your location.';
      if (err.code === 1) {
        errorMsg = 'Location permission was denied. You can select your city manually below.';
      } else if (err.code === 2) {
        errorMsg = 'Location position unavailable. Please check your network connection.';
      } else if (err.code === 3) {
        errorMsg = 'Location request timed out. Please try again.';
      }

      setLocation((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMsg,
        permissionStatus: err.code === 1 ? 'denied' : prev.permissionStatus,
      }));
    }
  }, [updateSettingsState]);

  // Set Manual Location handler
  const setManualLocation = useCallback(
    (city: string, country: string, lat: number, lng: number) => {
      const updated: LocationState = {
        latitude: lat,
        longitude: lng,
        city,
        country,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        isGps: false,
        isLoading: false,
        error: null,
        permissionStatus: location.permissionStatus,
      };

      setLocation(updated);

      const partialUpdate: Partial<UserSettings> = {
        latitude: lat,
        longitude: lng,
        city,
        location: {
          useGps: false,
          city,
          country,
          latitude: lat,
          longitude: lng,
        },
      };
      const newSettings = storageService.saveSettings(partialUpdate);
      updateSettingsState(newSettings, partialUpdate);
    },
    [location.permissionStatus, updateSettingsState]
  );

  // Reset Location handler
  const resetLocation = useCallback(() => {
    setManualLocation('Makkah', 'Saudi Arabia', 21.4225, 39.8262);
  }, [setManualLocation]);

  // Update Calculation Settings handler
  const updateCalculationSettings = useCallback(
    (newCalcs: {
      method?: CalculationMethod;
      madhhab?: AsrMadhhab;
      highLatitudeRule?: HighLatitudeRule;
    }) => {
      const updated = storageService.saveSettings(newCalcs);
      updateSettingsState(updated, newCalcs);
    },
    [updateSettingsState]
  );

  // Calculate Hijri Date
  const hijriDate = useMemo(() => {
    return getHijriDate(currentTime, 0);
  }, [currentTime]);

  // Authoritative Prayer Times calculation (recalculated deterministically each second)
  const prayerData = useMemo(() => {
    return calculatePrayerTimes({
      latitude: location.latitude,
      longitude: location.longitude,
      date: currentTime,
      method: effectiveSettings.calculationMethod || effectiveSettings.prayerMethod || 'MWL',
      madhhab: effectiveSettings.madhhab || effectiveSettings.asrMadhhab || 'standard',
      highLatitudeRule: effectiveSettings.highLatitudeRule || 'none',
      referenceTime: currentTime,
    });
  }, [location.latitude, location.longitude, currentTime, effectiveSettings]);

  const value = useMemo<PrayerContextValue>(
    () => ({
      location,
      requestGpsLocation,
      setManualLocation,
      resetLocation,
      currentTime,
      hijriDate,
      prayerTimes: prayerData,
      evaluation: prayerData.evaluation,
      method: effectiveSettings.calculationMethod || effectiveSettings.prayerMethod || 'MWL',
      madhhab: effectiveSettings.madhhab || effectiveSettings.asrMadhhab || 'standard',
      highLatitudeRule: effectiveSettings.highLatitudeRule || 'none',
      updateCalculationSettings,
    }),
    [
      location,
      requestGpsLocation,
      setManualLocation,
      resetLocation,
      currentTime,
      hijriDate,
      prayerData,
      effectiveSettings,
      updateCalculationSettings,
    ]
  );

  return (
    <PrayerLocationContext.Provider value={value}>
      {children}
    </PrayerLocationContext.Provider>
  );
};

export function usePrayerLocation(): PrayerContextValue {
  const context = useContext(PrayerLocationContext);
  if (!context) {
    console.warn('usePrayerLocation accessed outside PrayerLocationProvider, using fallback values.');
    const now = new Date();
    const fallbackSettings = storageService.getSettings();
    const fallbackPrayer = calculatePrayerTimes({
      latitude: fallbackSettings.latitude || 21.4225,
      longitude: fallbackSettings.longitude || 39.8262,
      date: now,
      method: fallbackSettings.calculationMethod || fallbackSettings.prayerMethod || 'MWL',
      madhhab: fallbackSettings.madhhab || fallbackSettings.asrMadhhab || 'standard',
      highLatitudeRule: fallbackSettings.highLatitudeRule || 'none',
      referenceTime: now,
    });
    return {
      location: {
        latitude: fallbackSettings.latitude || 21.4225,
        longitude: fallbackSettings.longitude || 39.8262,
        city: fallbackSettings.city || 'Makkah',
        country: 'Saudi Arabia',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
        isGps: false,
        isLoading: false,
        error: null,
        permissionStatus: 'prompt',
      },
      requestGpsLocation: async () => {},
      setManualLocation: () => {},
      resetLocation: () => {},
      currentTime: now,
      hijriDate: getHijriDate(now, 0),
      prayerTimes: fallbackPrayer,
      evaluation: fallbackPrayer.evaluation,
      method: fallbackSettings.calculationMethod || fallbackSettings.prayerMethod || 'MWL',
      madhhab: fallbackSettings.madhhab || fallbackSettings.asrMadhhab || 'standard',
      highLatitudeRule: fallbackSettings.highLatitudeRule || 'none',
      updateCalculationSettings: () => {},
    };
  }
  return context;
}
