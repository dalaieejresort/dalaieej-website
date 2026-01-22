"use client";

const CLIENT_ID = "live1_177930597200001_alX1GtenuJ5UZsTkg7KhqECV";
const REDIRECT_URI = "https://098718ea-addb-41fe-93a7-6bb3eb8e8db0-00-jrmc4jbez5aj.picard.replit.dev/api/cloudbeds/auth";
const CLOUDBEDS_AUTH_URL = `https://hotels.cloudbeds.com/api/v1.1/oauth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=read:reservation,read:room`;

export default function SetupPage() {
  return (
    <main className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <h1 className="font-serif text-4xl text-[#1A3C34] mb-4">
          Cloudbeds Setup
        </h1>
        <p className="font-sans text-[#1A3C34]/70 mb-8">
          Connect your Cloudbeds account to enable real-time room availability
          and booking management.
        </p>

        <a
          href={CLOUDBEDS_AUTH_URL}
          className="inline-block px-8 py-4 bg-[#1A3C34] text-[#F5F5DC] font-serif text-lg uppercase tracking-widest hover:bg-[#1A3C34]/90 transition-all rounded-lg"
        >
          Connect Cloudbeds
        </a>

        <div className="mt-12 text-left bg-white p-6 rounded-lg shadow-md">
          <h2 className="font-serif text-xl text-[#1A3C34] mb-4">
            Before You Start
          </h2>
          <ul className="space-y-3 text-sm text-[#1A3C34]/70">
            <li className="flex items-start gap-2">
              <span className="text-[#1A3C34]">1.</span>
              <span>
                Make sure <code className="bg-gray-100 px-1 rounded">CLOUDBEDS_CLIENT_ID</code> and{" "}
                <code className="bg-gray-100 px-1 rounded">CLOUDBEDS_CLIENT_SECRET</code> are set in
                Secrets.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1A3C34]">2.</span>
              <span>
                Set your Redirect URI in Cloudbeds to:{" "}
                <code className="bg-gray-100 px-1 rounded text-xs break-all">
                  {REDIRECT_URI}
                </code>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1A3C34]">3.</span>
              <span>
                After connecting, save the Refresh Token to your Secrets as{" "}
                <code className="bg-gray-100 px-1 rounded">CLOUDBEDS_REFRESH_TOKEN</code>.
              </span>
            </li>
          </ul>
        </div>

        <p className="mt-8">
          <a
            href="/"
            className="text-[#1A3C34]/50 text-sm hover:text-[#1A3C34] transition-colors"
          >
            &larr; Back to Home
          </a>
        </p>
      </div>
    </main>
  );
}
