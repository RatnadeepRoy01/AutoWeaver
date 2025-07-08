import React from "react";
import { Globe, Code } from "lucide-react";
import { TabType } from "../utils/types";

interface TabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="flex gap-2 mb-6">
    {[
      { id: "preview" as TabType, label: "Preview", icon: Globe },
      { id: "code" as TabType, label: "Source Code", icon: Code }
    ].map(tab => (
      <button
        key={tab.id}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
          activeTab === tab.id
            ? "bg-white shadow-lg text-blue-600 border-2 border-blue-200"
            : "bg-white/50 text-gray-600 hover:bg-white/70"
        }`}
        onClick={() => setActiveTab(tab.id)}
      >
        <tab.icon className="w-5 h-5" />
        {tab.label}
      </button>
    ))}
  </div>
); 