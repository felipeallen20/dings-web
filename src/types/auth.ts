export type AuthMode = "login" | "registro";

export type AuthStep = "email" | "otp";

export interface Session {
  userId: string;
  name: string;
  email: string;
  provider: "email" | "google";
  createdAt: string;
}

export interface OtpChallenge {
  email: string;
  code: string;
  expiresAt: number;
}