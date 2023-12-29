export enum ContactType {
  github = 'github',
  linkedin = 'linkedin',
  twitter = 'twitter',
  youtube = 'youtube',
  email = 'email',
  buymeacoffee = 'buymeacoffee',
}

export interface Contact {
  twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}

export const contact: Contact = {
  twitter: '@musadiqperzada',
  site: 'musadiqpeerzada.com',
  calendly: 'https://calendly.com/musadiqpeerzada/meet',
  links: {
    github: 'https://github.com/musadiqpeerzada',
    linkedin: 'https://linkedin.com/in/musadiqpeerzada',
    twitter: 'https://twitter.com/musadiqperzada',
    youtube: 'https://www.youtube.com/c/musadiqperzada',
    email: 'mailto:me@musadiqpeerzada.com',
    buymeacoffee: 'https://www.buymeacoffee.com/musadiqpeerzada',
  },
};
