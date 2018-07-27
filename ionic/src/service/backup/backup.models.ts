interface DataBackup {
  version: number;
  date: string;
  figures: FigureData[];
  collections: CollectionData[];
}

interface FigureData {
  id: number;
  name: string;
  variant: string;
  notes: string;
  series: string;
  range: string;
  manufacturer: string;
  collected: boolean;
  release: string;
  images: string[];
  accessories: Array<{ name: string, variant: string, collected: boolean }>;
  properties: Array<{ name: string, value: string }>;
  date_update: string;
  date_created: string;
}

interface CollectionData {
  id: number,
  name: string;
  description: string;
  images: string[];
  figures: number[];
}
