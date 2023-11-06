import jsonWebToken, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  token?: string | boolean | JwtPayload | undefined;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('MASTER_TOKEN_SECRET is not set.');
    return res.status(500).send('Internal Server Error');
  }

  jsonWebToken.verify(token, secret, (err: VerifyErrors | null, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.token = decoded;
    next();
  });
};
