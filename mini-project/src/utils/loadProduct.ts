import { readFileSync, existsSync } from 'fs';
import path from 'path';

// 1. Re-define the Product structure here so this file understands it
interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
}

export function loadProducts(): Product[] {
    // 2. Safely find the absolute path to your products.csv file
    const csvPath = path.resolve('data/products.csv');

    // 3. Safety Guard: If the script runs before generate.ts, return an empty list
    if (!existsSync(csvPath)) {
        console.warn(`⚠️ Warning: CSV file not found at ${csvPath}. Returning empty array.`);
        return [];
    }

    // 4. Read the entire CSV file as text string
    const fileContent = readFileSync(csvPath, 'utf-8');
    
    // 5. Break the file text down into an array of individual lines
    const lines = fileContent.split('\n');
    const products: Product[] = [];

    let isFirstLine = true;

    for (const line of lines) {
        // Clean up any hidden spaces or carriage returns
        const trimmedLine = line.trim();
        if (!trimmedLine) continue; // Skip empty rows

        // Skip the header row ("id,name,category,price,stock")
        if (isFirstLine) {
            isFirstLine = false;
            continue;
        }

        // 6. Split row by comma columns
        const [idStr, name, category, priceStr, stockStr] = trimmedLine.split(',');

        // Strict TypeScript Guard: Validate that all expected columns exist
        if (!idStr || !name || !category || !priceStr || !stockStr) continue;

        // 7. Reconstruct data types and push cleanly into our products array
        products.push({
            id: Number(idStr),
            name: name,
            category: category,
            price: Number(priceStr),
            stock: Number(stockStr)
        });
    }

    console.log(`📦 Database loaded successfully: Loaded ${products.length} products.`);
    return products;
}
