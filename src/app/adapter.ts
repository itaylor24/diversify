import { ChatAdapter } from "@nlux/core";
import { useState } from "react";

// type Message = {
//   role: string;
//   content: string;
// };

export const myCustomAdapter = {
  batchText: (message: string, extras: AdapterExtras): Promise<string> => {
    return fetch("http://localhost:3000/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
    })
      .then((response) => response.json())
      .then((json) => json.message);
  },
};
