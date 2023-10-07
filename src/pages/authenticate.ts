import { type APIRoute } from "astro";
import type { OAuthToken, OAuthUserInfo } from "../types/oauth.types";

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

  try {
    const token = await getTokenInfo(code);
    const user = await getUserInfo(token.access_token);

    return new Response(
      JSON.stringify({
        token,
        user,
      })
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error,
      }),
      {
        status: 400,
      }
    );
  }
};

const getUserInfo = async (accessToken: string): Promise<OAuthUserInfo> => {
  const request = await fetch(
    `https://${import.meta.env.PUBLIC_AUTH0_DOMAIN}/userinfo`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (request.status !== 200) {
    throw new Error("Error fetching auth token");
  }

  return await request.json();
};

const getTokenInfo = async (code: string): Promise<OAuthToken> => {
  const formData = new URLSearchParams();
  formData.append("grant_type", "authorization_code");
  formData.append("client_id", import.meta.env.PUBLIC_AUTH0_CLIENT_ID);
  formData.append("client_secret", import.meta.env.AUTH0_SECRET);
  formData.append("code", code);
  formData.append("redirect_uri", import.meta.env.PUBLIC_AUTH0_REDIRECT_URI);

  const request = await fetch(
    `https://${import.meta.env.PUBLIC_AUTH0_DOMAIN}/oauth/token`,
    {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (request.status !== 200) {
    throw new Error("Error fetching auth token");
  }

  return await request.json();
};
