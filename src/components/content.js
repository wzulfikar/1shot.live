import { GameCard } from "./game-card.js";
import { gamesData } from "./games-data.js";
import { OnlineVisitors } from "./online-visitors.js";

export const Content = () => {
  return html`
    <main class="container mx-auto px-4 pt-8">
      <div
        class="mb-8 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded"
      >
        <h2 class="text-2xl font-bold text-black">Recently Added</h2>
        <p class="text-black font-medium">
          Explore our collection of AI-built games
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12"
      >
        ${gamesData.map(
          (game) => html`<${GameCard} key=${game.id} game=${game} />`
        )}
      </div>
      <div class="container mx-auto px-4 mb-12">
        <${OnlineVisitors} />
      </div>
    </main>
  `;
};
