"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  tempC: number;
  tempF: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const displayTemp = () => {
    if (loading) return "Loading...";
    if (error || !weather) return "-5.0°C | 23.0°F";
    return `${weather.tempC.toFixed(1)}°C | ${weather.tempF.toFixed(1)}°F`;
  };

  return (
    <div className="text-center py-8">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 font-sans">
        Weather Conditions
      </p>
      
      <p className="font-heading text-5xl md:text-6xl text-forest-green">
        {displayTemp()}
      </p>

      <div className="mt-6">
        <a
          href="#"
          className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 hover:border-black transition-colors text-forest-green"
        >
          Webcam
        </a>
      </div>

      <p className="text-[10px] text-gray-400 mt-4">
        Weather data and forecasts are provided by OpenWeatherMap. © OpenWeather Ltd used under the Open License.
      </p>
    </div>
  );
}
