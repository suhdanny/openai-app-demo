const handleSubmit = (e) => {
  e.preventDefault();

  const prompt = document.getElementById("prompt").value;
  const size = document.getElementById("size").value;

  generateImageByRequest(prompt, size);
};

const generateImageByRequest = async (prompt, size) => {
  try {
    showLoading();

    const response = await fetch("/openai/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, size }),
    });

    if (!response.ok) {
      throw new Error("The image could not be generated");
    }

    const data = await response.json();
    const image = document.getElementById("image");

    image.src = data.data;

    removeLoading();
  } catch (error) {
    const errorElement = document.getElementById("error");
    errorElement.textContent = error.message;
    removeLoading();
  }
};

const showLoading = () => {
  const loading = document.querySelector(".loading");
  loading.classList.add("show");
};

const removeLoading = () => {
  const loading = document.querySelector(".loading");
  loading.classList.remove("show");
};

const generateRandomPrompt = async () => {
  try {
    const response = await fetch("/openai/generateText");

    if (!response.ok) {
      throw new Error("The text could not be generated");
    }

    const data = await response.json();
    const prompt = document.getElementById("prompt");

    prompt.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

document.querySelector("#image-form").addEventListener("submit", handleSubmit);
document
  .querySelector(".random-prompt")
  .addEventListener("click", generateRandomPrompt);
