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

### ESLint Configuration

The ESLint configuration, located in `eslint.config.js`, defines essential settings and rules for maintaining code quality in the Resbox project. Below is a detailed overview of its components:

#### Plugins
The following plugins are included to enhance linting capabilities:

- **react**: 
  - Provides linting rules specific to React best practices.
  
- **react-hooks**: 
  - Ensures correct usage of React hooks to avoid common pitfalls.
  
- **react-refresh**: 
  - Manages component refresh behavior, which is crucial for consistent hot-reloading during development.

#### Rules
Several custom rules have been defined to tailor ESLint to the project's needs:

- **`'react/jsx-no-target-blank': 'off'`**: 
  - Disables warnings for links opening in new tabs without `rel="noopener noreferrer"`.
  
- **`'react-refresh/only-export-components': ['warn', { allowConstantExport: false }]`**: 
  - Issues a warning if non-components are exported while using React Fast Refresh.
  
- **`'react/prop-types': 'off'`**: 
  - Disables the requirement for `prop-types` in component props.
  
- **`'react/jsx-one-expression-per-line': 'off'`**: 
  - Allows multiple expressions per line in JSX for improved flexibility.
  
- **`'max-len': ['off']`**: 
  - Disables the maximum line length rule, providing more freedom in code formatting.

#### Environment Settings
The ESLint configuration also specifies the environment settings:

- **ECMAScript Version**: Set to **2020** for compatibility with modern JavaScript features.
- **JSX Support**: Enabled to accommodate React's JSX syntax, ensuring smooth integration with React 18.

This structured approach to ESLint ensures that the project adheres to best practices while allowing flexibility where necessary.

