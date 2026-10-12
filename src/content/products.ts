/**
 * WyzOps products.
 *
 * The list is intentionally empty — the Products section renders a polished
 * "in development" state until real products are added here.
 *
 * To add a product, append an object to `products`, e.g.:
 *
 *   {
 *     slug: "your-product",
 *     name: "Your Product",
 *     description: "One sentence on the problem it solves.",
 *     category: "Operations",
 *     status: "beta",
 *     url: "https://your-product.com",
 *     image: { src: "/products/your-product.png", alt: "Your Product dashboard" },
 *   }
 *
 * Images go in /public/products (16:10 works best).
 */

export type ProductStatus = "live" | "beta" | "in-development" | "coming-soon";

export type Product = {
  slug: string;
  name: string;
  description: string;
  category: string;
  status: ProductStatus;
  /** Public product URL (opens in a new tab). Optional until launch. */
  url?: string;
  /** Screenshot or mockup. Falls back to an abstract preview when omitted. */
  image?: { src: string; alt: string };
};

export const productStatusLabel: Record<ProductStatus, string> = {
  live: "Live",
  beta: "Beta",
  "in-development": "In development",
  "coming-soon": "Coming soon",
};

export const products: Product[] = [];
