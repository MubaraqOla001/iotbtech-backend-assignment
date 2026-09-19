import type { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service.js';

// 1. GET /products/:id — Get a single product details
export function getProductById(req: Request, res: Response, next: NextFunction): void {
    try {
        const id = Number(req.params.id);
        
        // Safety check: If ID isn't a valid number
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid product ID format' });
            return;
        }

        const product = productService.findProductById(id);

        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        next(error); // Passes any server crashes to your error handling middleware
    }
}

// 2. PUT /products/:id — Update product statistics
export function updateProduct(req: Request, res: Response, next: NextFunction): void {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid product ID format' });
            return;
        }

        // Call the service to update the in-memory array array database
        const updatedProduct = productService.updateProduct(id, req.body);

        if (!updatedProduct) {
            res.status(404).json({ error: 'Product not found to update' });
            return;
        }

        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        next(error);
    }
}

// 3. DELETE /products/:id — Remove a product completely
export function deleteProduct(req: Request, res: Response, next: NextFunction): void {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid product ID format' });
            return;
        }

        const isDeleted = productService.deleteProduct(id);

        if (!isDeleted) {
            res.status(404).json({ error: 'Product not found to delete' });
            return;
        }

        // 204 means "Success, but there's no content to show you anymore because it's gone"
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}
