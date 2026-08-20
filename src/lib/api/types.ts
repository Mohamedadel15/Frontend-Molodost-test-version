/*
 * Molodost CMS API (Postman "Molodost Website", documenter 17877869/2sBYArTryb).
 * Field lists per resource come from the backend team; image and list-valued
 * fields are typed loosely because their exact shape is not documented — the
 * mappers accept strings, `{ url | image | file }` objects and `{ name | title }`
 * objects alike.
 */

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** A URL string or an object carrying one. */
export type ApiImage = string | { url?: string; image?: string; file?: string; src?: string } | null;
/** A label string or an object carrying one. */
export type ApiLabel = string | { name?: string; title?: string; label?: string } | null;

export interface ApiServiceListRow {
  id: number | string;
  slug: string;
  title: string;
  short_description: string;
  image: ApiImage;
}

export interface ApiService extends ApiServiceListRow {
  description: string;
  images: ApiImage[];
}

export interface ApiProgram {
  id: number | string;
  slug: string;
  title: string;
  short_description: string;
  /** Free text, or a list of feature lines (`{ id, text }` objects on the live API). */
  details: string | Array<string | { id?: number | string; text?: string; name?: string }> | null;
  price: number | string | null;
  sale_price: number | string | null;
}

export interface ApiSpecialistListRow {
  id: number | string;
  slug: string;
  full_name: string;
  medical_role: string;
  short_description: string;
  header_images: ApiImage[];
}

export interface ApiSpecialist extends ApiSpecialistListRow {
  card_images: ApiImage[];
  clinical_focus: string;
  paragraph_1?: string | null;
  paragraph_2?: string | null;
  paragraph_3?: string | null;
  paragraph_4?: string | null;
  paragraph_5?: string | null;
  specializations: ApiLabel[];
  languages: ApiLabel[] | string;
}

export interface ApiStoryListRow {
  id: number | string;
  slug: string;
  title: string;
  short_description: string;
  header_images: ApiImage[];
  card_images: ApiImage[];
  categories: ApiLabel[];
}

export interface ApiStory extends ApiStoryListRow {
  challenge: string;
  patient_name: string;
  paragraph_1?: string | null;
  paragraph_2?: string | null;
  paragraph_3?: string | null;
  paragraph_4?: string | null;
  paragraph_5?: string | null;
  paragraph_6?: string | null;
}

export interface ApiArticleListRow {
  id: number | string;
  slug: string;
  title: string;
  short_description: string;
  image: ApiImage;
  published_time: string;
}

export interface ApiArticle extends ApiArticleListRow {
  /** Rich text (HTML) body. */
  content: string;
  images: ApiImage[];
  tags: ApiLabel[];
  categories: ApiLabel[];
}

export interface ApiFaq {
  id: number | string;
  slug: string;
  question: string;
  /** Rich text — the live API wraps it in <p>. */
  answer: string;
}
