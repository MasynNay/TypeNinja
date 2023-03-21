const sequelize = require("../config/connection");
const { User, Scores, Dictionary } = require("../models");

const userData = require("./userData.json");
const scoresData = require("./scoresData.json");
const dictionaryData = require("./dictionaryData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const scores of scoresData) {
    await Scores.create({
      ...scores,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const words of dictionaryData) {
    await Dictionary.Create({
      ...words
    });
  }

  process.exit(0);
};

seedDatabase();
