import { Maybe, Tuple } from '../types';
import { Stack } from './stack';

export type Deployment = {
  web?: string;
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
  shortDescription?: string;
  repository: Maybe<string>;
  stack: Stack[];
  dimensions?: Tuple<number>; // Tuple of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects: SubProject[];
}

export const projects: Project[] = [
  {
    title: 'GIgnoreX',
    slug: 'gignorex',
    banner: '/static/projects/gignorex/banner.png',
    website: 'https://www.npmjs.com/package/gignorex',
    description:
      'This tool is designed to handle Git-ignore functionality for files that editors or IDEs produce (such as configuration files) that you don`t want to push to Git but also don`t want to add explicitly to the .gitignore file.',
    shortDescription:
      'a cli for ignoring files by vcs without adding them to the .gitignore file.',
    repository: 'https://github.com/musadiqpeerzada/gignorex',
    stack: [
      Stack.javascript,
      Stack.git,
    ],
    dimensions: [340, 620],
    screenshots: [
      '/static/projects/gignorex/add.png',
      '/static/projects/gignorex/list_and_remove.png',
    ],
    deployment: {
      web: 'https://www.npmjs.com/package/gignorex',
    },
    subProjects: [],
  }
];
