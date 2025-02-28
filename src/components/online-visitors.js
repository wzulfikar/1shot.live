import { getSessionId } from "../lib/session-id.js";
import { initPresence } from "../lib/supabase-client.js";

export const OnlineVisitors = () => {
  const sessionId = useRef(getSessionId());
  const [visitors, setVisitors] = useState([]);

  const sortedVisitors = [...visitors].sort((a, b) => {
    // Always put current user first
    if (a.session_id === sessionId.current) return -1;
    if (b.session_id === sessionId.current) return 1;

    // Then sort by timestamp (newest first)
    return (b.timestamp || 0) - (a.timestamp || 0);
  });

  useEffect(() => {
    // Initialize presence and track visitors
    const initializePresence = async () => {
      try {
        await initPresence(sessionId.current);
      } catch (error) {
        console.error("Error initializing presence:", error);
      }
    };

    initializePresence();

    // Listen for presence updates
    const handlePresenceUpdate = (event) => {
      setVisitors(event.detail.visitors || []);
    };

    window.addEventListener("presence-update", handlePresenceUpdate);

    // Cleanup
    return () => {
      window.removeEventListener("presence-update", handlePresenceUpdate);
    };
  }, []);

  // If no visitors, show a placeholder
  if (!visitors.length) {
    return html`
      <div class="max-w-xs mx-auto">
        <div
          class="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 transition-all duration-200 mb-6 bg-yellow-400 rounded"
        >
          <p class="text-sm">Waiting for visitors...</p>
        </div>
      </div>
    `;
  }

  return html`
    <div class="max-w-xs mx-auto">
      <div
        class="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 transition-all duration-200 mb-2 bg-yellow-400 rounded flex items-center justify-between gap-2"
      >
        <div class="text-center text-sm">
          ${visitors.length} online visitors
        </div>
        <ul class="list-none p-0 flex h-6 -space-x-2 items-center">
          ${sortedVisitors.slice(0, 5).map((visitor, index) => {
            const visitorId = visitor?.session_id || "Unknown";
            const isCurrentUser = visitorId === sessionId.current;
            const className = isCurrentUser ? "border-2 border-green-700" : "";

            return html`
              <li
                key=${index}
                class="group relative flex items-center justify-center bg-white border-2 border-black rounded-full w-8 h-8 hover:-translate-y-0.5 hover:z-10 transition-transform ${className}"
              >
                <img
                  src="https://api.dicebear.com/9.x/pixel-art/svg?seed=${visitorId}"
                  alt="User"
                  class="w-6 h-6 rounded-full"
                />
                <div
                  class="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                >
                  ${visitorId} ${isCurrentUser ? "(You)" : ""}
                </div>
              </li>
            `;
          })}
        </ul>
      </div>
    </div>
  `;
};
