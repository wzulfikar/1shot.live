// Header component
export const Header = () => {
  return html`
    <header class="bg-blue-400 text-black border-b-4 border-black">
      <div class="container max-w-6xl mx-auto px-4 py-6 md:py-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold">1shot.live</h1>
            <p class="mt-2 text-black font-medium">
              Discover games built with AI
            </p>
          </div>
          <div class="mt-4 md:mt-0 flex space-x-3">
            <!-- <button
              id="submit-game-btn"
              class="neo-button inline-flex items-center px-4 py-2 bg-purple-400 border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-purple-500 font-bold"
            >
              <i class="fas fa-plus mr-2"></i> Submit Game
            </button> -->
            <a
              href="https://github.com/wzulfikar/1shot.live"
              target="_blank"
              class="neo-button inline-flex items-center px-4 py-2 bg-pink-400 border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-pink-500 font-bold"
            >
              <i class="fab fa-github mr-2"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </header>
  `;
}; 
