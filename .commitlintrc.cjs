/* eslint-disable no-undef */
const fs = require('node:fs');
const path = require('node:path');

const apps = fs.readdirSync(path.resolve(__dirname, 'apps'));
const packages = fs.readdirSync(path.resolve(__dirname, 'packages'));
const tooling = fs.readdirSync(path.resolve(__dirname, 'tooling'));

/** @type {import("cz-git").UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    alias: {
      b: 'chore(repo): :hammer: bump dependencies',
    },
    allowCustomIssuePrefix: false,
    allowEmptyIssuePrefix: false,
    enableMultipleScopes: true,
    maxSubjectLength: 100,
    scopeEnumSeparator: ',',
    skipQuestions: ['footer'],
    useEmoji: true,
  },
  rules: {
    'scope-enum': [2, 'always', ['repo', ...apps, ...packages, ...tooling]],
    'subject-empty': [2, 'never'],
    'subject-min-length': [2, 'always', 2],
  },
};
