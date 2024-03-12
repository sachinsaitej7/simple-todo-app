<!-- // generate readme with instructions of this todo app -->

# Todo App

A simple todo app with browser persistance, sort, filtering .

## Table of Contents

- [Features](#features)
- [Development](#development)
- [Deployment](#deployment)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Instructions](#instructions)
- [Future Improvements](#future-improvements)


## Features

- Add a task
- Edit a task
- Delete a task
- Mark a task as completed
- Sort tasks by date created, due date, and name
- Filter tasks by category
- View stats of tasks
- Persist tasks in the browser
- Responsive design
- Dark mode

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

- React (library)
- Zustand (state management)
- Chakra UI (component library)
- Framermotion (animations)


## Folder Structure

- `src`
  - `components` - contains all the UI components
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
  - `index.css` - the global styles
  - `theme.js` - the chakra ui theme
  - `assets` - contains images and icons

 ## Instructions

- Add a task by clicking the plus button with the input field
- Edit a task by clicking the edit button
- Delete a task by clicking the delete button
- Mark a task as completed by clicking the check button
- Sort tasks by date created, due date, and name by clicking the sort button
- Filter tasks by category by clicking the filter button
- View stats of tasks at the button
- tasks automatically persist in the browser
- switch to dark mode by clicking the moon icon in the top right corner
- due date of a task is set to one week from the date of creation by default
- tasks are sorted by date created by default
- tasks are filtered by all by default


## Future Improvements

- Add a calendar view
- Add a reminder feature
- Add a priority feature
- Add a search feature
- share tasks with others
- Add a user authentication feature
- Add a backend to store tasks
