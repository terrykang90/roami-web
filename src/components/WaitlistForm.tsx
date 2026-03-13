"use client";

import { useState, type FormEvent } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("https://api.roami.app/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "등록에 실패했습니다. 다시 시도해주세요.");
      }

      setStatus("success");
      setEmail("");
      setCity("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "등록에 실패했습니다. 다시 시도해주세요.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-teal-light rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="text-4xl mb-3">&#10003;</div>
        <h3 className="text-lg font-bold text-teal-dark mb-2">등록이 완료되었습니다!</h3>
        <p className="text-sm text-gray-600">
          Roami 출시 소식을 가장 먼저 전해드릴게요.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-teal hover:text-teal-dark underline underline-offset-2 transition-colors"
        >
          다른 이메일로 등록하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-1.5">
          이메일
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all text-sm"
        />
      </div>
      <div>
        <label htmlFor="waitlist-city" className="block text-sm font-medium text-gray-700 mb-1.5">
          어디서 Roami를 사용하고 싶으세요?
        </label>
        <input
          id="waitlist-city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="예: 방콕, 발리, 도쿄..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all text-sm"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2.5">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-teal hover:bg-teal-dark text-white font-semibold py-3.5 px-6 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {status === "loading" ? "등록 중..." : "사전 등록하기"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        스팸 없이, 출시 소식만 보내드릴게요.
      </p>
    </form>
  );
}
