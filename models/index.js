const User = require("./User");
const Scores = require("./Scores");
const Dictionary = require("./Dictionary");

User.hasmany(Scores, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Scores.belongsTo(User, {
  foreignKey: "user_id"
});

module.exports = { User, Scores, Dictionary };
