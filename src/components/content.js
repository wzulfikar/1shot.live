import { GameCard } from "./game-card.js";
import { supabaseClient } from "../lib/supabase-client.js";

export const Content = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const supabase = supabaseClient();
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setGames(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return html`
    <main class="container max-w-6xl mx-auto px-4 pt-8">
      <div
        class="mb-8 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded"
      >
        <h2 class="text-2xl font-bold text-black">Recently Added</h2>
        <p class="text-black font-medium">
          Explore our collection of AI-built games
        </p>
      </div>

      ${loading &&
      html`
        <div class="flex justify-center items-center min-h-[200px]">
          <div
            class="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"
          ></div>
        </div>
      `}
      ${error &&
      html`
        <div class="bg-red-100 border-2 border-red-500 p-4 rounded mb-8">
          <p class="text-red-700">${error}</p>
        </div>
      `}
      ${!loading &&
      !error &&
      html`
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          ${games.map(
            (game) => html`<${GameCard} key=${game.id} game=${game} />`
          )}
        </div>
      `}
    </main>
  `;
};
