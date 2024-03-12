<!-- // generate readme with instructions of this todo app -->

# Todo App

A simple todo app with browser persistance, sort, filtering .

## Table of Contents

- [Features](#features)
- [Instructions](#instructions)
- [Development](#development)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)

## Features

## Instructions

# Development

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

# Deployment

1. Run `npm run build` to build the app for production
2. The build is minified and the filenames include the hashes
3. Your app is ready to be deployed!

## Tech Stack

- React
- Zustand
- Chakra UI
- Framermotion

## Folder Structure

- `src`
  - `components` - contains all the components
    - `Task`
    - `TaskList`
    - `TaskEditModal`
    - `FilterBar`
    - `Stats`
  - `constants` - contains constants
  - `hooks` - contains custom hooks
  - `types` - contains typescript types
  - `store` - contains the zustand store
  - `utils` - contains utility functions
  - `App.js` - the main app component
  - `index.js` - the entry point of the app
