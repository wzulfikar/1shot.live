# 1shot.live

A directory website showcasing games built with AI. This simple, modular application displays a collection of AI-built games that users can explore and visit.

## Features

- Clean, responsive design using Tailwind CSS
- Games are loaded from a JSON file for easy updates via GitHub PRs
- Mobile-friendly layout
- Displays game images, descriptions, categories, and tags
- Direct links to the actual game websites
- Modular component architecture using Preact
- Live reload development server

## How to Use

### Quick Start

1. Clone this repository
2. Open `index.html` in your browser
3. Explore the list of AI-built games
4. Click on any game card to visit the actual game website

### Development with Live Reload

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open your browser at `http://localhost:3000`
4. The page will automatically reload when you make changes to any HTML, JS, CSS, or JSON file

## Project Structure

```
├── index.html          # Main HTML file
├── games.json          # Game data in JSON format
├── server.js           # Development server with live reload
├── js/
│   ├── main.js         # Main JavaScript entry point
│   ├── App.js          # Main App component
│   └── components/     # Reusable components
│       ├── Loading.js
│       ├── Error.js
│       └── GameCard.js
└── README.md           # This file
```

## How to Add a New Game

To add a new game to the directory, simply update the `games.json` file with a new entry following this format:

```json
{
  "id": "unique_id",
  "title": "Game Title",
  "description": "A brief description of the game.",
  "url": "https://link-to-the-game.com",
  "image": "https://link-to-game-image.com/image.jpg",
  "category": "Game Category",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "createdAt": "YYYY-MM-DD"
}
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch for your feature
3. Add your game to the `games.json` file
4. Submit a pull request

## License

MIT License

## Credits

- Built with [Preact](https://preactjs.com/) and [HTM](https://github.com/developit/htm)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/) 
