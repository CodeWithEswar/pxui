"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PXIconWrap } from "@/components/icons/px-icon-wrap";

export interface CodeWrapButtonProps {
  wrapped: boolean;
  onToggle: () => void;
  className?: string;
  theme?: "dark" | "light";
  size?: "sm" | "md";
}

/**
 * Reusable CodeWrapButton for toolbars and code cards across the app
 */
export function CodeWrapButton({
  wrapped,
  onToggle,
  className,
  theme = "dark",
  size = "sm",
}: CodeWrapButtonProps) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded font-mono transition-all cursor-pointer box-border border shrink-0",
        size === "sm" ? "h-6 px-1.5 text-[10px]" : "h-7 sm:h-8 px-2 sm:px-2.5 text-xs",
        wrapped
          ? "bg-primary text-white border-primary font-bold shadow-2xs"
          : isDark
          ? "bg-[#252320]/85 hover:bg-[#2e2c28] border-[#383530] text-[#8e8b82] hover:text-[#faf9f5]"
          : "bg-white hover:bg-[#f5f0e8] border-[#e6dfd8] text-[#6c6a64] hover:text-[#141413]",
        className
      )}
      title={wrapped ? "Unwrap code lines (scroll horizontally)" : "Wrap code lines to container width"}
      aria-label={wrapped ? "Unwrap code lines" : "Wrap code lines"}
    >
      <PXIconWrap size={size === "sm" ? 11 : 12} className={wrapped ? "text-white" : "opacity-80"} />
      <span className="hidden xs:inline">{wrapped ? "Unwrap" : "Wrap"}</span>
    </button>
  );
}

export interface SyntaxHighlighterProps {
  code: string;
  language?: "tsx" | "react" | "bash" | "svg" | "json";
  theme?: "dark" | "light";
  className?: string;
  showLineNumbers?: boolean;
  wrap?: boolean;
  defaultWrap?: boolean;
  onWrapChange?: (wrap: boolean) => void;
  showWrapToggle?: boolean;
}

export function SyntaxHighlighter({
  code,
  language = "tsx",
  theme = "dark",
  className,
  showLineNumbers = false,
  wrap,
  defaultWrap = false,
  onWrapChange,
  showWrapToggle = false,
}: SyntaxHighlighterProps) {
  const isDark = theme === "dark";

  // Support controlled or uncontrolled wrap state
  const [internalWrap, setInternalWrap] = React.useState(defaultWrap);
  const isWrapped = wrap !== undefined ? wrap : internalWrap;

  const handleToggleWrap = () => {
    const next = !isWrapped;
    if (wrap === undefined) {
      setInternalWrap(next);
    }
    onWrapChange?.(next);
  };

  // Palette tokens based on theme
  const colors = isDark
    ? {
        keyword: "text-[#cc785c] font-semibold", // PXUI coral
        tag: "text-[#79c0ff] font-medium", // Sky blue for components (<PXIcon...>)
        attr: "text-[#e5c07b]", // Warm amber for props (size, className, animated)
        string: "text-[#98c379]", // Soft green for strings ("@pxui/react")
        number: "text-[#d19a66]", // Orange for numbers ({24})
        boolean: "text-[#d19a66] font-semibold",
        punct: "text-[#8e8b82]", // Muted grey for braces, brackets, semicolons
        comment: "text-[#5c6370] italic",
        command: "text-[#cc785c] font-bold", // bash commands (npx, add)
        flag: "text-[#d2a8ff]", // flags (@latest)
        url: "text-[#79c0ff] underline",
        plain: "text-[#faf9f5]",
      }
    : {
        keyword: "text-[#b85434] font-semibold", // Deep brick coral
        tag: "text-[#0550ae] font-medium", // Deep sapphire blue
        attr: "text-[#8250df]", // Purple for props
        string: "text-[#116329]", // Forest green for strings
        number: "text-[#953800]", // Burnt orange
        boolean: "text-[#953800] font-semibold",
        punct: "text-[#57606a]", // Slate for braces
        comment: "text-[#6e7781] italic",
        command: "text-[#b85434] font-bold",
        flag: "text-[#8250df]",
        url: "text-[#0550ae] underline",
        plain: "text-[#141413]",
      };

  const highlightLine = (line: string): React.ReactNode[] => {
    // 1. Comments
    if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) {
      return [<span key="comment" className={colors.comment}>{line}</span>];
    }

    // 2. Bash / shell command
    if (language === "bash" || line.trim().startsWith("npx") || line.trim().startsWith("pnpm")) {
      const parts = line.split(/(\s+)/);
      return parts.map((part, i) => {
        if (/^(npx|pnpm|npm|yarn|bun)$/.test(part)) {
          return <span key={i} className={colors.command}>{part}</span>;
        }
        if (/^shadcn(@[a-zA-Z0-9.-]+)?$/.test(part)) {
          return <span key={i} className={colors.tag}>{part}</span>;
        }
        if (/^(add|install|init)$/.test(part)) {
          return <span key={i} className={colors.keyword}>{part}</span>;
        }
        if (part.startsWith("http://") || part.startsWith("https://") || part.startsWith("/r/")) {
          return <span key={i} className={colors.url}>{part}</span>;
        }
        if (part.startsWith("-")) {
          return <span key={i} className={colors.flag}>{part}</span>;
        }
        return <span key={i} className={colors.plain}>{part}</span>;
      });
    }

    // 3. TSX / React / SVG / JSON Tokenizer
    const tokens: React.ReactNode[] = [];
    // Regex matching JSON keys, strings, JSX tags, keywords, props, numbers, punctuation
    const tokenRegex =
      /("(?:\\.|[^"\\])*"(?=\s*:))|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(<\/?[A-Za-z0-9_.-]+)|(\/>|>)|(\b(?:import|export|from|function|return|default|const|let|var|type|interface|as|true|false|null)\b)|([a-zA-Z0-9_-]+(?==))|(\b\d+\b)|([{}();,:[\]])/g;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(line)) !== null) {
      const [, jsonKey, str, tag, tagEnd, kw, attr, num, punct] = match;
      const matchIndex = match.index;

      // Plain text before token
      if (matchIndex > lastIndex) {
        tokens.push(
          <span key={`plain-${lastIndex}`} className={colors.plain}>
            {line.substring(lastIndex, matchIndex)}
          </span>
        );
      }

      if (jsonKey) {
        tokens.push(
          <span key={`jsonkey-${matchIndex}`} className={colors.tag}>
            {jsonKey}
          </span>
        );
      } else if (str) {
        tokens.push(
          <span key={`str-${matchIndex}`} className={colors.string}>
            {str}
          </span>
        );
      } else if (tag) {
        const isClosing = tag.startsWith("</");
        const tagName = isClosing ? tag.slice(2) : tag.slice(1);
        tokens.push(
          <React.Fragment key={`tag-${matchIndex}`}>
            <span className={colors.punct}>{isClosing ? "</" : "<"}</span>
            <span className={colors.tag}>{tagName}</span>
          </React.Fragment>
        );
      } else if (tagEnd) {
        tokens.push(
          <span key={`tagend-${matchIndex}`} className={colors.punct}>
            {tagEnd}
          </span>
        );
      } else if (kw) {
        const isBool = kw === "true" || kw === "false" || kw === "null";
        tokens.push(
          <span
            key={`kw-${matchIndex}`}
            className={isBool ? colors.boolean : colors.keyword}
          >
            {kw}
          </span>
        );
      } else if (attr) {
        tokens.push(
          <span key={`attr-${matchIndex}`} className={colors.attr}>
            {attr}
          </span>
        );
      } else if (num) {
        tokens.push(
          <span key={`num-${matchIndex}`} className={colors.number}>
            {num}
          </span>
        );
      } else if (punct) {
        tokens.push(
          <span key={`punct-${matchIndex}`} className={colors.punct}>
            {punct}
          </span>
        );
      }

      lastIndex = tokenRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      tokens.push(
        <span key={`tail-${lastIndex}`} className={colors.plain}>
          {line.substring(lastIndex)}
        </span>
      );
    }

    return tokens.length > 0 ? tokens : [<span key="empty">{line}</span>];
  };

  const normalized = (code || "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const rawLines = normalized.split("\n");
  const lines =
    rawLines.length > 1 && rawLines[rawLines.length - 1] === ""
      ? rawLines.slice(0, -1)
      : rawLines;

  return (
    <div
      className={cn(
        "relative w-full font-mono text-xs leading-relaxed select-text",
        isWrapped ? "overflow-x-hidden" : "overflow-x-auto workspace-scrollbar",
        isDark ? "text-[#faf9f5]" : "text-[#141413]",
        className
      )}
    >
      {/* Optional Integrated Wrap Toggle Button */}
      {showWrapToggle && (
        <div className="absolute top-2 right-2 z-10">
          <CodeWrapButton
            wrapped={isWrapped}
            onToggle={handleToggleWrap}
            theme={theme}
            size="sm"
          />
        </div>
      )}

      <table
        className={cn(
          "border-collapse border-spacing-0 font-mono text-xs",
          isWrapped ? "w-full table-fixed" : "w-max min-w-full"
        )}
      >
        <tbody>
          {lines.map((line, idx) => (
            <tr
              key={idx}
              className="leading-relaxed hover:bg-foreground/[0.03] transition-colors group"
            >
              {showLineNumbers && (
                <td
                  className={cn(
                    "select-none text-right pr-4 text-[10px] text-[#6c6a64] dark:text-[#8e8b82] tabular-nums align-top whitespace-nowrap opacity-40 group-hover:opacity-75 transition-opacity",
                    isWrapped ? "w-8 sm:w-10" : "w-10"
                  )}
                >
                  {idx + 1}
                </td>
              )}
              <td
                className={cn(
                  "font-mono align-top text-left",
                  isWrapped
                    ? "whitespace-pre-wrap break-all sm:break-words [word-break:break-word]"
                    : "whitespace-pre"
                )}
              >
                {line.length === 0 ? <span className="inline-block h-4">&nbsp;</span> : highlightLine(line)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

