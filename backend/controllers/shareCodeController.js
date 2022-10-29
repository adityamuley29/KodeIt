const Slug = require("../models/SlugModel");

const generateSlug = async (req, res) => {
  const { code, language } = req.body;

  async function generateRandomSlug(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  try {
    const outputSlug = await generateRandomSlug(8);
    console.log(outputSlug);

    const generatedSlug = await Slug.create({
      slug: outputSlug,
      code,
      language,
    });

    if (generatedSlug) {
      console.log(generatedSlug.slug);
      return res.status(201).json({
        message: "Generated Share Code Link !",
        link: `${generatedSlug.slug}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const findSlug = async (req, res) => {
  const { slug } = req.query;

  try {
    const data = await Slug.find({ slug });

    console.log(data[0]);

    if (data.length === 0) {
      return res.status(400).json({ message: "Invalid link" });
    } else {
      return res.status(200).json(data[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateSlug,
  findSlug,
};
