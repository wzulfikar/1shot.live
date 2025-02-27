import { Loading } from './components/loading.js';
import { ErrorMessage } from './components/error.js';
import { GameCard } from './components/game-card.js';
import { useSWR } from './hooks/useSWR.js';

// Main App component
export const App = () => {
    // Fetcher function for games data
    const fetchGames = async () => {
        const response = await fetch('games.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    // Use our SWR-like hook for data fetching with caching
    const { data: games, error, isValidating } = useSWR('games', fetchGames, {
        // Refresh data every hour (3600000ms)
        refreshInterval: 3600000,
        // Always revalidate on mount to ensure fresh data
        revalidateOnMount: true
    });

    // Show loading state when no data and still loading
    if (!games && !error) return html`<${Loading} />`;
    
    // Show error state
    if (error) return html`<${ErrorMessage} />`;
    
    // Show empty state
    if (!games || games.length === 0) {
        return html`
            <div class="col-span-full text-center py-12 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p class="text-black font-bold">No games found. Check back later!</p>
            </div>
        `;
    }

    return html`
        <div class="relative">
            ${isValidating && html`
                <div class="absolute top-0 right-0 m-4 bg-yellow-300 border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div class="inline-block animate-spin rounded-none h-4 w-4 border-t-2 border-b-2 border-black"></div>
                    <span class="ml-2 text-sm font-bold">Updating...</span>
                </div>
            `}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                ${games.map(game => html`<${GameCard} key=${game.id} game=${game} />`)}
            </div>
        </div>
    `;
}; 
