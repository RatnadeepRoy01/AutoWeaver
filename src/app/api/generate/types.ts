export interface GeneratedPage {
  name: string;
  content: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GeneratedData {
  success: boolean;
  projectName: string;
  description: string;
  pages?: GeneratedPage[];
  files?: GeneratedFile[];
  html?: string;
  css?: string;
  js?: string;
  error?: string;
}
