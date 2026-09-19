import { loadProducts } from '../utils/loadProduct.js';

export interface Product { id: number; name: string; category: string; price: number; stock: number; }
let products: Product[] = loadProducts();      // read data/products.csv at boot
let nextId = products.length + 1;
export function findProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
export function updateProduct(id: number, data: Partial<Product>): Product | null {
  const product = products.find((p) => p.id === id);
  if (!product) return null;
  Object.assign(product, data);
  return product;
}
export function deleteProduct(id: number): boolean {
  const before = products.length;
  products = products.filter((p) => p.id !== id);
  return products.length < before;
}
