let messages = [
  {
    role: "system",
    content:
      "Your name is Ty you are a 22 year old male who studies computer science at MIT.",
  },
];
require("dotenv").config();
const api_key = process.env.TUNE_API_KEY;
// const model = "santi/ty2-model-kvcgd2dc";
// const model = "Tytodd/ty2-1";
const model = "santi/ty3-model-mylzbkfs";
export default async function handler(req, res) {
  // Check if the request method is GET
  if (req.method === "POST") {
    // Do something for GET requests
    const jsonData = req.body;
    console.log(jsonData);
    const response = await getResponse(jsonData.message);
    console.log("response", response);
    res.status(200).json({ message: response });
  }
}

async function getResponse(message) {
  console.log("key", api_key);
  messages.push({ role: "user", content: message });
  const raw_response = await fetch("https://proxy.tune.app/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: api_key,
    },
    body: JSON.stringify({
      temperature: 0.8,
      messages: messages,
      model: model,
      stream: false,
      frequency_penalty: 0,
      max_tokens: 900,
    }),
  });

  console.log("raw_response", raw_response);

  const response_json = await raw_response.json();
  const response = response_json["choices"][0]["message"]["content"];
  messages.push({ role: "assistant", content: response });
  return response;
}
