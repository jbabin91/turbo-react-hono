import { type FileRoutesByPath } from '@tanstack/react-router';

export type NavigationLink = {
  label: string;
  to: FileRoutesByPath[keyof FileRoutesByPath]['fullPath'];
  exact?: boolean;
};
