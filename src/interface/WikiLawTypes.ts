export interface Summary {
  summary: string;
}

export interface Translation {
  language_tagalog?: string | null;
  language_bisaya?: string | null;
  language_waray?: string | null;
  language_chavacano?: string | null;
}

export interface LawData {
  id: number;
  title: string;
  code: string;
  full_law: string;
  case_type: string;
  tags: string;
  summary?: Summary;
  translation?: Translation;
}
