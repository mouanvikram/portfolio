"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      className="copy"
      data-copied={copied || undefined}
      onClick={() => navigator.clipboard?.writeText(email).then(() => setCopied(true), () => {})}
      aria-label={copied ? "Email copied" : "Copy email"}
    >
      <span className="copy-label" key={String(copied)}>
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </button>
  );
}
