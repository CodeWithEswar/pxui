import { PXIconCategory } from "./category";

export interface PXSearchRecord {
  name: string;
  slug: string;
  componentName: string;
  title: string;
  description: string;
  category: PXIconCategory;
  family?: string;
  tags: readonly string[];
  aliases: readonly string[];
  animated: boolean;
  hasFilled: boolean;
  status: string;
}

export interface PXManifest {
  version: string;
  generatedAt: string;
  iconCount: number;
  categories: readonly string[];
  families: readonly string[];
  collections: readonly string[];
}
