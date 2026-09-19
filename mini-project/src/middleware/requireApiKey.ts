import type { Request, Response, NextFunction } from 'express';

// Define a hardcoded secret key for development testing
const VALID_API_KEY = 'iotbtech_secret_passphrase_2026';

export function requireApiKey(req: Request, res: Response, next: NextFunction): void {
    // 1. Safe pass for read-only requests: 
    // Anyone is allowed to look at data (GET) without a key.
    if (req.method === 'GET') {
        next();
        return;
    }

    // 2. Extract the API Key from the custom headers
    const clientApiKey = req.headers['x-api-key'];

    // 3. Security Guard Check: Verify if the key is present and correct
    if (!clientApiKey || clientApiKey !== VALID_API_KEY) {
        console.warn(`🔒 Security Blocked: Unauthorized ${req.method} attempt to ${req.url}`);
        
        // 401 status tells the user: "You lack the credentials to access this asset"
        res.status(401).json({ 
            error: 'Unauthorized access. A valid X-API-Key header is required for modifications.' 
        });
        return; 
    }

    // 4. Pass verification successfully -> let the change proceed to the controller
    next();
}
