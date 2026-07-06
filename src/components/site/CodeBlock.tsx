import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  showCopy?: boolean;
}

// Lightweight C# / shell syntax highlighter — purely for display, no deps.
// Tokenizes in a single pass so matched tokens (e.g. the keyword `class`)
// are never re-scanned once already wrapped in emitted HTML.
function highlight(code: string, language: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const tokenize = (pattern: RegExp, classify: (token: string) => string) => {
    let out = "";
    let last = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(code)) !== null) {
      out += escape(code.slice(last, match.index));
      const token = match[0];
      out += `<span class="${classify(token)}">${escape(token)}</span>`;
      last = pattern.lastIndex;
    }
    out += escape(code.slice(last));
    return out;
  };

  if (language === "csharp") {
    const keywords = new Set([
      "public", "private", "protected", "internal", "sealed", "class", "struct",
      "interface", "override", "virtual", "static", "readonly", "void", "return",
      "new", "var", "using", "namespace", "this", "base", "abstract", "true",
      "false", "null", "if", "else", "for", "foreach", "in", "while", "switch",
      "case", "default", "break", "continue", "async", "await", "record",
    ]);
    const pattern = new RegExp(
      ['"[^"]*"', "//[^\\n]*", "\\b\\d+\\b", "\\b[A-Za-z_][A-Za-z0-9_]*\\b"].join("|"),
      "g"
    );
    return tokenize(pattern, (token) => {
      if (token.startsWith('"')) return "text-emerald-300";
      if (token.startsWith("//")) return "text-muted-foreground italic";
      if (/^\d/.test(token)) return "text-amber-300";
      if (keywords.has(token)) return "text-primary-glow font-medium";
      if (/^[A-Z]/.test(token)) return "text-violet-300";
      return "";
    });
  } else if (language === "bash" || language === "shell") {
    const bashKeywords = new Set(["dotnet", "add", "package", "install"]);
    const pattern = new RegExp(
      ["^\\$\\s*", "\\bPlumix(?:\\.[A-Za-z]+)?\\b", "\\b[A-Za-z]+\\b"].join("|"),
      "gm"
    );
    return tokenize(pattern, (token) => {
      if (/^\$/.test(token)) return "text-muted-foreground";
      if (/^Plumix/.test(token)) return "text-violet-300";
      if (bashKeywords.has(token)) return "text-primary-glow font-medium";
      return "";
    });
  }

  return escape(code);
}

export const CodeBlock = ({
  code,
  language = "csharp",
  filename,
  className,
  showCopy = true,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-code-border/60 bg-code-bg shadow-card",
        className
      )}
    >
      {(filename || showCopy) && (
        <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-4 py-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            {filename && <span>{filename}</span>}
          </div>
          {showCopy && (
            <button
              onClick={onCopy}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-status-done" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy
                </>
              )}
            </button>
          )}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code
          className="font-mono"
          dangerouslySetInnerHTML={{ __html: highlight(code, language) }}
        />
      </pre>
    </div>
  );
};
