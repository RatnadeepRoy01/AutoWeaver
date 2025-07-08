import React from "react";
import { FileText } from "lucide-react";
import { GeneratedData } from "../utils/types";

interface SourceCodeViewerProps {
  activeFile: number;
  setActiveFile: (file: number) => void;
  generatedData: GeneratedData;
}

export const SourceCodeViewer: React.FC<SourceCodeViewerProps> = ({ activeFile, setActiveFile, generatedData }) => (
  <div className="p-6">
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Source Code</h4>
      <div className="flex gap-2 overflow-x-auto">
        <button
          className={`px-4 py-2 rounded-lg font-mono text-sm whitespace-nowrap transition-all duration-200 ${activeFile === 0 ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          onClick={() => setActiveFile(0)}
        >
          index.html
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-mono text-sm whitespace-nowrap transition-all duration-200 ${activeFile === 1 ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          onClick={() => setActiveFile(1)}
        >
          style.css
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-mono text-sm whitespace-nowrap transition-all duration-200 ${activeFile === 2 ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          onClick={() => setActiveFile(2)}
        >
          main.js
        </button>
      </div>
    </div>
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-300 font-mono">
            {activeFile === 0 && "index.html"}
            {activeFile === 1 && "style.css"}
            {activeFile === 2 && "main.js"}
          </span>
        </div>
      </div>
      <pre className="p-4 text-sm text-gray-100 overflow-x-auto max-h-[500px] overflow-y-auto">
        <code>
          {activeFile === 0 && (generatedData.html || "// HTML content will appear here")}
          {activeFile === 1 && (generatedData.css || "/* CSS styles will appear here */")}
          {activeFile === 2 && (generatedData.js || "// JavaScript code will appear here")}
        </code>
      </pre>
    </div>
  </div>
); 