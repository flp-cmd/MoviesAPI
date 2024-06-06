const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieNotesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const [note_id] = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        note_id,
        name,
        user_id,
      };
    });

    await knex("movieTags").insert(tagsInsert);

    return response.status(201).json({});
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("movieNotes").where({ id }).delete();

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const movieNote = await knex("movieNotes").where({ id }).first();
    const tags = await knex("movieTags").where({ note_id: id });

    return response.json({
      ...movieNote,
      tags,
    });
  }
}

module.exports = MovieNotesController;
