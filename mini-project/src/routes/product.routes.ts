import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';

const router = Router();

// 1. Route for GET requests to /api/products/:id
router.get('/products/:id', productController.getProductById);

// 2. Route for PUT requests to /api/products/:id
router.put('/products/:id', productController.updateProduct);

// 3. Route for DELETE requests to /api/products/:id
router.delete('/products/:id', productController.deleteProduct);

export default router;
