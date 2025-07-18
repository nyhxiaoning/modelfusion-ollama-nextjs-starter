"use client";

import { useEffect, useRef } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-2 rounded-xl text-base ${message.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex border-t border-gray-300 p-4"
      >
        <input
          className="flex-grow rounded-l-xl border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r-xl hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}
