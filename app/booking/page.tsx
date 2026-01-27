"use client";

import { useState, useEffect } from "react";

export default function BookingDebugPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("/api/cloudbeds/availability?checkin=2026-02-01&checkout=2026-02-03");
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || `HTTP ${response.status}`);
        }
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Cloudbeds API Debug</h1>
      
      {loading && (
        <p className="text-blue-600">Loading API...</p>
      )}
      
      {error && (
        <p className="text-red-600">Error: {error}</p>
      )}
      
      {!loading && !error && data && (
        <pre className="bg-white p-4 rounded shadow overflow-auto max-h-[80vh] text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </main>
  );
}
