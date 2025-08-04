import jwt, {JwtPayload} from 'jsonwebtoken'
import config from "../config/config";

export const generateJwt = (payload: JwtPayload) => {
    const secret = config.JWT_SECRET
    return jwt.sign(payload, secret, {
        expiresIn: '1d' // Token expiration time
    })
}
