import { users } from "./constants.mjs";
import { products } from "./constants.mjs";

export const getParamsId = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.send.status(400).send({ msg: "Bad Request, Invalid ID" });
  }
  req.id = id;
  next();
};
export const getUserIndexById = (req, res, next) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Bad request, Invalid ID" });
  }
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).send({ msg: "User not found" });
  }
  req.userIndex = userIndex;
  next();
};
