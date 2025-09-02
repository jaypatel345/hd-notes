import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export interface GoogleUserInfo {
  sub: string;
  name: string;
  email: string;
  picture?: string;
}

export const verifyGoogleToken = async (token: string): Promise<GoogleUserInfo | null> => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return null;
    }

    return {
      sub: payload.sub,
      name: payload.name || '',
      email: payload.email || '',
      picture: payload.picture
    };
  } catch (error) {
    console.error('Google token verification error:', error);
    return null;
  }
}; 




