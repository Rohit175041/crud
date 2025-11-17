crud/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── api/
│   │   └── api.js
│   │
│   ├── components/
│   │   └── UserForm.jsx
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── UserDetails.js
│   │   └── NotFound.js
│   │
│   ├── router/
│   │   └── AppRouter.js
│   │
│   ├── styles/
│   │   └── styles.css
│   │
│   ├── App.js
│   └── index.js
│
├── .env

# CRUD React - User Manager

Lightweight React app to manage users (Create, Read, Update, Delete). Data is stored in-browser using `localStorage` so there is no backend required to try the app.

## Project structure (key files)

- `public/` – static assets and `index.html`
- `src/`
	- `components/UserForm.js` – form to create / edit users
	- `components/UserList.js` – list of users with Edit/Delete actions
	- `App.js` – application root and CRUD state management (persists to `localStorage`)
	- `App.css` – basic styling for the UI
	- `index.js` – React entry

## Features

- Add new users (name, email)
- Edit existing users
- Delete users (with confirmation)
- Data persisted across reloads using `localStorage`

## Quick start (PowerShell)

npm install
npm start
```

Open http://localhost:3000 in your browser. The dev server runs with `react-scripts` and supports hot reload.


