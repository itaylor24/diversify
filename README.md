# TuneHQ AI-Powered Date Matching

This project uses the TuneHQ LLM to provide AI-driven date matching based on compatibility assessments. The app analyzes user profiles to suggest compatible matches and provides AI-generated guided messaging to help users initiate and maintain engaging conversations.

---

## Editing the LLM to Santis Model

To switch the AI model used in the app, follow these steps:

1. **Edit the model in the API:**

   Go to `src/pages/api/message.js` and find the following line at the top:

   ```javascript
   const model = "Tytodd/ty2-1";

