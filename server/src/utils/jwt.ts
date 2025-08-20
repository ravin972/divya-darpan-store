import jwt, { type SignOptions, type Secret } from 'jsonwebtoken';

interface TokenPayload { userId: string; email: string }

export const signToken = (payload: TokenPayload) => {
  const secret: Secret = process.env.JWT_SECRET || 'dev-secret';
  const expiresInRaw = process.env.JWT_EXPIRES_IN || '7d';
  const options: SignOptions = { expiresIn: expiresInRaw as unknown as number } as SignOptions;
  return jwt.sign(payload, secret, options);
};