import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownContentProps = {
  content: string;
};

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:text-text prose-p:text-text-muted prose-strong:text-text prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-hover prose-code:text-text prose-li:text-text-muted">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
