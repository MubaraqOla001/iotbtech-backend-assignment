import express from 'express';
import { requestLogger } from './middleware/requestLogger.js';
import { requireApiKey } from './middleware/requireApiKey.js';
import { errorHandler } from './middleware/errorHandler.js';
import productRoutes from './routes/product.routes.js';

const app = express();
const PORT = 3000;

// 1. Global Interceptors (Middlewares)
// Allows your server to parse incoming JSON data blocks sent via PUT requests
app.use(express.json()); 

// Connect your custom terminal logging camera system
app.use(requestLogger);

// Attach the API Key security check layer
app.use(requireApiKey);

// 2. Base Endpoint Routes Mount
// Plugs your product signpost mapping directory directly under the /api path namespace
app.use('/api', productRoutes);

// 3. Fallback Route: 404 Route Catch Block
// If a user types an address that doesn't exist, return a clean message
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint resource not found' });
});

// 4. Global Error Safety Net Middleware
// Must be loaded absolutely LAST in the stack so it catches failures from preceding elements
app.use(errorHandler);

// 5. System Ignition Engine Launch
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🚀 IOTBTech Application Engine Initialized Live!`);
    console.log(`🌐 Server listening actively at: http://localhost:${PORT}`);
    console.log(`==================================================\n`);
});
