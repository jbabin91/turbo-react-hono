/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as AppRouteImport } from './routes/_app/route'
import { Route as IndexImport } from './routes/index'
import { Route as AuthSignUpImport } from './routes/_auth/sign-up'
import { Route as AuthSignInImport } from './routes/_auth/sign-in'
import { Route as AppTasksRouteImport } from './routes/_app/tasks/route'
import { Route as AppTasksIndexImport } from './routes/_app/tasks/index'
import { Route as AppTasksTaskIdImport } from './routes/_app/tasks/$taskId'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AppRouteRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignUpRoute = AuthSignUpImport.update({
  path: '/sign-up',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  path: '/sign-in',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AppTasksRouteRoute = AppTasksRouteImport.update({
  path: '/tasks',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppTasksIndexRoute = AppTasksIndexImport.update({
  path: '/',
  getParentRoute: () => AppTasksRouteRoute,
} as any)

const AppTasksTaskIdRoute = AppTasksTaskIdImport.update({
  path: '/$taskId',
  getParentRoute: () => AppTasksRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_app/tasks': {
      id: '/_app/tasks'
      path: '/tasks'
      fullPath: '/tasks'
      preLoaderRoute: typeof AppTasksRouteImport
      parentRoute: typeof AppRouteImport
    }
    '/_auth/sign-in': {
      id: '/_auth/sign-in'
      path: '/sign-in'
      fullPath: '/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/sign-up': {
      id: '/_auth/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthSignUpImport
      parentRoute: typeof AuthRouteImport
    }
    '/_app/tasks/$taskId': {
      id: '/_app/tasks/$taskId'
      path: '/$taskId'
      fullPath: '/tasks/$taskId'
      preLoaderRoute: typeof AppTasksTaskIdImport
      parentRoute: typeof AppTasksRouteImport
    }
    '/_app/tasks/': {
      id: '/_app/tasks/'
      path: '/'
      fullPath: '/tasks/'
      preLoaderRoute: typeof AppTasksIndexImport
      parentRoute: typeof AppTasksRouteImport
    }
  }
}

// Create and export the route tree

interface AppTasksRouteRouteChildren {
  AppTasksTaskIdRoute: typeof AppTasksTaskIdRoute
  AppTasksIndexRoute: typeof AppTasksIndexRoute
}

const AppTasksRouteRouteChildren: AppTasksRouteRouteChildren = {
  AppTasksTaskIdRoute: AppTasksTaskIdRoute,
  AppTasksIndexRoute: AppTasksIndexRoute,
}

const AppTasksRouteRouteWithChildren = AppTasksRouteRoute._addFileChildren(
  AppTasksRouteRouteChildren,
)

interface AppRouteRouteChildren {
  AppTasksRouteRoute: typeof AppTasksRouteRouteWithChildren
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppTasksRouteRoute: AppTasksRouteRouteWithChildren,
}

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
)

interface AuthRouteRouteChildren {
  AuthSignInRoute: typeof AuthSignInRoute
  AuthSignUpRoute: typeof AuthSignUpRoute
}

const AuthRouteRouteChildren: AuthRouteRouteChildren = {
  AuthSignInRoute: AuthSignInRoute,
  AuthSignUpRoute: AuthSignUpRoute,
}

const AuthRouteRouteWithChildren = AuthRouteRoute._addFileChildren(
  AuthRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/tasks': typeof AppTasksRouteRouteWithChildren
  '/sign-in': typeof AuthSignInRoute
  '/sign-up': typeof AuthSignUpRoute
  '/tasks/$taskId': typeof AppTasksTaskIdRoute
  '/tasks/': typeof AppTasksIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/sign-in': typeof AuthSignInRoute
  '/sign-up': typeof AuthSignUpRoute
  '/tasks/$taskId': typeof AppTasksTaskIdRoute
  '/tasks': typeof AppTasksIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_app': typeof AppRouteRouteWithChildren
  '/_auth': typeof AuthRouteRouteWithChildren
  '/about': typeof AboutRoute
  '/_app/tasks': typeof AppTasksRouteRouteWithChildren
  '/_auth/sign-in': typeof AuthSignInRoute
  '/_auth/sign-up': typeof AuthSignUpRoute
  '/_app/tasks/$taskId': typeof AppTasksTaskIdRoute
  '/_app/tasks/': typeof AppTasksIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/about'
    | '/tasks'
    | '/sign-in'
    | '/sign-up'
    | '/tasks/$taskId'
    | '/tasks/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/about'
    | '/sign-in'
    | '/sign-up'
    | '/tasks/$taskId'
    | '/tasks'
  id:
    | '__root__'
    | '/'
    | '/_app'
    | '/_auth'
    | '/about'
    | '/_app/tasks'
    | '/_auth/sign-in'
    | '/_auth/sign-up'
    | '/_app/tasks/$taskId'
    | '/_app/tasks/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AppRouteRoute: typeof AppRouteRouteWithChildren
  AuthRouteRoute: typeof AuthRouteRouteWithChildren
  AboutRoute: typeof AboutRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AppRouteRoute: AppRouteRouteWithChildren,
  AuthRouteRoute: AuthRouteRouteWithChildren,
  AboutRoute: AboutRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_app",
        "/_auth",
        "/about"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_app": {
      "filePath": "_app/route.tsx",
      "children": [
        "/_app/tasks"
      ]
    },
    "/_auth": {
      "filePath": "_auth/route.tsx",
      "children": [
        "/_auth/sign-in",
        "/_auth/sign-up"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/_app/tasks": {
      "filePath": "_app/tasks/route.tsx",
      "parent": "/_app",
      "children": [
        "/_app/tasks/$taskId",
        "/_app/tasks/"
      ]
    },
    "/_auth/sign-in": {
      "filePath": "_auth/sign-in.tsx",
      "parent": "/_auth"
    },
    "/_auth/sign-up": {
      "filePath": "_auth/sign-up.tsx",
      "parent": "/_auth"
    },
    "/_app/tasks/$taskId": {
      "filePath": "_app/tasks/$taskId.tsx",
      "parent": "/_app/tasks"
    },
    "/_app/tasks/": {
      "filePath": "_app/tasks/index.tsx",
      "parent": "/_app/tasks"
    }
  }
}
ROUTE_MANIFEST_END */
