import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';



const CodeBlock: React.FC<{ children: React.ReactNode; language?: string; title?: string }> = ({ children, language = "python", title = "Code Example" }) => {
    // const codeRef = useRef<HTMLElement>(null); // No longer needed for react-syntax-highlighter's core functionality
    const [copied, setCopied] = useState(false);

    // useEffect(() => { // highlightElement is specific to highlight.js
    //     if (codeRef.current) {
    //         hljs.highlightElement(codeRef.current);
    //     }
    // }, [children, language]);

    const handleCopy = async () => {
        const codeToCopy = typeof children === 'string' ? children : String(children); // Ensure children is a string
        if (codeToCopy) {
            try {
                await navigator.clipboard.writeText(codeToCopy);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy text: ", err);
                alert("Failed to copy code.");
            }
        }
    };

    return (
        <div className="bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden my-6">
          <div className="flex justify-between items-center px-5 py-3 bg-gray-700 border-b border-gray-600">
            <span className="font-mono text-sm font-medium text-gray-100">{title}</span>
            <div className="flex items-center">
              {language && <span className="text-xs text-gray-400 uppercase mr-3 tracking-wide">{language}</span>}
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 bg-gray-600 hover:bg-gray-500 rounded text-xs font-medium text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                aria-label="Copy code"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          {/* Use SyntaxHighlighter component */}
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{ 
              padding: '1.5rem', 
              margin: 0, 
              overflowX: 'auto', 
              fontSize: '0.95rem',
              lineHeight: '1.5',
              fontFamily: "'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace"
            }}
            showLineNumbers // Optional: if you want line numbers
            wrapLines={true} // Optional: to wrap long lines
            className="text-sm font-mono leading-relaxed" // Apply similar text styling
          >
            {String(children).trim()} {/* Ensure children is a string and trim whitespace */}
          </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;