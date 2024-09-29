// // /pages/api/hello.js

// export default function handler(req, res) {
//   fetch("https://proxy.tune.app/chat/completions", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": "sk-tune-EYjQx24X2gKhMj3TswpAsEt0WHe92UmTdPp",
//   },
//   body: JSON.stringify({
//     temperature: 0.9, 
//     messages:  [
//       {
//         "role": "system",
//         "content": "You are TuneStudio"
//       },
//       {
//         "role": "user",
//         "content": "Who are you"
//       }
//     ],
//     model: "awu2027/awu2027-gpt-4o-mini",
//     stream: false,
//     "frequency_penalty":  0.2,
//     "max_tokens": 100
//   })
// })
//   res.status(200).json({ message: "Hello World!" });
// }
export default async function handler(req, res) {
  fetch("https://proxy.tune.app/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.TUNE_API_KEY}`,
  },
  body: JSON.stringify({
    temperature: 0.9, 
    messages:  [
      {
        "role": "system",
        "content": "You are TuneStudio"
      },
      {
        "role": "user",
        "content": "Who are you"
      }
    ],
    model: "awu2027/hackmit-gpt-4o-mini",
    stream: false,
    "frequency_penalty":  0.2,
    "max_tokens": 100
  })
})
    .then(response => {
      if (!response.ok) {
        // If the response status is not OK, throw an error
        return response.text().then(text => {
          throw new Error(`Error: ${response.statusText} - ${text}`);
        });
      }
      // Parse and return the JSON from the response
      return response.json();
    })
    .then(data => {
      // Send the data back to the client
      res.status(200).json(data);
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
}
