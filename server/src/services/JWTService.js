const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/config').jwtSecret;

class JWTService {
    static sign(payload, secret = jwtSecret, expiry = '24h') {
        return jwt.sign(payload, secret, { expiresIn: expiry });
    }

    static verify(token, secret = jwtSecret) {
        return jwt.verify(token, secret);
    }
}
module.exports = JWTService;