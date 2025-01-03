'use client'
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import he from 'he';

const CustomSyntaxHighlighter = SyntaxHighlighter as any;

function extractCode(content: string) {
    // Regex to extract content between <p> tags
    const regex = /<p>(.*?)<\/p>/g;
    let codeMatches = [];
    
    let match;
    while (match = regex.exec(content)) {
      // Strip any remaining HTML tags from the matched content and decode HTML entities
      const cleanLine = he.decode(match[1].replace(/<[^>]+>/g, ''));
      codeMatches.push(cleanLine);
    }
  
    // Join all lines with newline characters to preserve the code structure
    return codeMatches.join('\n');
  }

interface IProps {
    code: string;
    index: number;
}

const codeblock = ({ code, index }: IProps) => (
    <CustomSyntaxHighlighter
        key={`code-${index}`}
        language="python"
        style={vs2015}
        showLineNumbers
        customStyle={{ fontSize: '14px' }}
    >
        {extractCode(code)}
    </CustomSyntaxHighlighter>
);

export default codeblock;
