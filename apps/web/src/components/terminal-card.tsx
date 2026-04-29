"use client";

import { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";

export type TerminalLine =
  | { kind: "comment"; text: string }
  | {
      kind: "command";
      text: string;
      prompt?: "$" | "›";
      highlight?: boolean;
      copyable?: boolean;
    }
  | { kind: "blank" };

export function TerminalCard({
  lines,
  title,
}: {
  lines: TerminalLine[];
  title?: string;
}) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const onCopy = async (idx: number, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setTimeout(() => {
        setCopiedIdx((cur) => (cur === idx ? null : cur));
      }, 1600);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="rounded-2xl border border-[var(--color-bg-3)] bg-[#0a0d11] overflow-hidden font-mono">
      {/* Titlebar */}
      <div className="relative flex items-center px-5 py-3 border-b border-[var(--color-bg-3)] bg-[var(--color-bg-1)]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--color-error)]/80" />
          <span className="w-3 h-3 rounded-full bg-[var(--color-warning)]/80" />
          <span className="w-3 h-3 rounded-full bg-[var(--color-success)]/80" />
        </div>
        {title && (
          <div className="absolute inset-x-0 text-center text-xs text-[var(--color-text-3)] pointer-events-none">
            {title}
          </div>
        )}
        <Terminal className="ml-auto w-4 h-4 text-[var(--color-text-3)]" />
      </div>

      {/* Body */}
      <div
        className="px-7 py-7 text-[13.5px] md:text-[15px] leading-[1.7] space-y-0.5 antialiased"
        style={{ fontFeatureSettings: '"calt" 1, "liga" 1' }}
      >
        {lines.map((line, i) => {
          if (line.kind === "blank") {
            return <div key={i} className="h-3" />;
          }
          if (line.kind === "comment") {
            return (
              <div key={i} className="text-[var(--color-text-3)] break-all">
                {line.text}
              </div>
            );
          }
          const prompt = line.prompt ?? "$";
          const promptColor =
            prompt === "$"
              ? "text-[var(--color-success)]"
              : "text-[var(--color-text-3)]";
          const showCopy = line.copyable !== false && prompt === "$";
          const isCopied = copiedIdx === i;
          return (
            <div key={i} className="flex items-start gap-3 break-all">
              <div className="flex-1 min-w-0">
                <span className={`${promptColor} select-none mr-2`}>
                  {prompt}
                </span>
                <span
                  className={
                    line.highlight
                      ? "text-[var(--color-brand-500)]"
                      : "text-[var(--color-text-1)]"
                  }
                >
                  {line.text}
                </span>
              </div>
              {showCopy && (
                <button
                  type="button"
                  onClick={() => onCopy(i, line.text)}
                  aria-label={isCopied ? "Copied" : "Copy command"}
                  title={isCopied ? "Copied" : "Copy"}
                  className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-md text-[var(--color-text-3)] hover:bg-[var(--color-bg-2)] hover:text-[var(--color-text-1)] transition-colors"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-[var(--color-success)]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
