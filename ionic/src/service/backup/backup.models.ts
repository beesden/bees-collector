interface DataBackup {
  version: number;
  date: string;
  figures: FigureData[];
  collections: CollectionData[];
}

interface FigureData {
  id: string;
  name: string;
  variant: string;
  notes: string;
  manufacturer: string;
  collected: boolean;
  damaged: boolean;
  incomplete: boolean;
  release: string;
  images: string[];
  accessories: Array<{ name: string, variant: string }>;
  properties: Array<{ name: string, value: string }>;
  tags: string[];
  date_update: string;
  date_created: string;
}

interface CollectionData {
  id: number;
  name: string;
  series: string;
  description: string;
  images: string[];
  figures: string[];
}
