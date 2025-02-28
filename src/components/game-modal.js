export const GameModal = ({ game, onClose }) => {
  return html`
    <div
      class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      onClick=${(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        class="max-w-lg bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-2xl rounded relative mx-4"
      >
        <button
          onClick=${onClose}
          class="absolute top-2 right-2 text-black hover:text-gray-700"
          aria-label="Close"
        >
          <i class="fas fa-times text-xl"></i>
        </button>

        <div class="space-y-4">
          <h2 class="text-2xl font-bold text-black">${game.title}</h2>

          <div
            class="aspect-video w-full overflow-hidden border-6 border-black rounded"
          >
            <img
              src=${game.images?.[0]}
              alt=${game.title}
              class="w-full h-full object-cover"
            />
          </div>

          <p class="text-black">${game.description}</p>

          <div class="mt-3 flex items-center flex-wrap min-h-[60px]">
            ${game.tags?.map(
              (tag, index) => html`
                <span
                  key=${index}
                  class="bg-pink-300 text-black text-xs px-2 py-1 border border-black mb-1 mr-1 font-bold mb-auto"
                  >${tag}</span
                >
              `
            )}
          </div>
          
          <div
            class="flex items-center justify-between pt-4 border-t-2 border-black"
          >
            <a
              href=${game.author.profile_url}
              target="_blank"
              class="flex items-center hover:text-blue-600"
            >
              <img
                src=${game.author.avatar}
                alt=${game.author.name}
                class="w-6 h-6 rounded border border-black mr-2"
              />
              <span class="text-sm font-bold">${game.author.name}</span>
            </a>

            <a
              href=${game.url}
              target="_blank"
              class="neo-button px-4 py-2 bg-green-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-500 font-bold"
            >
              Play Game
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
};
