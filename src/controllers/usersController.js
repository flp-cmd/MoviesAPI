const AppError = require("../utils/AppError");
const knex = require("../database/knex");

const { response } = require("express");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    await knex("users").insert({
      name,
      email,
      password,
    });

    return response.status(201).json({});
  }

  async update(request, response) {
    const { name, email, password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if (!user) {
      throw new AppError("Usuário inexistente!");
    }
    
    if(email){
      const userWithEmailAlreadyUsed = await knex("users").where({ email }).first();
      
      if (userWithEmailAlreadyUsed && userWithEmailAlreadyUsed.id !== user.id) {
        throw new AppError("Email já cadastrado!");
      }
    }

    await knex("users").update({
      name: name ?? user.name,
      email: email ?? user.email,
      password: password ?? user.password,
    }).where({ id });

    return response.status(201).json({});
  }
}

module.exports = UsersController;
