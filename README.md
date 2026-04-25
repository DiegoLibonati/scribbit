# Scribbit

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

## Description

**Scribbit** is a lightweight, browser-based note-taking application built with vanilla TypeScript. It runs entirely in the browser with no backend required — all notes are persisted in the browser's localStorage, meaning your data stays on your device and survives page refreshes without any server or account needed.

The interface centers around a single page where all your notes live. Each note is displayed as a card with an editable text area. You can create as many notes as you want, and each one is independently manageable.

**Core features:**

- **Add notes:** Click the add button in the header to instantly create a new note with a default placeholder text. The note is saved to localStorage immediately.
- **Edit notes:** Each note has an edit button that unlocks its text area, letting you freely modify the content. A "finish editing" button confirms the change and saves the updated text back to localStorage.
- **Delete notes:** Each note has a delete button that removes it from both the screen and localStorage permanently.
- **Feedback alerts:** Every action (create, edit, delete) triggers a brief alert message in the header, giving the user clear visual confirmation that their action was registered.

The application is built as a pure TypeScript SPA with no framework. Components are plain functions that return DOM elements, state is driven entirely by localStorage, and the UI updates synchronously after every operation. The codebase follows strict TypeScript configuration and is covered by a Jest + Testing Library test suite.

## Technologies used

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

#### Dependencies

```
"uuid": "^14.0.0"
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/uuid": "^11.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.14.0"
"vite": "^7.1.6"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/scribbit`](https://www.diegolibonati.com.ar/#/project/scribbit)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
