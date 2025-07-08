export interface GeneratedData {
  success: boolean;
  projectName?: string;
  description?: string;
  html?: string;
  css?: string;
  js?: string;
  error?: string;
}

export type TabType = "preview" | "files" | "code"; 