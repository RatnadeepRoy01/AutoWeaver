import React from "react";

export const Header: React.FC = () => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
    <div className="relative container mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium text-gray-600 mb-6 shadow-sm">
        {/* You can import and use the Sparkles icon here if needed */}
        AI-Powered Website Generation
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
        Multi-Page Website Generator
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Describe your vision, and watch as AI creates a complete, deployable website with proper routing and file structure
      </p>
    </div>
  </div>
); 