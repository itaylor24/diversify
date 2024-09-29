"use client";
import { AiChat } from "@nlux/react";
import { myCustomAdapter } from "../adapter.ts";
import { useMemo, useEffect, useState } from "react";
import "@nlux/themes/nova.css";
import { user, assistant } from "../personas.tsx";

export default function Chat() {
  const adapter = useMemo(() => myCustomAdapter, []);
  // const chatAdapter: ChatAdapter = {
  //   streamText: async (prompt: string, observer: StreamingAdapterObserver) => {
  //     const response = await fetch("/api/chat", {
  //       method: "POST",
  //       body: JSON.stringify({ prompt: prompt }),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     if (response.status !== 200) {
  //       observer.error(new Error("Failed to connect to the server"));
  //       return;
  //     }

  //     if (!response.body) {
  //       return;
  //     }

  //     // Read a stream of server-sent events
  //     // and feed them to the observer as they are being generated
  //     const reader = response.body.getReader();
  //     const textDecoder = new TextDecoder();

  //     while (true) {
  //       const { value, done } = await reader.read();
  //       if (done) {
  //         break;
  //       }

  //       const content = textDecoder.decode(value);
  //       if (content) {
  //         observer.next(content);
  //       }
  //     }

  //     observer.complete();
  //   },
  // };

  return (
    <div className="chatBot-container">
      <div className="example">
        <div className="example-header">
          <textarea
            className="example-header-text"
            placeholder="Enter a prompt"
          ></textarea>
        </div>
        <textarea
          className="example-textBox"
          placeholder="Enter your answer to the prompt"
        ></textarea>
        <div className="example-submit">
          <button className="sidebar-button">Submit</button>
        </div>
      </div>
    </div>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 w-full max-w-3xl items-center justify-between font-mono text-sm lg:flex">
    //     <AiChat adapter={adapter} />
    //   </div>
    // </main>
  );
}
