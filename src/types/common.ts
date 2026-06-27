export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  workingHours: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavigationLink {
  label: string;
  href: string;
}
