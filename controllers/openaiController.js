const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const image_url = response.data.data[0].url;

    res.status(200).json({ success: true, data: image_url });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res
      .status(400)
      .json({ success: false, error: "The image could not be generated" });
  }
};

const generateText = async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Give me a random prompt for image generation",
      // max_tokens: 10,
      temperature: 0.9,
    });

    const answer = response.data.choices[0].text;

    res.status(200).json({ success: true, data: answer });
  } catch (error) {
    console.log(error);

    res
      .status(400)
      .json({ success: false, error: "The text could not be generated" });
  }
};

module.exports = { generateImage, generateText };
