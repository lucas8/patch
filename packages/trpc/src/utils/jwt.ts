import { sign, verify } from 'jsonwebtoken';

export const COOKIE_NAME = 'sid';

type JWTPayload = {
	id: string;
};

// TODO: implement 2 key refresh/auth system
export const createToken = async (id: string) => {
	if (!process.env.ACCESS_TOKEN_SECRET) {
		throw new Error('Access token not set');
	}

	return sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		// 30 days
		expiresIn: '30d'
	});
};

export const verifyToken = (token: string) => {
	if (!process.env.ACCESS_TOKEN_SECRET) {
		throw new Error('Access token not set');
	}

	return verify(token, process.env.ACCESS_TOKEN_SECRET) as JWTPayload;
};
