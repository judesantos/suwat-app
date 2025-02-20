
import * as jwt from 'jsonwebtoken';

type JWTOptions = {
    algorithm?: string;
    expiresIn?: string | number; // seconds
    notBefore?: string | number;
    audience?: string | string[];
    issuer?: string
    jwtid?: string
}

export class JWT {

  private _algo: string|undefined;

  constructor(alg:string = 'HS256') {
    this._algo = alg
  }

  createToken(payload: any, options: JWTOptions, key: string) {
    const _options: jwt.SignOptions = {
      algorithm: this?._algo as jwt.Algorithm,
      ...options
    }
    return jwt.sign(payload, key, _options);
  }

  verifyToke(key: string, token: string) {
    jwt.verify(token, key)
  }

}