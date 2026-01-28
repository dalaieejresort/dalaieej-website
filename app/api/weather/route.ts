import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=50.5&lon=100.15&appid=${apiKey}`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error(`OpenWeatherMap API error: ${response.status}`);
    }

    const data = await response.json();
    
    const tempKelvin = data.main.temp;
    const tempC = tempKelvin - 273.15;
    const tempF = (tempC * 9/5) + 32;

    return NextResponse.json({
      tempC: Math.round(tempC * 10) / 10,
      tempF: Math.round(tempF * 10) / 10,
      description: data.weather?.[0]?.description || 'Unknown',
      icon: data.weather?.[0]?.icon || '01d'
    });
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
