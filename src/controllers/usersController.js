const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

const { response } = require("express");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    
    if(!name) {
      throw new AppError("Nome de usuário obrigatório")
    }
    
    if(!email) {
      throw new AppError("Email de usuário obrigatório")
    }
    
    if(!password) {
      throw new AppError("Senha de usuário obrigatória")
    }
    
    const userWithEmailAlreadyUsed = await knex("users").where({ email }).first();
      
    if (userWithEmailAlreadyUsed) {
      throw new AppError("Email já cadastrado!");
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
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

    const hashedPassword = hash(password, 8)

    await knex("users").update({
      name: name ?? user.name,
      email: email ?? user.email,
      password: hashedPassword ?? user.password,
    }).where({ id });

    return response.status(201).json({});
  }

  async delete(request, response) {
    const { id } = request.params
    await knex("users").where({ id }).delete()

    return response.status(200).json({})
  }
}
  
module.exports = UsersController;