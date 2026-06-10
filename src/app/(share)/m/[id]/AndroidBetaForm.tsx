"use client";

import { useState, type FormEvent } from "react";
import { API_BASE } from "@/lib/api";

// Pre-launch Android CTA (plan 070 Phase 2 #4b): capture an email into the
// existing waitlist, tagged source=android_beta + the meetup id, so ops can
// invite them into the Play closed test (the 12-tester/14-day pipeline).

export interface AndroidBetaLabels {
  title: string;
  placeholder: string;
  submit: string;
  submitting: string;
  success: string;
  error: string;
  duplicate: string;
}

export default function AndroidBetaForm({
  meetupId,
  labels,
}: {
  meetupId: string | null;
  labels: AndroidBetaLabels;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "android_beta", meetupId }),
      });
      if (!res.ok) {
        setMessage(res.status === 409 ? labels.duplicate : labels.error);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setMessage(labels.error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-2xl bg-teal-light px-4 py-3.5 text-center text-[13px] font-bold text-teal-dark">
        ✓ {labels.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <p className="text-center text-[13px] font-bold text-text-primary">📩 {labels.title}</p>
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="android-beta-email">
          {labels.placeholder}
        </label>
        <input
          id="android-beta-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.placeholder}
          className="min-h-[48px] min-w-0 flex-1 rounded-xl border border-border-default bg-white px-3.5 py-3 text-[13px] text-text-primary placeholder-text-muted transition-all focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-[48px] flex-none rounded-xl bg-teal px-4 py-3 text-[13px] font-bold text-white transition-colors hover:bg-teal-dark focus:outline-none focus:ring-2 focus:ring-teal/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? labels.submitting : labels.submit}
        </button>
      </div>
      {status === "error" && (
        <p className="rounded-lg bg-danger/10 px-3 py-2 text-[12px] text-danger">{message}</p>
      )}
    </form>
  );
}
