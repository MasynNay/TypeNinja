const User = require("./User");
const Scores = require("./Scores");

User.hasMany(Scores, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Scores.belongsTo(User, {
  foreignKey: "user_id"
});

module.exports = { User, Scores };
