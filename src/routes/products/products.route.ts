import { Router } from "express";
import { ProductsPrisma } from "../../models/Products/Products.model";

const router = Router();
const products = new ProductsPrisma();

router.get("/", async (req, res) => {
  try {
    const listProducts = await products.findManyProducts();
    res.json({ products: listProducts });
  } catch (err) {
    res.status(500).json({ error: "Products not found." });
  }
});

export default router;
