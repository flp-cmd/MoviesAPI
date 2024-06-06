const { Router } = require("express");

const UsersController = require("../controllers/usersController");

const userRouter = Router();
 
const usersController = new UsersController()

userRouter.post("/", usersController.create);
userRouter.put("/:id", usersController.update)
userRouter.delete("/:id", usersController.delete)

module.exports = userRouter
