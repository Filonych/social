const { Router } = require("express");
const usersController = require("../controllers/usersController");

const usersRoutes = new Router();

usersRoutes.post("/add", usersController.addUser);
usersRoutes.get("/get", usersController.checkUser);
// usersRoutes.delete("/delete", usersController.deletePost);

module.exports = usersRoutes;