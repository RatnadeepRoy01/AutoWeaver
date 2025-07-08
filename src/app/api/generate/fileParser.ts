export function parseGeminiResponse(rawResponse: string) {
  // Extract HTML, CSS, and JS using improved regex patterns
  const htmlMatch = rawResponse.match(/<!-- index\.html -->([\s\S]*?)(?=<!-- |$)/i);
  const cssMatch = rawResponse.match(/<!-- style\.css -->([\s\S]*?)(?=<!-- |$)/i);
  const jsMatch = rawResponse.match(/<!-- index\.js -->([\s\S]*?)(?=<!-- |$)/i);

  let html = htmlMatch ? htmlMatch[1].trim() : '';
  let css = cssMatch ? cssMatch[1].trim() : '';
  let js = jsMatch ? jsMatch[1].trim() : '';

  // Fallback extraction if comment format isn't followed
  if (!html || !css || !js) {
    const codeBlocks = rawResponse.match(/```[\s\S]*?```/g) || [];
    for (const block of codeBlocks) {
      const content = block.replace(/```[\w]*\n?|\n?```/g, '').trim();
      if (content.includes('<!DOCTYPE html') || content.includes('<html')) {
        html = html || content;
      } else if (content.includes('body') && content.includes('{') && content.includes('}')) {
        css = css || content;
      } else if (content.includes('console.log') || content.includes('function') || content.includes('document')) {
        js = js || content;
      }
    }
  }

  // Additional fallback: try to extract inline styles and scripts from HTML
  if (!css && html) {
    const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    if (styleMatch) {
      css = styleMatch[1].trim();
      html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '').trim();
    }
  }
  if (!js && html) {
    const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    if (scriptMatch) {
      js = scriptMatch[1].trim();
      html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();
    }
  }

  // Ensure HTML has proper external references
  if (html && !html.includes('href="style.css"')) {
    html = html.replace(/<\/head>/, '    <link rel="stylesheet" href="style.css">\n</head>');
  }
  if (html && !html.includes('src="index.js"')) {
    html = html.replace(/<\/body>/, '    <script src="index.js"></script>\n</body>');
  }

  // Provide defaults if extraction fails
  if (!html) {
    html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Generated Website</title>\n    <link rel="stylesheet" href="style.css">\n</head>\n<body>\n    <h1>Generated Website</h1>\n    <p>This is a generated website based on your request.</p>\n    <script src="index.js"></script>\n</body>\n</html>`;
  }
  if (!css) {
    css = `body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n    background-color: #f5f5f5;\n}\n\nh1 {\n    color: #333;\n    text-align: center;\n}\n\np {\n    color: #666;\n    line-height: 1.6;\n}`;
  }
  if (!js) {
    js = `document.addEventListener('DOMContentLoaded', function() {\n    console.log('Website loaded successfully');\n    \n    // Add your JavaScript functionality here\n});`;
  }

  return { html, css, js };
}
