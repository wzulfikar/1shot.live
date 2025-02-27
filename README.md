# 1shot.live

A directory website showcasing games built with AI. This simple, single-page application displays a collection of AI-built games that users can explore and visit.

## Features

- Clean, responsive design using Tailwind CSS
- Games are loaded from a JSON file for easy updates via GitHub PRs
- Mobile-friendly layout
- Displays game images, descriptions, categories, and tags
- Direct links to the actual game websites

## How to Use

1. Clone this repository
2. Open `index.html` in your browser
3. Explore the list of AI-built games
4. Click on any game card to visit the actual game website

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

- Built with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/) 
