import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parse inline formatting: **bold**, *italic*, `code`, [link](url)
  const renderInline = (text: string): React.ReactNode => {
    // Split into tokens for bold, italic, code
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // Bold: **text**
      const boldMatch = remaining.match(/^([\s\S]*?)\*\*(.*?)\*\*([\s\S]*)$/);
      if (boldMatch) {
        if (boldMatch[1]) {
          parts.push(renderInline(boldMatch[1]));
        }
        parts.push(
          <strong key={`b-${keyIdx++}`} className="font-bold text-neutral-900 font-sans">
            {boldMatch[2]}
          </strong>
        );
        remaining = boldMatch[3];
        continue;
      }

      // Italic: *text*
      const italicMatch = remaining.match(/^([\s\S]*?)\*(.*?)\*([\s\S]*)$/);
      if (italicMatch && !italicMatch[1].endsWith('*') && !italicMatch[2].startsWith('*')) {
        if (italicMatch[1]) {
          parts.push(renderInline(italicMatch[1]));
        }
        parts.push(
          <em key={`i-${keyIdx++}`} className="italic text-neutral-800 font-sans">
            {italicMatch[2]}
          </em>
        );
        remaining = italicMatch[3];
        continue;
      }

      // Inline code: `text`
      const codeMatch = remaining.match(/^([\s\S]*?)`([^`]+)`([\s\S]*)$/);
      if (codeMatch) {
        if (codeMatch[1]) {
          parts.push(renderInline(codeMatch[1]));
        }
        parts.push(
          <code
            key={`c-${keyIdx++}`}
            className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-800"
          >
            {codeMatch[2]}
          </code>
        );
        remaining = codeMatch[3];
        continue;
      }

      parts.push(remaining);
      break;
    }

    return parts.length === 1 ? parts[0] : <span key={`inline-${keyIdx}`}>{parts}</span>;
  };

  // Split lines and group blocks
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let i = 0;
  let elementKey = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 1. Horizontal Rule: ---
    if (/^---+\s*$/.test(line)) {
      elements.push(
        <hr key={`hr-${elementKey++}`} className="my-8 sm:my-10 border-t border-neutral-200" />
      );
      i++;
      continue;
    }

    // 2. Headings: #, ##, ###
    if (line.startsWith('# ')) {
      elements.push(
        <h1
          key={`h1-${elementKey++}`}
          className="font-sans text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 tracking-tight leading-[1.25] mt-6 sm:mt-8 mb-4 sm:mb-6"
        >
          {renderInline(line.slice(2).trim())}
        </h1>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={`h2-${elementKey++}`}
          className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight leading-[1.3] mt-8 sm:mt-10 mb-3 sm:mb-4"
        >
          {renderInline(line.slice(3).trim())}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3
          key={`h3-${elementKey++}`}
          className="font-sans text-lg sm:text-xl font-bold text-neutral-900 tracking-tight leading-snug mt-6 sm:mt-8 mb-2 sm:mb-3"
        >
          {renderInline(line.slice(4).trim())}
        </h3>
      );
      i++;
      continue;
    }

    // 3. Blockquotes / Callout boxes: > text
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2).trim());
        i++;
      }
      const quoteText = quoteLines.join(' ');
      const isWarning = quoteText.toLowerCase().includes('warning:');

      elements.push(
        <div
          key={`quote-${elementKey++}`}
          className={`my-6 p-4 sm:p-5 rounded-2xl border ${
            isWarning
              ? 'bg-amber-500/10 border-amber-500/25 text-amber-950'
              : 'bg-blue-50/80 border-blue-500/20 text-[#1E3A8A]'
          } font-sans text-sm sm:text-base leading-relaxed`}
        >
          <div className="font-sans">{renderInline(quoteText)}</div>
        </div>
      );
      continue;
    }

    // 4. Code Blocks: ```
    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={`codeblock-${elementKey++}`}
          className="my-5 p-4 rounded-2xl bg-neutral-900 text-neutral-100 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed border border-neutral-800"
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      continue;
    }

    // 5. Tables: lines with |
    if (line.includes('|') && lines[i + 1] && lines[i + 1].includes('|') && lines[i + 1].includes('-')) {
      const headerLine = lines[i];
      i += 2; // skip header and separator
      const rowLines: string[] = [];
      while (i < lines.length && lines[i].includes('|')) {
        rowLines.push(lines[i]);
        i++;
      }

      const headers = headerLine
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean);

      const rows = rowLines.map((row) =>
        row
          .split('|')
          .map((s) => s.trim())
          .filter(Boolean)
      );

      elements.push(
        <div key={`table-${elementKey++}`} className="my-6 overflow-x-auto rounded-2xl border border-neutral-200">
          <table className="w-full text-left font-sans text-xs sm:text-sm">
            <thead className="bg-neutral-100 text-neutral-900 font-bold border-b border-neutral-200">
              <tr>
                {headers.map((h, hIdx) => (
                  <th key={hIdx} className="p-3 sm:p-3.5">
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 bg-white">
              {rows.map((r, rIdx) => (
                <tr key={rIdx} className="hover:bg-neutral-50/50">
                  {r.map((c, cIdx) => (
                    <td key={cIdx} className="p-3 sm:p-3.5 text-neutral-700">
                      {renderInline(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // 6. Unordered Lists: - or *
    if (/^[\-*]\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^[\-*]\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^[\-*]\s+/, '').trim());
        i++;
      }
      elements.push(
        <ul key={`ul-${elementKey++}`} className="my-4 sm:my-5 space-y-2 sm:space-y-2.5 font-sans pl-5 list-disc text-neutral-700 text-sm sm:text-base leading-relaxed marker:text-[#2563EB]">
          {listItems.map((item, itemIdx) => (
            <li key={itemIdx}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // 7. Ordered Lists: 1. 2.
    if (/^\d+\.\s+/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s+/, '').trim());
        i++;
      }
      elements.push(
        <ol key={`ol-${elementKey++}`} className="my-4 sm:my-5 space-y-2.5 font-sans pl-5 list-decimal text-neutral-700 text-sm sm:text-base leading-relaxed marker:font-bold marker:text-[#2563EB]">
          {listItems.map((item, itemIdx) => (
            <li key={itemIdx}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. Empty line: skip
    if (!line.trim()) {
      i++;
      continue;
    }

    // 9. Standard Paragraph
    elements.push(
      <p key={`p-${elementKey++}`} className="font-sans text-neutral-700 text-sm sm:text-[16px] leading-[1.75] my-3 sm:my-4">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="markdown-body font-sans text-neutral-800 space-y-1">{elements}</div>;
};
