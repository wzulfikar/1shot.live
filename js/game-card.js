export const GameCard = ({ game }) => {
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/400x225?text=Game+Image';
    };

    const handleAvatarError = (e) => {
        e.target.src = 'https://via.placeholder.com/32x32?text=User';
    };

    // Ensure avatar URL has proper protocol
    const getAvatarUrl = (url) => {
        if (!url) return 'https://via.placeholder.com/32x32?text=User';
        
        // Check if URL already has a protocol
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        
        // Add https:// protocol if missing
        return `https://${url}`;
    };

    return html`
        <div class="game-card bg-white border-2 border-black rounded-none overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 rounded">
            <a href=${game.url} target="_blank" class="block">
                <img 
                    src=${game.image || 'https://via.placeholder.com/400x225?text=Game+Image'} 
                    alt=${game.title} 
                    class="w-full h-48 object-cover border-b-2 border-black"
                    onError=${handleImageError}
                />
                <div class="p-4">
                    <h3 class="text-lg font-bold text-black">${game.title}</h3>
                    <p class="text-black mt-1 text-sm line-clamp-2">${game.description || 'No description available'}</p>
                    
                    <div class="mt-3 flex items-center flex-wrap">
                        <span class="bg-yellow-300 text-black text-xs px-2 py-1 border border-black mb-1 mr-1 font-bold">${game.category || 'Game'}</span>
                        ${game.tags?.map((tag, index) => html`
                            <span key=${index} class="bg-pink-300 text-black text-xs px-2 py-1 border border-black mb-1 mr-1 font-bold">${tag}</span>
                        `)}
                    </div>
                    
                    ${game.author && html`
                        <div class="mt-3 flex items-center border-t-2 border-black pt-3">
                            <a href=${game.author.profile_url.startsWith('http') ? game.author.profile_url : `https://${game.author.profile_url}`} target="_blank" class="flex items-center hover:text-blue-600">
                                <img 
                                    src=${getAvatarUrl(game.author.avatar)} 
                                    alt=${game.author.name} 
                                    class="w-6 h-6 rounded-none border border-black mr-2"
                                    onError=${handleAvatarError}
                                />
                                <span class="text-sm font-bold">${game.author.name}</span>
                            </a>
                        </div>
                    `}
                </div>
            </a>
        </div>
    `;
}; 
