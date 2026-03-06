"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING = "Hey. I'm Clawd Up -- ask me anything about the product, setup, or pricing.";
const API_URL = "https://clawdup.microbuilder.co/api/chat";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persist open/closed state in sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("clawd-chat-open");
    if (saved === "true") setOpen(true);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("clawd-chat-open", String(open));
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      // Send only user/assistant messages (skip greeting if it's the system one)
      const apiMessages = updated
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages.slice(1) }), // skip initial greeting
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed." }));
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: err.error || "Something went wrong." },
        ]);
        return;
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          padding: "12px",
          fontSize: "14px",
          fontWeight: 600,
          borderRadius: "9999px",
          border: "1px solid var(--border)",
          backgroundColor: "var(--bg-card)",
          color: "var(--text)",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          transition: "all 0.2s",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLElement).style.borderColor = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLElement).style.borderColor = "var(--border)";
        }}
        aria-label="Chat"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      </button>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        width: "350px",
        maxWidth: "calc(100vw - 32px)",
        height: "450px",
        maxHeight: "calc(100vh - 48px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--bg-card)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
          Clawd Up
        </span>
        <button
          onClick={() => setOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: "18px",
            lineHeight: 1,
            padding: "0 4px",
          }}
        >
          x
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: "13px",
              lineHeight: "1.5",
              backgroundColor:
                msg.role === "user" ? "var(--accent)" : "var(--bg, #1a1a2e)",
              color: msg.role === "user" ? "#fff" : "var(--text-muted)",
              border:
                msg.role === "assistant" ? "1px solid var(--border)" : "none",
            }}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              padding: "8px 12px",
              borderRadius: "10px",
              fontSize: "13px",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              backgroundColor: "var(--bg, #1a1a2e)",
            }}
          >
            <span style={{ opacity: 0.6 }}>typing...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Fallback email */}
      <div
        style={{
          padding: "4px 16px",
          textAlign: "center",
          fontSize: "12px",
          opacity: 0.6,
          color: "var(--text-muted)",
          flexShrink: 0,
        }}
      >
        Need human help? Email{" "}
        <a
          href="mailto:info@microbuilder.co"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          info@microbuilder.co
        </a>
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px 16px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          gap: "8px",
          flexShrink: 0,
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={loading}
          style={{
            flex: 1,
            padding: "8px 12px",
            fontSize: "13px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg, #1a1a2e)",
            color: "var(--text)",
            outline: "none",
          }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{
            padding: "8px 16px",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: "8px",
            border: "none",
            backgroundColor: "var(--accent)",
            color: "#fff",
            cursor: loading || !input.trim() ? "default" : "pointer",
            opacity: loading || !input.trim() ? 0.5 : 1,
            transition: "opacity 0.2s",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
