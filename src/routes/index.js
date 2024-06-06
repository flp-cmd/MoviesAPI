const { Router } = require("express");

const router = Router();

const usersRoutes = require("./users.routes");
const movieNotesRoutes = require("./movieNotes.routes")

router.use("/users", usersRoutes);
router.use("/movieNotes", movieNotesRoutes)

module.exports = router;
