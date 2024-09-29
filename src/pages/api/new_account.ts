import { ZepClient } from "@getzep/zep-cloud";
const client = new ZepClient({
  apiKey: API_KEY,
});

export default function handler(req, res) {
  res.status(200).json({ message: "Hello World!" });
}

function createNewUser() {
  const user = await client.user.add({
    userId: user_id,
    email: "user@example.com",
    firstName: "Jane",
    lastName: "Smith",
    metadata: { foo: "bar" },
  });
}
