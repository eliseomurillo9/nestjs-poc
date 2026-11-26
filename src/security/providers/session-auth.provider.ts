
import { Injectable } from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify } from 'jose';

@Injectable()
export class AuthenticationProvider {

  async jwtVerify(token: string) {
    const ENV = process.env
    const DOMAIN = ENV.AUTH_DOMAIN;
    const JWKS = createRemoteJWKSet(
      new URL(
        `${DOMAIN}.well-known/jwks.json`
      ),
    );

    try {
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: `${DOMAIN}`,
        audience: ENV.AUTH_AUDIENCE,
        algorithms: ['RS256'],
      });

      return payload;
    } catch (err) {
      console.error('JWT verification failed:', err);
      throw new Error('JWT verification failed');
    }

  }
}

