import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

// Extended interfaces for ReactMarkdown components
interface LiProps {
  children?: React.ReactNode;
  ordered?: boolean;
  index?: number;
  [key: string]: any;
}

interface BlockquoteProps {
  children?: React.ReactNode;
  [key: string]: any;
}

interface UlProps {
  children?: React.ReactNode;
  ordered?: boolean;
  [key: string]: any;
}

// Interface for React element with children
interface ElementWithChildren {
  props: {
    children?: React.ReactNode;
    [key: string]: any;
  };
}

interface MarkdownContentChatProps {
  content: string;
}

const MarkdownContentChat: React.FC<MarkdownContentChatProps> = ({ content }) => {
  // Function to detect and render special callout blocks
  const renderCalloutBlock = (content: string, type: string) => {
    const variants = {
      tip: 'border-green-500 bg-green-950/30 text-green-100',
      warning: 'border-yellow-500 bg-yellow-950/30 text-yellow-100',
      danger: 'border-red-500 bg-red-950/30 text-red-100',
      info: 'border-blue-500 bg-blue-950/30 text-blue-100',
      note: 'border-gray-500 bg-gray-800/50 text-gray-100',
    };

    const icons = {
      tip: '💡',
      warning: '⚠️',
      danger: '🚨',
      info: 'ℹ️',
      note: '📝',
    };

    const variant = variants[type as keyof typeof variants] || variants.note;
    const icon = icons[type as keyof typeof icons] || icons.note;

    return (
      <div className={`border-l-4 p-4 my-4 rounded-r-lg ${variant}`}>
        <div className="flex items-start gap-2">
          <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
          <div className="flex-1">
            <div className="font-semibold capitalize mb-1">{type}</div>
            <div className="text-sm">{content}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="markdown-content prose prose-invert max-w-none">
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        components={{
          code({ node, inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            
            // Check for callout syntax in code blocks
            if (!inline && codeString.startsWith(':::')) {
              const lines = codeString.split('\n');
              const firstLine = lines[0];
              const typeMatch = firstLine.match(/^:::\s*(\w+)/);
              if (typeMatch) {
                const type = typeMatch[1].toLowerCase();
                const content = lines.slice(1, -1).join('\n'); // Remove first and last line
                return <div dangerouslySetInnerHTML={{ __html: renderCalloutBlock(content, type).props.children }} />;
              }
            }

            return !inline && match ? (
              <div className="relative group my-4">
                {/* Language badge */}
                <div className="absolute top-0 right-0 bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg font-mono z-10">
                  {match[1]}
                </div>
                {/* Copy button */}
                <button 
                  className="absolute top-2 right-16 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-600 hover:bg-gray-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => navigator.clipboard.writeText(codeString)}
                  title="Copy code"
                >
                  Copy
                </button>
                <SyntaxHighlighter 
                  style={atomDark} 
                  language={match[1]} 
                  PreTag="div"
                  customStyle={{ 
                    margin: '0', 
                    borderRadius: '0.5rem',
                    background: '#1a1a1a',
                    border: '1px solid #374151',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    padding: '1rem',
                    paddingTop: '2.5rem'
                  }} 
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code 
                className="bg-gray-800 text-emerald-300 px-2 py-1 rounded text-sm font-mono border border-gray-700" 
                {...props}
              >
                {children}
              </code>
            );
          },

          blockquote({ children, ...props }: BlockquoteProps) {
            const content = React.Children.toArray(children);
            const firstChild = content[0] as ElementWithChildren;
            
            // Check if it's a special callout blockquote
            if (React.isValidElement(firstChild) && firstChild.props && 'children' in firstChild.props) {
              const childContent = firstChild.props.children;
              const text = String(childContent || '').toLowerCase();
              if (text.startsWith('[!tip]') || text.startsWith('[!warning]') || 
                  text.startsWith('[!danger]') || text.startsWith('[!info]') || 
                  text.startsWith('[!note]')) {
                const typeMatch = text.match(/\[!(\w+)\]/);
                if (typeMatch) {
                  const type = typeMatch[1].toLowerCase();
                  const remainingContent = String(childContent || '').replace(/\[!\w+\]\s*/, '');
                  return renderCalloutBlock(remainingContent, type);
                }
              }
            }

            return (
              <blockquote className="border-l-4  bg-blue-950/20 pl-6 pr-4 py-3 italic text-blue-100 my-4 rounded-r-lg" {...props}>
                <div className="flex items-start gap-2">
                  {/* <span className="text-blue-400 text-xl flex-shrink-0">"</span> */}
                  <div>{children}</div>
                </div>
              </blockquote>
            );
          },

          h1({ children }) {
            return (
              <h1 className="text-3xl font-bold mb-4 text-white border-b border-gray-700 pb-2">
                {children}
              </h1>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-2xl font-semibold mb-3 text-white border-b border-gray-800 pb-1">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return <h3 className="text-xl font-semibold mb-2 text-white">{children}</h3>;
          },
          h4({ children }) {
            return <h4 className="text-lg font-semibold mb-2 text-gray-200">{children}</h4>;
          },
          h5({ children }) {
            return <h5 className="text-base font-semibold mb-1 text-gray-300">{children}</h5>;
          },
          h6({ children }) {
            return <h6 className="text-sm font-semibold mb-1 text-gray-400">{children}</h6>;
          },

          p({ children }) {
            return <p className="mb-4 text-gray-100 leading-relaxed">{children}</p>;
          },

          ul({ children, ...props }: UlProps) {
            return (
              <ul className="list-none mb-4 text-gray-100 space-y-2" {...props}>
                {children}
              </ul>
            );
          },
          ol({ children, ...props }) {
            return (
              <ol className="list-none mb-4 text-gray-100 space-y-2 counter-reset-item" {...props}>
                {children}
              </ol>
            );
          },
          li({ children, ...props }: LiProps) {
            const ordered = props.ordered;
            const index = props.index || 0;
            return (
              <li className="flex items-start gap-3 ml-4 relative" {...props}>
                <span className="flex-shrink-0 w-2 h-6 mt-0.5 text-white text-xs font-bold rounded-full flex items-center justify-center ">
                  {ordered ? index + 1 : '•'}
                </span>
                <div className="flex-1 pt-0.5">{children}</div>
              </li>
            );
          },

          a({ href, children }) {
            return (
              <a 
                href={href} 
                className="text-blue-400 hover:text-blue-300 underline decoration-blue-400/50 hover:decoration-blue-300 transition-colors" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },

          table({ children }) {
            return (
              <div className="overflow-x-auto mb-6 rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700 bg-gray-900">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-gray-800">{children}</thead>;
          },
          tbody({ children }) {
            return <tbody className="divide-y divide-gray-700">{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="hover:bg-gray-800/50 transition-colors">{children}</tr>;
          },
          th({ children }) {
            return (
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider bg-gray-800 first:rounded-tl-lg last:rounded-tr-lg">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-6 py-4 text-sm text-gray-100 whitespace-nowrap">
                {children}
              </td>
            );
          },

          hr() {
            return <hr className="my-8 border-gray-700" />;
          },

          strong({ children }) {
            return <strong className="font-bold text-white">{children}</strong>;
          },
          em({ children }) {
            return <em className="italic text-gray-200">{children}</em>;
          },

          del({ children }) {
            return <del className="line-through text-gray-400">{children}</del>;
          },

          input({ type, checked, disabled }) {
            if (type === 'checkbox') {
              return (
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={disabled}
                  className="mr-2 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                />
              );
            }
            return null;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContentChat;