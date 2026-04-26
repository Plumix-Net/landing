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
function highlight(code: string, language: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  let out = escape(code);

  if (language === "csharp") {
    const keywords = [
      "public", "private", "protected", "internal", "sealed", "class", "struct",
      "interface", "override", "virtual", "static", "readonly", "void", "return",
      "new", "var", "using", "namespace", "this", "base", "abstract", "true",
      "false", "null", "if", "else", "for", "foreach", "in", "while", "switch",
      "case", "default", "break", "continue", "async", "await", "record",
    ];
    // strings
    out = out.replace(/(&quot;[^&]*?&quot;)/g, '<span class="text-emerald-300">$1</span>');
    // comments
    out = out.replace(/(\/\/[^\n]*)/g, '<span class="text-muted-foreground italic">$1</span>');
    // numbers
    out = out.replace(/\b(\d+)\b/g, '<span class="text-amber-300">$1</span>');
    // keywords
    out = out.replace(
      new RegExp(`\\b(${keywords.join("|")})\\b`, "g"),
      '<span class="text-primary-glow font-medium">$1</span>'
    );
    // types (PascalCase identifiers)
    out = out.replace(
      /\b([A-Z][A-Za-z0-9_]*)\b/g,
      '<span class="text-violet-300">$1</span>'
    );
  } else if (language === "bash" || language === "shell") {
    out = out.replace(/^(\$\s*)/gm, '<span class="text-muted-foreground">$1</span>');
    out = out.replace(/\b(dotnet|add|package|install)\b/g,
      '<span class="text-primary-glow font-medium">$1</span>');
    out = out.replace(/(Plumix(?:\.[A-Za-z]+)?)/g,
      '<span class="text-violet-300">$1</span>');
  }

  return out;
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
