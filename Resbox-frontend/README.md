# RESBOX - Frontend Documentation

## Introduction

### Project Name

**Resbox**

### Objective

**Resbox** is a web application created as the final project for the Rock The Code bootcamp. This application aims to address a specific need within the restaurant industry, providing useful tools for both restaurants and their consumer clients. The idea for Resbox stems from a passion for the restaurant sector, where this solution can help streamline processes and improve customer engagement.

### Main Technologies

The frontend of Resbox is built with the following core technologies:

- **React**: Library for building the user interface.
- **Vite**: Module bundler and development server for fast builds.
- **ESLint**: Linting tool to maintain code quality.
- **Chart.js & react-chartjs-2**: For creating interactive charts and data visualizations.
- **Leaflet & react-leaflet**: For integrating maps and geolocation.
- **date-fns**: Library for handling dates and times.
- **jsPDF & jsPDF-autotable**: For generating downloadable PDF reports.
- **react-hook-form**: For managing forms and validation.
- **@react-oauth/google**: OAuth integration with Google for secure user authentication.

## Installation and Setup

### Prerequisites

Before setting up the project, make sure you have the following software installed:

- **Node.js** (Recommended version: 20.x or higher)
- **npm** (comes with Node.js) or **yarn** as the package manager

### Cloning the Repository

To get started, clone the project repository from GitHub:

```bash
git clone https://github.com/danielemazzola/res-box_v2.git
```

This repository contains both the backend and frontend code. Each environment has its own documentation within the respective folders. For the frontend documentation, refer to the Resbox-frontend folder, which includes all files and instructions specific to the frontend setup.

Main Technologies
The Resbox frontend is built with the following key technologies, as specified in package.json:

React (18.3.1): Framework for building the user interface.
Vite (5.4.1): Development server and module bundler for fast builds.
ESLint (9.9.0): Linting tool to enforce code quality and standards.
Chart.js and react-chartjs-2: Libraries for data visualization through charts.
Leaflet and react-leaflet: Tools for implementing interactive maps and geolocation.
date-fns (4.1.0): Utility library for managing dates and times.
jsPDF and jsPDF-autotable: Libraries for creating PDF documents and reports.
react-hook-form (7.53.0): Library for form management and validation.
@react-oauth/google (0.12.1): Library for implementing Google OAuth for secure user authentication.

## Execution and Scripts

### Available Scripts

The `package.json` file includes several scripts to streamline development, build, and linting processes. Here’s a breakdown of each available script:

- **dev**: Starts the development server using Vite.

```bash
  npm run dev
```

Use this script during development to run a local server with hot-reloading, allowing you to see changes immediately.

build: Builds the project for production.

```bash
npm run build
```

This command compiles the application into a production-ready bundle, optimized for performance, and outputs it to the dist folder.

lint: Runs ESLint to check for code quality and potential issues.

```bash
npm run lint
```

This script uses the ESLint configuration in eslint.config.js to enforce coding standards and best practices, helping maintain consistent code quality.

preview: Starts a local server to preview the production build.

```bash
npm run preview
```

Use this script to view the final production build locally, which is especially helpful for testing before deploying.

ESLint Configuration
The ESLint configuration, located in eslint.config.js, includes the following key settings and rules:

Plugins:

react: Provides linting rules specific to React best practices.
react-hooks: Ensures correct usage of React hooks.
react-refresh: Helps manage component refresh behavior, useful for maintaining consistent hot-reloading during development.
Rules:

'react/jsx-no-target-blank': 'off': Disables warnings for links opening in new tabs without rel="noopener noreferrer".
'react-refresh/only-export-components': ['warn', { allowConstantExport: false }]: Warns if non-components are exported when using React Fast Refresh.
'react/prop-types': 'off': Disables the rule requiring prop-types for component props.
'react/jsx-one-expression-per-line': 'off': Disables enforcing one JSX expression per line.
'max-len': ['off']: Disables the max line length rule for flexibility.
The configuration file also sets up environment settings, such as ECMAScript version 2020 and jsx support, ensuring compatibility with React 18 and modern JavaScript features.

This section should help clarify each script’s purpose and the ESLint setup for maintaining code quality. Let me know if you’re ready for the next part!
