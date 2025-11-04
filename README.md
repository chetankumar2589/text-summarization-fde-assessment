# Text Summarizer Frontend

A React application scaffold for text summarization.

Requirements implemented:
- React Class Components only
- No external UI libraries
- Custom, modern, responsive CSS
- Initial structure with `TextAnalyzer` and `ResultDisplay` components

## Project Structure

```
text-summarizer-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TextAnalyzer.js
│   │   ├── TextAnalyzer.css
│   │   ├── ResultDisplay.js
│   │   └── ResultDisplay.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Getting Started

1. Install dependencies (already installed by CRA)
2. Start the dev server:

```
npm start
```

Open `http://localhost:3000` in your browser.

## Next Steps

- Wire up `TextAnalyzer` to call your summarization backend using the fetch API.
- Display results in `ResultDisplay` and handle loading/error states.

## Scripts

- `npm start` — Run dev server
- `npm run build` — Production build
- `npm test` — Test runner
