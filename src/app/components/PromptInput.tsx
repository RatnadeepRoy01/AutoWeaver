import React from "react";

interface PromptInputProps {
  prompt: string;
  setPrompt: (value: string) => void;
  loading: boolean;
  handleGenerate: () => void;
  error: string;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, loading, handleGenerate, error }) => (
  <div className="max-w-2xl mx-auto mb-12">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            {/* You can import and use the Code icon here if needed */}
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Describe Your Website</h2>
        </div>
        <textarea
          className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white/50 backdrop-blur-sm text-gray-800 placeholder-gray-500 min-h-[120px] resize-none transition-all duration-200"
          placeholder="Example: Create a modern portfolio website with Home, About, Projects, and Contact pages. Include a hero section, project gallery, and contact form. Use a clean, professional design with blue and white colors."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button
          className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating Website...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {/* You can import and use the Sparkles icon here if needed */}
              Generate Website
            </div>
          )}
        </button>
      </div>
    </div>
    {error && (
      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          {error}
        </div>
      </div>
    )}
  </div>
); 