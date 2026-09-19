import { createReadStream, createWriteStream } from "fs";
import { createInterface } from "readline";

const start = performance.now();
const byCategory = new Map<string, number>();
let grandTotal = 0, count = 0, first = true;

const rl = createInterface({ input: createReadStream("data/products.csv"), crlfDelay: Infinity });
for await (const line of rl) {
  if (first) { first = false; continue; }

    const [, name, category, price, stock] = line.split(",");
    
    // Add this guard line right here:
    if (!category || !price || !stock) continue; 

    const total = Number(price) * Number(stock);
    byCategory.set(category, (byCategory.get(category) ?? 0) + total);
    
  grandTotal += total; count++;
}

const out = createWriteStream(process.env.OUT_FILE ?? "data/category-summary.csv");
out.write("category,total\n");
for (const [cat, total] of byCategory) {
  console.log(`${cat} → $${total.toFixed(2)}`);
  out.write(`${cat},${total.toFixed(2)}\n`);
}
out.end();
console.log(`Rows: ${count}`);
console.log(`Grand total: $${grandTotal.toFixed(2)}`);
console.log(`Took ${(performance.now() - start).toFixed(1)} ms`);
