import type { Request, Response, NextFunction } from 'express';

// In Express, a middleware with exactly 4 parameters is treated automatically as an Error Handler
export function errorHandler(
    err: unknown, 
    req: Request, 
    res: Response, 
    next: NextFunction
): void {
    // 1. Log the severe stack trace to your terminal so you can read and debug it
    console.error(`🚨 Critical Server Crash Caught:`, err);

    // 2. Extract structural message text safely if it exists
    const errorMessage = err instanceof Error ? err.message : 'Unknown systems failure';

    // 3. Return a clean, safe server response to the user
    // 500 status means: "Something broke unexpectedly on our side of the fence"
    res.status(500).json({
        error: 'Internal Server Error',
        message: errorMessage
    });
}
