# 🌐 AI Website Generator

Create beautiful, multi-page websites instantly with the power of AI! 🚀

This project uses Next.js and Google Gemini to turn your ideas into fully functional, downloadable, and deployable websites—no coding required.

---

## ✨ Features
- **AI-powered website generation**: Describe your vision, and AI creates HTML, CSS, and JS for you.
- **Multi-page support**: Get a real multi-page feel with smart sectioning and navigation.
- **Live preview**: Instantly see your generated site in a secure sandbox.
- **Source code viewer**: Inspect and download the generated files.
- **One-click deploy**: Deploy your site to Netlify with a single click.
- **Modular codebase**: Clean, maintainable, and extensible frontend and backend structure.

---

## 🗂️ Project Structure (Modular)

```
src/app/
  components/         # Reusable React components (PromptInput, Header, ProjectInfo, Tabs, Preview, SourceCodeViewer)
  hooks/              # (For custom hooks, if you add any)
  utils/              # Shared types and helper functions
  api/
    generate/
      route.ts        # Main API route
      geminiService.ts# Gemini API logic
      fileParser.ts   # File parsing/formatting logic
      types.ts        # Backend types/interfaces
  page.tsx            # Main page (UI orchestrator)
```

---

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up your environment variables:**
   - Create a `.env.local` file in the root of `ai-website-generator/`.
   - Add your Google Gemini API key:
     ```env
     GEMINI_API_KEY=your-gemini-api-key-here
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🔑 Environment Variables
- `GEMINI_API_KEY` (required): Your Google Gemini API key for AI-powered generation.

---

## 💡 Usage
1. Enter a description of the website you want (e.g., "Modern portfolio with Home, About, Projects, Contact").
2. Click **Generate Website**.
3. Preview, download, or deploy your new site instantly!
4. Use the follow-up prompt to refine or add features—AI will update your site on the fly.

---

## 🛠️ Customization & Extending
- Add new components to `components/` for more UI features.
- Add custom hooks to `hooks/` for advanced logic.
- Extend backend logic in `api/generate/` for more AI models or file types.

---

## 📦 Deploy
You can deploy this app to Vercel, Netlify, or any platform that supports Next.js.

---

## 🙏 Credits
- [Next.js](https://nextjs.org/)
- [Google Gemini](https://ai.google.dev/gemini-api/docs)
- [Netlify](https://www.netlify.com/)

---

Unleash your creativity. Let AI build your next website! ✨
