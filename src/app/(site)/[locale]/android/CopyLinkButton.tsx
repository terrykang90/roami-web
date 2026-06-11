"use client";

import { useState } from "react";

// The page's only client island (eng review issue 3: banner + back link are
// server-rendered; clipboard feedback is the one thing that needs JS).
// Copy failure (webviews sometimes block the clipboard API) is swallowed —
// the always-visible manual hint above is the primary path, not this button.
export default function CopyLinkButton({ url, label, copiedLabel }: { url: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore — keep the label unchanged
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center min-h-[44px] mt-3 bg-white border border-border-default hover:border-text-muted text-text-primary font-semibold text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer"
    >
      {copied ? `✓ ${copiedLabel}` : label}
    </button>
  );
}
