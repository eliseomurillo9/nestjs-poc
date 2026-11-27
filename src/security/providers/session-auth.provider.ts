
import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { JOSEError } from 'jose/errors';

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
    } catch (e) {
       if (e instanceof JOSEError) {
        switch (e.code) {
          case "ERR_JWT_EXPIRED":
            Logger.error(e.message)
            throw new UnauthorizedException("Unauthorized: Token is expired");
          case 'ERR_JWS_INVALID':
            Logger.error(e.message)
            throw new UnauthorizedException("Unauthorized: Invalid token")
          // no default
        }
      }

      Logger.error(e);
      throw new InternalServerErrorException("Error: We got an unexpected error while validating the JWT")

    }

  }
}

