import { useAppTranslations } from "@/i18n";
import { cn } from "@/lib/utils";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import CopyMessageButton from "./CopyMessageButton";
hljs.registerLanguage("javascript", javascript);

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  children,
  className,
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useAppTranslations("Common");

  // Dynamically load the correct highlight.js theme
  useEffect(() => {
    const themeId = "hljs-theme";
    let link = document.getElementById(themeId) as HTMLLinkElement;

    if (!link) {
      link = document.createElement("link");
      link.id = themeId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    link.href = isDarkMode
      ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
      : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css";
  }, [isDarkMode]);

  useEffect(() => {
    if (!containerRef.current) return;
    const codes = containerRef.current.querySelectorAll("pre code");
    codes.forEach((block) => hljs.highlightElement(block as HTMLElement));
  }, [children, isDarkMode]);

  useEffect(() => {
    const styleId = "hljs-custom-bg";
    let style = document.getElementById(styleId) as HTMLStyleElement;

    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }

    style.textContent = isDarkMode
      ? `
        .markdown pre {
          border-radius: 8px !important;
          overflow: hidden !important;
        }
        .markdown pre code.hljs {
          border-radius: 8px !important;
        }
      `
      : `
        .markdown pre code.hljs {
          background-color: #f6f8fa !important; /* Light gray */
          border-radius: 8px !important;
        }
        .markdown pre {
          background-color: #f6f8fa !important;
          border-radius: 8px !important;
          overflow: hidden !important;
        }
      `;
  }, [isDarkMode]);

  return (
    <div
      ref={containerRef}
      className={cn("markdown break-words text-sm", className)}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-4 mb-2 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold mt-3 mb-2 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-2 mb-2 first:mt-0">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          a: ({ children, href }) => (
            <a
              href={href}
              className="text-primary underline hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc ps-6 mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal ps-6 mb-4">{children}</ol>
          ),
          li: ({ children }) => <li className="">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-s-4 border-primary/30 ps-4 py-2 my-4 italic text-description">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6 border-border" />,
          del: ({ children }) => <del className="line-through">{children}</del>,
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="border-collapse border border-border rounded-md w-full">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border border-border px-3 py-2 text-start font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-2">{children}</td>
          ),
          tr: ({ children }) => <tr>{children}</tr>,
          pre: ({ children }) => (
            <pre className="rounded-lg overflow-hidden my-4">{children}</pre>
          ),
          code: ({ children, className, ...props }) => {
            const isInline = !className?.includes("language-");

            // Extract text content from React children
            const getTextContent = (node: React.ReactNode): string => {
              if (typeof node === "string") return node;
              if (typeof node === "number") return node.toString();
              if (Array.isArray(node)) return node.map(getTextContent).join("");
              if (React.isValidElement(node)) {
                const element = node as React.ReactElement<{
                  children?: React.ReactNode;
                }>;
                if (element.props.children) {
                  return getTextContent(element.props.children);
                }
              }
              return "";
            };

            const textContent = getTextContent(children);

            if (isInline) {
              return (
                <code
                  className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <div className="relative">
                <div className="flex justify-between items-center pt-2 px-[14px]">
                  <p className="text-xs text-muted-foreground">
                    {className
                      ?.replace("language-", "")
                      ?.replace("hljs", "")
                      ?.trim() || "code"}
                  </p>
                  <CopyMessageButton
                    content={textContent}
                    tooltipText={t("copyCode")}
                  />
                </div>
                <code className={`${className} rounded-lg block`} {...props}>
                  {children}
                </code>
              </div>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
