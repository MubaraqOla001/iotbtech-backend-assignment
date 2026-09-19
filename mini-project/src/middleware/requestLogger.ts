import type { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
    // 1. Capture the exact date and time of the request
    const timestamp = new Date().toISOString();
    
    // 2. Capture the HTTP Method (GET, PUT, etc.) and the requested URL path
    const method = req.method;
    const url = req.url;

    // 3. Print a clean, formatted log entry directly to your developer terminal
    console.log(`[${timestamp}] 🚀 Incoming Request: ${method} to ${url}`);

    // 4. CRITICAL STEP: Call next() to allow the visitor to pass through the checkpoint
    next();
}
