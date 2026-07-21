import { NextResponse } from "next/server";
import { RIVEN_SYSTEM_PROMPT } from "@/lib/riven-knowledge";
import { generateKnowledgeEngineResponse } from "@/lib/riven-engine";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.OPENROUTER_API_KEY ||
      process.env.OPENAI_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    // Get the latest user message
    const lastUserMessage =
      [...messages].reverse().find((m) => m.role === "user")?.content || "";

    if (!apiKey) {
      const reply = generateKnowledgeEngineResponse(lastUserMessage);
      return NextResponse.json({
        reply,
        source: "knowledge_engine",
      });
    }

    // 1. If key is an OpenRouter key (starts with sk-or-)
    if (apiKey.startsWith("sk-or-") || process.env.OPENROUTER_API_KEY) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "google/gemini-2.0-flash-001",
            messages: [
              { role: "system", content: RIVEN_SYSTEM_PROMPT },
              ...messages.map((m) => ({
                role: m.role === "riven" ? "assistant" : "user",
                content: m.content,
              })),
            ],
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, source: "openrouter_llm" });
          }
        }
      } catch (e) {
        console.error("OpenRouter API call failed:", e);
      }
    }

    // 2. If key is an OpenAI key (starts with sk- standard)
    if (apiKey.startsWith("sk-") && !apiKey.startsWith("sk-or-")) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: RIVEN_SYSTEM_PROMPT },
              ...messages.map((m) => ({
                role: m.role === "riven" ? "assistant" : "user",
                content: m.content,
              })),
            ],
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({ reply, source: "openai_llm" });
          }
        }
      } catch (e) {
        console.error("OpenAI API call failed:", e);
      }
    }

    // 3. Google Gemini API
    const formattedContents = messages.map((m) => ({
      role: m.role === "riven" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const geminiPayload = {
      system_instruction: {
        parts: [{ text: RIVEN_SYSTEM_PROMPT }],
      },
      contents: formattedContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    };

    const modelsToTry = [
      "gemini-2.0-flash",
      "gemini-2.5-flash",
      "gemini-1.5-flash",
    ];

    for (const model of modelsToTry) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(geminiPayload),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply, source: "gemini_llm" });
          }
        }
      } catch (err) {
        console.error(`Gemini model ${model} error:`, err);
      }
    }

    // Fallback if all API calls fail or quota exceeded
    const fallbackReply = generateKnowledgeEngineResponse(lastUserMessage);
    return NextResponse.json({
      reply: fallbackReply,
      source: "knowledge_engine_fallback",
    });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return NextResponse.json(
      {
        reply: generateKnowledgeEngineResponse(""),
        error: error.message,
      },
      { status: 500 }
    );
  }
}
