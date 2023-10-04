import { type APIRoute } from "astro";
import type { OAuthToken } from "../types/oauth.types";

export const POST: APIRoute = async ({ request }) => {
  const { code } = await request.json();

  if (!code) {
    return new Response(
      JSON.stringify({
        error: "No code provided",
      }),
      {
        status: 400,
      }
    );
  }

  const formData = new URLSearchParams();
  formData.append("grant_type", "authorization_code");
  formData.append("client_id", import.meta.env.PUBLIC_AUTH0_CLIENT_ID);
  formData.append("client_secret", import.meta.env.AUTH0_SECRET);
  formData.append("code", code);
  formData.append("redirect_uri", import.meta.env.PUBLIC_AUTH0_REDIRECT_URI);

  const authTokenRequest = await fetch(
    `https://${import.meta.env.PUBLIC_AUTH0_DOMAIN}/oauth/token`,
    {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const authToken = (await authTokenRequest.json()) as OAuthToken;

  const response = new Response(JSON.stringify(authToken));

  response.headers.set("Content-Type", "application/json");

  return response;
};
