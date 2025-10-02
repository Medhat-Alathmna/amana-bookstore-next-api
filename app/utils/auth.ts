import { NextRequest } from 'next/server';

export function basicAuth(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
        return null;
    }

    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const username = auth[0];
    const password = auth[1];
    
    return { username, password };
}
