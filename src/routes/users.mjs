import { Router } from "express";
import { getParamsId, getUserIndexById } from "../utils/middlerwares.mjs";
import { users } from "../utils/constants.mjs";
import { products } from "../utils/constants.mjs";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { User } from "../mongoose/user.mjs";

const router = Router();

router.get("/api/users", (req, res) => {
  console.log(req.signedCookies);
  if (req.signedCookies.user && req.signedCookies.user === "Admin") {
    const {
      query: { filter, value },
    } = req;
    //   console.log(filter, value);
    if (filter && value) {
      return res.send(
        users.filter((user) => user[filter].toLowerCase().includes(value))
      );
    }
    return res.send(users);
  } else {
    return res.send("You are not an admin/You don't have the right cookie");
  }
});

router.get("/api/users/:id", getParamsId, (req, res) => {
  const id = req.id;

  const user = users.find((user) => user.id === id);
  if (user) {
    return res.send(user);
  }
  res.status(404).send({ msg: "User Not Found" });
});
router.get("/api/products/:id", getParamsId, (req, res) => {
  const id = req.id;
  const product = products.find((product) => product.id === id);
  if (product) {
    return res.send(product);
  }
  return res.status(404).send({ msg: "Product not Found" });
});
router.put("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  const { body } = req;
  users[userIndex] = { id: id, ...body };
  return res.status(200).send({ msg: "User Updated" });
});
router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ error: result.array() });
    }
    const body = matchedData(req);
    const newUser = new User(body);
    try {
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      return res.status(400).send({ msg: "User not saved" });
    }
  }
);

router.patch("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  const { body } = req;
  users[userIndex] = { ...users[userIndex], ...body };
  return res.sendStatus(200);
});

router.delete("/api/users/:id", getUserIndexById, (req, res) => {
  const userIndex = req.userIndex;
  console.log(userIndex);

  users.splice(userIndex, 1);
  res.sendStatus(200);
});

export default router;
