import * as jwt from 'jsonwebtoken';



export const signToken = (payload: any) => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret) {
    throw new Error('JWT_SECRET missing');
  }

  return jwt.sign(payload, secret, {
    expiresIn: (expiresIn || '1d') as jwt.SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET missing');
  }

  return jwt.verify(token, secret);
};