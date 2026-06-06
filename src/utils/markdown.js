// Markdown utilities for the blogging platform

/**
 * Converts markdown text to HTML
 * @param {string} markdown - The markdown text to convert
 * @returns {string} HTML string
 */
export const markdownToHtml = (markdown) => {
  if (!markdown) return '';
  
  // Simple markdown parser (you can replace with a library like marked.js)
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/__(.*)__/gim, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');
  html = html.replace(/_(.*)_/gim, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[([^\[]+)\]\(([^\)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');
  
  // Images
  html = html.replace(/!\[([^\[]+)\]\(([^\)]+)\)/gim, '<img src="$2" alt="$1" class="img-fluid">');
  
  // Code blocks
  html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  html = html.replace(/`(.*?)`/gim, '<code>$1</code>');
  
  // Lists
  html = html.replace(/^\s*\* (.*)/gim, '<li>$1</li>');
  html = html.replace(/^\s*- (.*)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Blockquotes
  html = html.replace(/^\> (.*)/gim, '<blockquote>$1</blockquote>');
  
  // Line breaks
  html = html.replace(/\n$/gim, '<br />');
  
  return html;
};

/**
 * Extracts plain text from markdown
 * @param {string} markdown - The markdown text
 * @returns {string} Plain text
 */
export const markdownToPlainText = (markdown) => {
  if (!markdown) return '';
  
  let text = markdown;
  
  // Remove markdown syntax
  text = text.replace(/#{1,6}\s/g, '');
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  text = text.replace(/\*(.*?)\*/g, '$1');
  text = text.replace(/\[(.*?)\]\(.*?\)/g, '$1');
  text = text.replace(/`(.*?)`/g, '$1');
  text = text.replace(/```[\s\S]*?```/g, '');
  text = text.replace(/!\[.*?\]\(.*?\)/g, '');
  text = text.replace(/^\s*[-*+]\s/g, '');
  text = text.replace(/^\d+\.\s/g, '');
  text = text.replace(/^\>\s/g, '');
  
  return text.trim();
};

/**
 * Generates a reading time estimate
 * @param {string} markdown - The markdown text
 * @returns {string} Reading time string
 */
export const getReadingTime = (markdown) => {
  if (!markdown) return '0 min read';
  
  const text = markdownToPlainText(markdown);
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
};

/**
 * Generates a table of contents from markdown headers
 * @param {string} markdown - The markdown text
 * @returns {Array} Array of heading objects
 */
export const generateTOC = (markdown) => {
  if (!markdown) return [];
  
  const toc = [];
  const headerRegex = /^(#{1,6})\s+(.*)$/gm;
  let match;
  
  while ((match = headerRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^\w]+/g, '-');
    
    toc.push({
      level,
      text,
      id
    });
  }
  
  return toc;
};

/**
 * Validates markdown for common issues
 * @param {string} markdown - The markdown to validate
 * @returns {Object} Validation result
 */
export const validateMarkdown = (markdown) => {
  const errors = [];
  const warnings = [];
  
  if (!markdown || markdown.length === 0) {
    errors.push('Content cannot be empty');
  }
  
  // Check for unclosed code blocks
  const codeBlockCount = (markdown.match(/```/g) || []).length;
  if (codeBlockCount % 2 !== 0) {
    warnings.push('Unclosed code block detected');
  }
  
  // Check for broken links
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let linkMatch;
  while ((linkMatch = linkRegex.exec(markdown)) !== null) {
    const url = linkMatch[2];
    if (!url.startsWith('http') && !url.startsWith('/') && !url.startsWith('#')) {
      warnings.push(`Possible broken link: ${url}`);
    }
  }
  
  // Check for images without alt text
  const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(markdown)) !== null) {
    if (!imgMatch[1]) {
      warnings.push('Image missing alt text');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Truncates markdown to a specified length
 * @param {string} markdown - The markdown to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated markdown
 */
export const truncateMarkdown = (markdown, maxLength = 300) => {
  if (!markdown) return '';
  
  const plainText = markdownToPlainText(markdown);
  
  if (plainText.length <= maxLength) {
    return markdown;
  }
  
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
};

/**
 * Converts HTML to markdown (basic)
 * @param {string} html - HTML string
 * @returns {string} Markdown string
 */
export const htmlToMarkdown = (html) => {
  if (!html) return '';
  
  let markdown = html;
  
  // Convert common HTML tags to markdown
  markdown = markdown.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n');
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n');
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n');
  markdown = markdown.replace(/<strong>(.*?)<\/strong>/g, '**$1**');
  markdown = markdown.replace(/<b>(.*?)<\/b>/g, '**$1**');
  markdown = markdown.replace(/<em>(.*?)<\/em>/g, '*$1*');
  markdown = markdown.replace(/<i>(.*?)<\/i>/g, '*$1*');
  markdown = markdown.replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)');
  markdown = markdown.replace(/<img src="(.*?)" alt="(.*?)"(\s*)\/?>/g, '![$2]($1)');
  markdown = markdown.replace(/<code>(.*?)<\/code>/g, '`$1`');
  markdown = markdown.replace(/<pre><code>(.*?)<\/code><\/pre>/g, '```\n$1\n```');
  markdown = markdown.replace(/<br\s*\/?>/g, '\n');
  markdown = markdown.replace(/<p>(.*?)<\/p>/g, '$1\n\n');
  
  // Remove any remaining HTML tags
  markdown = markdown.replace(/<[^>]*>/g, '');
  
  return markdown.trim();
};

// Export all utilities as a single object
export default {
  markdownToHtml,
  markdownToPlainText,
  getReadingTime,
  generateTOC,
  validateMarkdown,
  truncateMarkdown,
  htmlToMarkdown
};