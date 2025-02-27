// Game Card component
export const GameCard = ({ game }) => {
    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/400x225?text=Game+Image';
    };

    const handleAvatarError = (e) => {
        e.target.src = 'https://via.placeholder.com/32x32?text=User';
    };

    return html`
        <div class="game-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl">
            <a href=${game.url} target="_blank" class="block">
                <img 
                    src=${game.image || 'https://via.placeholder.com/400x225?text=Game+Image'} 
                    alt=${game.title} 
                    class="w-full h-48 object-cover"
                    onError=${handleImageError}
                />
                <div class="p-4">
                    <h3 class="text-lg font-semibold text-gray-800">${game.title}</h3>
                    <p class="text-gray-600 mt-1 text-sm line-clamp-2">${game.description || 'No description available'}</p>
                    
                    <div class="mt-3 flex items-center flex-wrap">
                        <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full mb-1 mr-1">${game.category || 'Game'}</span>
                        ${game.tags?.map((tag, index) => html`
                            <span key=${index} class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-1 mr-1">${tag}</span>
                        `)}
                    </div>
                    
                    ${game.author && html`
                        <div class="mt-3 flex items-center border-t pt-3 text-gray-500">
                            <a href=${game.author.profile_url} target="_blank" class="flex items-center hover:text-purple-600">
                                <img 
                                    src=${game.author.avatar || 'https://via.placeholder.com/32x32?text=User'} 
                                    alt=${game.author.name} 
                                    class="w-6 h-6 rounded-full mr-2"
                                    onError=${handleAvatarError}
                                />
                                <span class="text-sm">${game.author.name}</span>
                            </a>
                        </div>
                    `}
                </div>
            </a>
        </div>
    `;
}; 
