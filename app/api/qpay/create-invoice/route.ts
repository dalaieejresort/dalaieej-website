import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const QPAY_AUTH_URL = "https://merchant.qpay.mn/v2/auth/token";
const QPAY_INVOICE_URL = "https://merchant.qpay.mn/v2/invoice";

interface InvoiceRequest {
  amount: number;
  description?: string;
  callbackUrl?: string;
}

interface QPayTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface QPayInvoiceResponse {
  invoice_id: string;
  qr_text: string;
  qr_image: string;
  qPay_shortUrl: string;
  urls: Array<{
    name: string;
    description: string;
    logo: string;
    link: string;
  }>;
}

async function getQPayToken(): Promise<string> {
  const username = process.env.QPAY_USERNAME;
  const password = process.env.QPAY_PASSWORD;

  if (!username || !password) {
    throw new Error("QPay credentials not configured");
  }

  const credentials = Buffer.from(`${username}:${password}`).toString("base64");

  try {
    const response = await axios.post<QPayTokenResponse>(
      QPAY_AUTH_URL,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("QPay token obtained successfully");
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("QPay Auth Error:", error.response?.data || error.message);
    }
    throw error;
  }
}

async function createInvoice(
  token: string,
  amount: number,
  description: string,
  callbackUrl: string
): Promise<QPayInvoiceResponse> {
  const invoiceCode = process.env.QPAY_INVOICE_CODE || "DALAI_EEJ_INVOICE";
  const senderCode = uuidv4();

  console.log("Creating QPay invoice with:", {
    invoice_code: invoiceCode,
    amount: amount,
    callback_url: callbackUrl,
  });

  try {
    const response = await axios.post<QPayInvoiceResponse>(
      QPAY_INVOICE_URL,
      {
        invoice_code: invoiceCode,
        sender_invoice_no: senderCode,
        invoice_receiver_code: "terminal",
        invoice_description: description,
        amount: amount,
        callback_url: callbackUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("QPay invoice created successfully:", response.data.invoice_id);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("QPay Invoice Error:", error.response?.data || error.message);
    }
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: InvoiceRequest = await request.json();
    const { amount, description = "Dalai Eej Resort Payment", callbackUrl } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

    const webhookUrl =
      callbackUrl ||
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/qpay/webhook`;

    const token = await getQPayToken();
    const invoice = await createInvoice(token, amount, description, webhookUrl);

    return NextResponse.json({
      success: true,
      invoiceId: invoice.invoice_id,
      qrCode: invoice.qr_image,
      qrText: invoice.qr_text,
      shortUrl: invoice.qPay_shortUrl,
      bankUrls: invoice.urls,
    });
  } catch (error) {
    console.error("QPay invoice creation error:", error);

    if (axios.isAxiosError(error)) {
      const qpayError = error.response?.data;
      const statusCode = error.response?.status || 500;
      
      console.error("QPay API Response:", {
        status: statusCode,
        data: JSON.stringify(qpayError),
        url: error.config?.url,
      });

      let userMessage = "Failed to create QPay invoice";
      if (statusCode === 401) {
        userMessage = "QPay authentication failed - invalid credentials";
      } else if (statusCode === 400) {
        userMessage = `QPay rejected the request: ${qpayError?.message || qpayError?.error || JSON.stringify(qpayError)}`;
      }

      return NextResponse.json(
        {
          error: userMessage,
          details: qpayError,
          statusCode,
        },
        { status: statusCode }
      );
    }

    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: errMessage },
      { status: 500 }
    );
  }
}
