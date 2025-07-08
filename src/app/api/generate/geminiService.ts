export async function generateContent(apiKey: string, prompt: string) {
  const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    })
  });
  if (!geminiRes.ok) throw new Error(`Gemini API error: ${geminiRes.status}`);
  const data = await geminiRes.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export async function updateFile(apiKey: string, fileType: 'html' | 'css' | 'js', prompt: string, currentContent: string) {
  let filePrompt = '';
  if (fileType === 'html') {
    filePrompt = `Update the following HTML file based on this user request: "${prompt}"
Current HTML:
${currentContent}
Return ONLY the updated HTML file.`;
  } else if (fileType === 'css') {
    filePrompt = `Update the following CSS file based on this user request: "${prompt}"
Current CSS:
${currentContent}
Return ONLY the updated CSS file.`;
  } else if (fileType === 'js') {
    filePrompt = `Update the following JavaScript file based on this user request: "${prompt}"
Current JavaScript:
${currentContent}
Return ONLY the updated JavaScript file.`;
  }
  return generateContent(apiKey, filePrompt);
}
