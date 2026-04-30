const PAYPAL_BASE_URL =
  process.env.PAYPAL_BASE_URL || "https://api-m.paypal.com";

const getAccessToken = async () => {
  try {
    const clientId = process.env.PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_SECRET;

    if (!clientId || !secret) {
      throw new Error("Missing PayPal credentials");
    }

    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");

    const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("PayPal Token Error:", data);
      throw new Error(data.error_description || "Token request failed");
    }

    if (!data.access_token) {
      throw new Error("No access token received from PayPal");
    }

    return data.access_token;
  } catch (error) {
    console.error("Get Access Token Error:", error.message);
    throw error;
  }
};

export default getAccessToken;