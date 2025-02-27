import { GameCard } from "./game-card.js";
import { gamesData } from "./games-data.js";

// Main App component
export const App = () => {
  return html`
    <div class="relative">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        ${gamesData.map(
          (game) => html`<${GameCard} key=${game.id} game=${game} />`
        )}
      </div>
    </div>
  `;
};
