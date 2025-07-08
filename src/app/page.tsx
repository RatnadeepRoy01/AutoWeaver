"use client";
import { useState, useRef, useEffect } from "react";
import { Download, Code, Globe, Sparkles, FileText, Folder, ChevronRight, RefreshCw } from "lucide-react";
import { GeneratedData, TabType } from "./utils/types";
import { createPreviewUrl, downloadProject } from "./utils/helpers";
import { PromptInput } from "./components/PromptInput";
import { Header } from "./components/Header";
import { ProjectInfo } from "./components/ProjectInfo";
import { Tabs } from "./components/Tabs";
import { Preview } from "./components/Preview";
import { SourceCodeViewer } from "./components/SourceCodeViewer";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [generatedData, setGeneratedData] = useState<GeneratedData | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("preview");
  const [activeFile, setActiveFile] = useState<number>(0);
  const [previewKey, setPreviewKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // --- Add follow-up prompt state ---
  const [followupPrompt, setFollowupPrompt] = useState<string>("");
  const [followupLoading, setFollowupLoading] = useState<boolean>(false);
  const [followupError, setFollowupError] = useState<string>("");
  // --- Netlify deploy state ---
  const [deploying, setDeploying] = useState(false);
  const [deployError, setDeployError] = useState("");
  const [deployUrl, setDeployUrl] = useState("");

  const handleGenerate = async (): Promise<void> => {
    setLoading(true);
    setError("");
    setGeneratedData(null);
    
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.success) {
        // If 'updated' is present, only update those files, else replace all
        setGeneratedData(prev => {
          if (Array.isArray(data.updated)) {
            // Partial update (shouldn't happen on initial generate, but handle just in case)
            const updatedData = { ...(prev || {}) };
            if (data.updated.includes("html") && typeof data.html === "string") {
              updatedData.html = data.html;
            }
            if (data.updated.includes("css") && typeof data.css === "string") {
              updatedData.css = data.css;
            }
            if (data.updated.includes("js") && typeof data.js === "string") {
              updatedData.js = data.js;
            }
            // Also update projectName/description if present
            if (data.projectName) updatedData.projectName = data.projectName;
            if (data.description) updatedData.description = data.description;
            return updatedData;
          } else {
            // Full replace
            return data;
          }
        });
        setActiveTab("preview");
        setActiveFile(0);
        setPreviewKey(prev => prev + 1);
      } else {
        setError(data.error || "Failed to generate website");
      }
    } catch (e) {
      setError("Network error. Please try again.");
      console.error("Generation error:", e);
    } finally {
      setLoading(false);
    }
  };

  const refreshPreview = () => {
    setPreviewKey(prev => prev + 1);
  };

  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (generatedData && generatedData.html) {
      // Clean up previous URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      
      const newUrl = createPreviewUrl(
        generatedData.html,
        generatedData.css || "",
        generatedData.js || ""
      );
      setPreviewUrl(newUrl);
    }
    
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [generatedData, previewKey]);

  // --- Add follow-up handler ---
  const handleFollowup = async (): Promise<void> => {
    if (!generatedData) return;
    setFollowupLoading(true);
    setFollowupError("");
    try {
      // Send follow-up prompt and current files to backend
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: followupPrompt,
          files: {
            html: generatedData.html,
            css: generatedData.css,
            js: generatedData.js
          }
        }),
      });
      const data = await res.json();
      if (data.success) {
        // If 'updated' is present, only update those files, else replace all
        setGeneratedData(prev => {
          if (!prev) return prev;
          if (Array.isArray(data.updated)) {
            const updatedData = { ...prev };
            if (data.updated.includes("html") && typeof data.html === "string") {
              updatedData.html = data.html;
            }
            if (data.updated.includes("css") && typeof data.css === "string") {
              updatedData.css = data.css;
            }
            if (data.updated.includes("js") && typeof data.js === "string") {
              updatedData.js = data.js;
            }
            // Also update projectName/description if present
            if (data.projectName) updatedData.projectName = data.projectName;
            if (data.description) updatedData.description = data.description;
            return updatedData;
          } else {
            // Full replace
            return data;
          }
        });
        setPreviewKey(prev => prev + 1);
        setFollowupPrompt("");
      } else {
        setFollowupError(data.error || "Failed to update website");
      }
    } catch (e) {
      setFollowupError("Network error. Please try again.");
      console.error("Follow-up error:", e);
    } finally {
      setFollowupLoading(false);
    }
  };

  const handleDeploy = async () => {
    if (!generatedData) return;
    setDeploying(true);
    setDeployError("");
    setDeployUrl("");
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          html: generatedData.html,
          css: generatedData.css,
          js: generatedData.js,
          projectName: generatedData.projectName || "website"
        })
      });
      const data = await res.json();
      if (data.success && data.url) {
        setDeployUrl(data.url);
      } else {
        setDeployError(data.error || "Failed to deploy to Netlify");
      }
    } catch (e) {
      setDeployError("Network error. Please try again.");
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        {/* Input Section */}
        <PromptInput
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          handleGenerate={handleGenerate}
          error={error}
        />

        {/* Results Section */}
        {generatedData && (
          <div className="max-w-7xl mx-auto">
            {/* Project Info */}
            <ProjectInfo
              projectName={generatedData.projectName || "Generated Website"}
              description={generatedData.description || ""}
              onRefresh={refreshPreview}
              onDownload={() => downloadProject(generatedData)}
              onDeploy={handleDeploy}
              deploying={deploying}
              deployError={deployError}
              deployUrl={deployUrl}
            />

            {/* Tabs */}
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              {activeTab === "preview" && (
                <Preview
                  previewUrl={previewUrl}
                  previewKey={previewKey}
                  iframeRef={iframeRef}
                  generatedData={generatedData}
                  followupPrompt={followupPrompt}
                  setFollowupPrompt={setFollowupPrompt}
                  followupLoading={followupLoading}
                  handleFollowup={handleFollowup}
                  followupError={followupError}
                />
              )}

              {activeTab === "code" && (
                <SourceCodeViewer
                  activeFile={activeFile}
                  setActiveFile={setActiveFile}
                  generatedData={generatedData}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}