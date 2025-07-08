import React, { RefObject } from "react";
import { RefreshCw } from "lucide-react";
import { GeneratedData } from "../utils/types";

interface PreviewProps {
  previewUrl: string;
  previewKey: number;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  generatedData: GeneratedData;
  followupPrompt: string;
  setFollowupPrompt: (value: string) => void;
  followupLoading: boolean;
  handleFollowup: () => void;
  followupError: string;
}

export const Preview: React.FC<PreviewProps> = ({
  previewUrl,
  previewKey,
  iframeRef,
  generatedData,
  followupPrompt,
  setFollowupPrompt,
  followupLoading,
  handleFollowup,
  followupError
}) => (
  <div className="p-6">
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">Website Preview</h4>
      <p className="text-sm text-gray-600">Live preview of your generated website</p>
    </div>
    <div className="border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="bg-white rounded px-3 py-1 text-sm text-gray-600 font-mono">
            {generatedData.projectName || "website"}.html
          </div>
        </div>
      </div>
      {previewUrl && (
        <iframe
          key={previewKey}
          ref={iframeRef}
          src={previewUrl}
          className="w-full h-[600px] border-0"
          title="Website Preview"
          sandbox="allow-scripts  allow-forms allow-popups-to-escape-sandbox"
          style={{ backgroundColor: '#ffffff', display: 'block' }}
        />
      )}
    </div>
    {/* --- Follow-up prompt area --- */}
    <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-xl p-6">
      <h5 className="text-md font-semibold text-blue-700 mb-2">Want to update your website further?</h5>
      <textarea
        className="w-full p-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:outline-none bg-white/70 text-gray-800 placeholder-gray-500 min-h-[60px] resize-none transition-all duration-200 mb-2"
        placeholder="Describe what you want to change or add..."
        value={followupPrompt}
        onChange={e => setFollowupPrompt(e.target.value)}
        disabled={followupLoading}
      />
      <button
        className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
        onClick={handleFollowup}
        disabled={followupLoading || !followupPrompt.trim()}
      >
        {followupLoading ? (
          <span className="flex items-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Updating...</span>
        ) : (
          <span>Update Website</span>
        )}
      </button>
      {followupError && (
        <div className="mt-2 text-red-600 text-sm">{followupError}</div>
      )}
    </div>
  </div>
); 