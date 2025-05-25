import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: Maybe<string>;
  deployment: Deployment;
}

export const defaultDimensions: Tuple<number> = [450, 220];

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription: string;
  repository: string;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'MemGen',
    slug: 'memgen',
    banner: '/static/projects/memgen/banner.png',
    website: 'https://memgen.musadiqpeerzada.com',
    repository: 'https://github.com/musadiqpeerzada/memgen.ai',
    description:
      'MemGen is an AI-powered meme generation tool that analyzes business profiles from a provided URL and uses template embeddings to generate highly relatable memes. It selects the most relevant templates from a curated collection and converts them into actual memes using memegen.link. Designed to be fast, fun, and context-aware, MemGen helps businesses express their tone with wit.',
    shortDescription:
      'AI-powered meme generation from URLs using intelligent template matching and memegen.link.',
    stack: [Stack.fastapi],
    dimensions: [340, 620],
    screenshots: ['/static/projects/memgen/homepage.png'],
    deployment: {
      web: 'https://memgen.musadiqpeerzada.com',
    },
    subProjects: [
      {
        title: 'memgen-ui',
        description:
          'Frontend UI for MemGen, offering a smooth meme generation experience.',
        repository: 'http://github.com/musadiqpeerzada/memgen-ui',
        deployment: {
          web: 'https://memgen.musadiqpeerzada.com',
        },
      },
    ],
  },
  {
    title: 'Closeknit',
    slug: 'closeknit',
    banner: '/static/projects/closeknit/banner.png',
    website: 'https://closeknit.io/',
    description:
      "Closeknit is an open-source platform started by Bharat Kalluri. I contributed to the project by implementing the 'Requests' feature, which allows users to request resources or help from the community. This addition enhanced the platform’s ability to foster support among its users.",
    shortDescription:
      'Contributed to Closeknit by adding the Requests feature to support community-driven interactions.',
    repository: 'http://github.com/bharatKalluri/closeknit',
    stack: [Stack.django],
    dimensions: [100, 250],
    screenshots: ['/static/projects/closeknit/requests.png'],
    deployment: {
      web: 'https://closeknit.io',
    },
    subProjects: [],
  },
  {
    title: 'GIgnoreX',
    slug: 'gignorex',
    banner: '/static/projects/gignorex/banner.png',
    website: 'https://www.npmjs.com/package/gignorex',
    description:
      'This tool is designed to handle Git-ignore functionality for files that editors or IDEs produce (such as configuration files) that you don`t want to push to Git but also don`t want to add explicitly to the .gitignore file.',
    shortDescription:
      'A cli for ignoring files by vcs without adding them to the .gitignore file.',
    repository: 'https://github.com/musadiqpeerzada/gignorex',
    stack: [Stack.javascript, Stack.git],
    dimensions: [340, 620],
    screenshots: [
      '/static/projects/gignorex/add.png',
      '/static/projects/gignorex/list_and_remove.png',
    ],
    deployment: {
      web: 'https://www.npmjs.com/package/gignorex',
    },
    subProjects: [],
  },
];
