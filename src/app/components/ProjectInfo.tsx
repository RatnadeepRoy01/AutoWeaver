import React from "react";

interface ProjectInfoProps {
  projectName: string;
  description: string;
  onRefresh: () => void;
  onDownload: () => void;
  onDeploy: () => void;
  deploying: boolean;
  deployError: string;
  deployUrl: string;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({
  projectName,
  description,
  onRefresh,
  onDownload,
  onDeploy,
  deploying,
  deployError,
  deployUrl
}) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {projectName}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {/* You can import and use the RefreshCw icon here if needed */}
          Refresh
        </button>
        <button
          onClick={onDownload}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {/* You can import and use the Download icon here if needed */}
          Download Project
        </button>
        <button
          onClick={onDeploy}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={deploying}
        >
          {/* You can import and use the Globe icon here if needed */}
          {deploying ? "Deploying..." : "Deploy to Netlify"}
        </button>
      </div>
    </div>
    {/* Deploy status */}
    {deployError && (
      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{deployError}</div>
    )}
    {deployUrl && (
      <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
        Deployed! View your site: <a href={deployUrl} target="_blank" rel="noopener noreferrer" className="underline font-semibold">{deployUrl}</a>
      </div>
    )}
  </div>
); 