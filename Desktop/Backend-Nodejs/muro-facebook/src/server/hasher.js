import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;
const TOKEN_EXPIRATION = 60*2;
const TOKEN_SECRET = 'asdf';

// export const makeHash = value => bcrypt.hashSync

export const matchHash = (plain, hashed) => bcrypt.compareSync(plain, hashed);

export const createToken = data => jwt.sign(data, TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION
});

export const validateToken = token => jwt.verify(token, TOKEN_SECRET);