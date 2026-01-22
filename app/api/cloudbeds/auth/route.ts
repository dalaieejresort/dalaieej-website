import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const CLOUDBEDS_OAUTH_URL = "https://hotels.cloudbeds.com/api/v1.1/oauth";
const CLOUDBEDS_TOKEN_URL = "https://hotels.cloudbeds.com/api/v1.1/access_token";

export async function GET(request: NextRequest) {
  const clientId = process.env.CLOUDBEDS_CLIENT_ID;
  const clientSecret = process.env.CLOUDBEDS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new NextResponse(
      "Error: CLOUDBEDS_CLIENT_ID and CLOUDBEDS_CLIENT_SECRET must be set in Secrets.",
      { status: 500, headers: { "Content-Type": "text/plain" } }
    );
  }

  const code = request.nextUrl.searchParams.get("code");
  const currentUrl = `${request.nextUrl.origin}/api/cloudbeds/auth`;

  if (!code) {
    const authUrl = new URL(CLOUDBEDS_OAUTH_URL);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", currentUrl);
    authUrl.searchParams.set("scope", "read:reservation,read:room");

    return NextResponse.redirect(authUrl.toString());
  }

  try {
    const response = await axios.post(
      CLOUDBEDS_TOKEN_URL,
      new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: currentUrl,
        code: code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Cloudbeds OAuth Success</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 600px;
      margin: 100px auto;
      padding: 20px;
      background: #F5F5DC;
      color: #1A3C34;
    }
    .success {
      background: #1A3C34;
      color: #F5F5DC;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .token-box {
      background: white;
      padding: 15px;
      border-radius: 8px;
      word-break: break-all;
      font-family: monospace;
      font-size: 12px;
      margin: 10px 0;
      border: 2px solid #1A3C34;
    }
    h1 { margin: 0 0 10px 0; }
    .label { font-weight: bold; margin-top: 15px; }
    .note { color: #666; font-size: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="success">
    <h1>SUCCESS!</h1>
    <p>Cloudbeds OAuth completed successfully.</p>
  </div>
  
  <p class="label">Access Token (expires in ${expires_in}s):</p>
  <div class="token-box">${access_token}</div>
  
  <p class="label">Refresh Token (save this to Secrets as CLOUDBEDS_REFRESH_TOKEN):</p>
  <div class="token-box">${refresh_token || "No refresh token returned"}</div>
  
  <p class="note">
    <strong>Important:</strong> Copy the Refresh Token above and save it as 
    <code>CLOUDBEDS_REFRESH_TOKEN</code> in your Secrets tab.
  </p>
  
  <p><a href="/booking">Go to Booking Page</a></p>
</body>
</html>
    `;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("OAuth token exchange error:", error);

    let errorMessage = "Failed to exchange code for token";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    }

    return new NextResponse(`Error: ${errorMessage}`, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
