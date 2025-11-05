import { Router } from "express";
import { products } from "../utils/constants.mjs";

const router = Router();

router.get("/api/products", (req, res) => {
  req.session.visited = true;
  console.log(req.session.id)
  const {
    query: { filter, value },
  } = req;
  //   console.log(filter, value);
  if (filter && value) {
    return res.send(
      products.filter((product) =>
        product[filter].toLowerCase().includes(value)
      )
    );
  }
  res.send(products);
});

export default router;
