import { Loading } from './components/loading.js';
import { ErrorMessage } from './components/error.js';
import { GameCard } from './components/game-card.js';

// Main App component
export const App = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('games.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setGames(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching games:', error);
                setLoading(false);
                setError(true);
            });
    }, []);

    if (loading) return html`<${Loading} />`;
    if (error) return html`<${ErrorMessage} />`;
    if (games.length === 0) {
        return html`
            <div class="col-span-full text-center py-12">
                <p class="text-gray-600">No games found. Check back later!</p>
            </div>
        `;
    }

    return html`
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            ${games.map(game => html`<${GameCard} key=${game.id} game=${game} />`)}
        </div>
    `;
}; 
