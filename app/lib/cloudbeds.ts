import axios from "axios";

const CLOUDBEDS_API_BASE = "https://hotels.cloudbeds.com/api/v1.1";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

export async function getAccessToken(): Promise<string> {
  if (tokenCache && tokenCache.expiresAt > Date.now() + 60000) {
    return tokenCache.accessToken;
  }

  const clientId = process.env.CLOUDBEDS_CLIENT_ID;
  const clientSecret = process.env.CLOUDBEDS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Cloudbeds credentials not configured. Please set CLOUDBEDS_CLIENT_ID and CLOUDBEDS_CLIENT_SECRET.");
  }

  try {
    const response = await axios.post<TokenResponse>(
      `${CLOUDBEDS_API_BASE}/access_token`,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.data.access_token) {
      throw new Error("Invalid token response from Cloudbeds");
    }

    const { access_token, expires_in } = response.data;

    tokenCache = {
      accessToken: access_token,
      expiresAt: Date.now() + (expires_in || 3600) * 1000,
    };

    return access_token;
  } catch (error) {
    tokenCache = null;
    
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      
      if (status === 401 || status === 403) {
        throw new Error(`Cloudbeds authentication failed: Invalid credentials. ${message}`);
      }
      throw new Error(`Cloudbeds API error (${status}): ${message}`);
    }
    
    throw new Error("Failed to authenticate with Cloudbeds");
  }
}

export async function cloudbedsGet<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
  const accessToken = await getAccessToken();
  const propertyId = process.env.CLOUDBEDS_PROPERTY_ID;

  if (!propertyId) {
    throw new Error("Cloudbeds property ID not configured. Please set CLOUDBEDS_PROPERTY_ID.");
  }

  const url = new URL(`${CLOUDBEDS_API_BASE}${endpoint}`);
  url.searchParams.set("propertyID", propertyId);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  try {
    const response = await axios.get<T>(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;
      
      if (status === 401) {
        tokenCache = null;
        throw new Error("Cloudbeds session expired. Please retry.");
      }
      throw new Error(`Cloudbeds API error (${status}): ${message}`);
    }
    throw error;
  }
}

export interface RoomType {
  roomTypeID: string;
  roomTypeName: string;
  roomTypeDescription: string;
  maxGuests: number;
  adultsIncluded: number;
  childrenIncluded: number;
  roomTypePhotos: string[];
  roomTypeFeatures: string[];
}

export interface RoomRate {
  roomTypeID: string;
  roomTypeName: string;
  roomsAvailable: number;
  rateID: string;
  rateName: string;
  totalRate: number;
  currency: string;
}

export interface AvailabilityResponse {
  success: boolean;
  data: {
    propertyID: string;
    startDate: string;
    endDate: string;
    roomTypes: RoomRate[];
  };
}

export interface RoomTypesResponse {
  success: boolean;
  data: RoomType[];
}
