import React, { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
  children?: TOCItem[];
}

interface TableOfContentsProps {
  className?: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ className = '' }) => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Find all headings to create the ToC
    const headings = Array.from(document.querySelectorAll('h2, h3, h4'))
      .filter((el) => el.id || el.textContent);
    
    // Generate IDs for elements that don't have them
    headings.forEach((heading, index) => {
      if (!heading.id) {
        const id = `heading-${index}`;
        heading.id = id;
      }
    });

    // Build the ToC structure
    const buildTOC = (): TOCItem[] => {
      const items: TOCItem[] = [];

      headings.forEach((heading) => {
        const level = Number(heading.tagName.substring(1)) - 1; // h2 -> 1, h3 -> 2, etc.
        const id = heading.id;
        const title = heading.textContent?.replace(/[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}]/gu, '').trim() || '';

        const item: TOCItem = { id, title, level };
        items.push(item);
      });

      return items;
    };

    setToc(buildTOC());

    // Set up intersection observer to track active heading
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '0px 0px -80% 0px',
      threshold: 0.1,
    });

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`toc ${className}`}>
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Table of Contents</h3>
      <ul className="space-y-1 text-sm">
        {toc.map((item) => (
          <li 
            key={item.id} 
            style={{ paddingLeft: `${item.level * 0.75}rem` }}
            className="transition-all duration-200"
          >
            <a 
              href={`#${item.id}`}
              className={`block py-1 border-l-2 pl-3 hover:text-blue-600 transition-colors ${
                activeId === item.id 
                  ? 'border-blue-500 text-blue-700 font-medium' 
                  : 'border-gray-200 text-gray-600'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
