/**
 * NoorTools Qibla Finder
 * Precision spherical trigonometry bearing calculation to the Holy Kaaba,
 * device orientation sensor compass, distance in kilometers, and calibration tools.
 */

import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  RotateCcw,
  Navigation,
  Info,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { UserSettings } from '../types';
import {
  calculateQiblaBearing,
  calculateDistanceToKaaba,
  KAABA_COORDINATES,
} from '../services/qibla';

interface QiblaViewProps {
  settings: UserSettings;
}

export const QiblaView: React.FC<QiblaViewProps> = ({ settings }) => {
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [hasCompassSupport, setHasCompassSupport] = useState<boolean | null>(null);
  const [manualOffset, setManualOffset] = useState<number>(0);
  const [isCalibrated, setIsCalibrated] = useState<boolean>(true);

  const qiblaBearing = calculateQiblaBearing(settings.latitude, settings.longitude);
  const distanceKm = calculateDistanceToKaaba(settings.latitude, settings.longitude);

  // Device orientation listener for physical mobile devices
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // webkitCompassHeading is iOS Safari true heading (0-360)
      if ('webkitCompassHeading' in e && typeof (e as any).webkitCompassHeading === 'number') {
        setDeviceHeading((e as any).webkitCompassHeading);
        setHasCompassSupport(true);
      } else if (e.alpha !== null) {
        // Standard Android / standard orientation (alpha is heading relative to magnetic north)
        setDeviceHeading(360 - e.alpha);
        setHasCompassSupport(true);
      } else {
        setHasCompassSupport(false);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, true);
    } else {
      setHasCompassSupport(false);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  // Needle angle is Qibla bearing relative to current device heading
  const currentHeading = deviceHeading !== null ? deviceHeading : manualOffset;
  const relativeNeedleRotation = (qiblaBearing - currentHeading + 360) % 360;

  // Determine if phone is pointing directly at Kaaba (within 5 degrees)
  const isAligned = Math.abs(relativeNeedleRotation) < 5 || Math.abs(relativeNeedleRotation - 360) < 5;

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
            <Compass className="w-4 h-4" />
            <span>Kaaba Alignment • اتجاه القبلة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
            Qibla Finder
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Bearing towards the Holy Kaaba in Makkah Al-Mukarramah ({KAABA_COORDINATES.latitude.toFixed(2)}°N, {KAABA_COORDINATES.longitude.toFixed(2)}°E)
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950 px-4 py-2 rounded-xl border border-emerald-200/60 dark:border-emerald-900/60">
          <MapPin className="w-4 h-4 text-emerald-600" />
          <div className="text-left">
            <div className="text-[10px] text-stone-500">Your Location</div>
            <div className="text-xs font-bold text-stone-900 dark:text-white">{settings.city}</div>
          </div>
        </div>
      </div>

      {/* Alignment Status Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition ${
          isAligned
            ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg ring-4 ring-emerald-500/20'
            : 'bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
        }`}
      >
        <div className="flex items-center gap-3">
          {isAligned ? (
            <CheckCircle2 className="w-6 h-6 text-white shrink-0 animate-bounce" />
          ) : (
            <Navigation className="w-6 h-6 text-stone-400 shrink-0" />
          )}
          <div>
            <div className="font-bold text-sm">
              {isAligned ? 'Facing the Qibla Directly!' : 'Rotate your phone until the needle points up'}
            </div>
            <div className="text-xs opacity-80">
              Qibla Bearing: <strong className="font-mono">{qiblaBearing}°</strong> • Distance:{' '}
              <strong className="font-mono">{distanceKm.toLocaleString()} km</strong>
            </div>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xl font-extrabold font-mono">{qiblaBearing}°</span>
        </div>
      </div>

      {/* Interactive Compass Dial */}
      <div className="bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col items-center justify-center">
        {/* Outer Circular Compass Ring */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-stone-200 dark:border-stone-800 bg-radial from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-950 flex items-center justify-center shadow-inner select-none">
          {/* Cardinal Directions */}
          <span className="absolute top-2 font-bold text-xs text-rose-600">N</span>
          <span className="absolute right-3 font-bold text-xs text-stone-400">E</span>
          <span className="absolute bottom-2 font-bold text-xs text-stone-400">S</span>
          <span className="absolute left-3 font-bold text-xs text-stone-400">W</span>

          {/* Compass Rose Degree Markings */}
          <div className="absolute inset-4 rounded-full border border-dashed border-stone-300 dark:border-stone-700 pointer-events-none" />

          {/* Rotating Compass Needle */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${relativeNeedleRotation}deg)` }}
          >
            {/* North-pointing Needle Head with Kaaba Icon */}
            <div className="absolute top-6 flex flex-col items-center">
              {/* Kaaba Representation Icon */}
              <div className="w-8 h-8 rounded-md bg-stone-950 border border-amber-400 flex items-center justify-center text-[10px] text-amber-300 font-bold shadow-md">
                كعبة
              </div>
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[24px] border-b-emerald-600 mt-1 shadow-sm" />
            </div>

            {/* South-pointing Tail */}
            <div className="absolute bottom-6 flex flex-col items-center">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[20px] border-t-stone-400" />
            </div>

            {/* Center Pivot Jewel */}
            <div className="w-6 h-6 rounded-full bg-stone-900 border-2 border-emerald-500 shadow-md z-10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>

        {/* Live Degree & Orientation Feedback */}
        <div className="mt-6 text-center space-y-1">
          <div className="text-2xl font-black font-mono text-emerald-800 dark:text-emerald-400">
            {qiblaBearing}° from North
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {deviceHeading !== null
              ? `Sensor Active (Heading: ${Math.round(deviceHeading)}°)`
              : 'Desktop Mode: Hold device horizontally to calibrate sensor'}
          </p>
        </div>

        {/* Manual Heading Simulator Slider (For desktop or unsupported browsers) */}
        {hasCompassSupport === false && (
          <div className="w-full max-w-md mt-6 p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-center">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 block mb-2">
              Simulate Device Heading: <strong className="font-mono">{manualOffset}°</strong>
            </label>
            <input
              type="range"
              min="0"
              max="359"
              value={manualOffset}
              onChange={(e) => setManualOffset(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>0° (North)</span>
              <span>90° (East)</span>
              <span>180° (South)</span>
              <span>270° (West)</span>
            </div>
          </div>
        )}
      </div>

      {/* Accuracy and Sensor Calibration Guide */}
      <div className="bg-stone-50 dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400 space-y-2">
        <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5 text-sm">
          <Info className="w-4 h-4 text-emerald-600" />
          Tips for Maximum Compass Accuracy
        </h4>
        <ul className="list-disc list-inside space-y-1 pl-1">
          <li>Hold your phone flat parallel to the ground (like a real magnetic compass).</li>
          <li>Keep away from magnetic phone cases, metal tables, or strong electrical fields.</li>
          <li>If the needle seems sticky, wave your phone in a <strong>figure-8 motion</strong> in the air to recalibrate its magnetometer.</li>
          <li>The calculation uses the Great Circle spherical bearing: tan(θ) = sin(Δλ) / (cos(φ1)tan(φ2) - sin(φ1)cos(Δλ)).</li>
        </ul>
      </div>
    </div>
  );
};
