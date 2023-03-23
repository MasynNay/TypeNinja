const router = require("express").Router();
const { Dictionary } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dictionaryData = await Dictionary.findAll({
      include: [
        {
          model: Dictionary,
          attributes: [word],
        },
      ],
    });

    const words = dictionaryData.map((word) => word.get({ plain: true }));

    res.render("main", { words });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
