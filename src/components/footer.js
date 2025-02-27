export const Footer = () => {
  return html`
    <footer class="bg-green-400 text-black py-8 border-t-4 border-black">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h2 class="text-xl font-bold">1shot.live</h2>
            <p class="text-black mt-1 font-medium">
              A directory of AI-built games
            </p>
          </div>
          <div class="flex space-x-4">
            <a
              href="https://github.com/wzulfikar/1shot.live"
              target="_blank"
              class="text-black hover:text-blue-800 transition-colors"
            >
              <i class="fab fa-github text-xl"></i>
            </a>
            <a
              href="https://x.com/wzulfikar"
              target="_blank"
              class="text-black hover:text-blue-800 transition-colors"
            >
              <i class="fab fa-twitter text-xl"></i>
            </a>
          </div>
        </div>
        <div
          class="mt-6 text-center text-black font-medium border-t-2 border-black pt-4"
        >
          ${new Date().getFullYear()} · 1shot.live · All rights reserved
        </div>
      </div>
    </footer>
  `;
};
