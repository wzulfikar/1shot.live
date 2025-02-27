import { initPresence } from "../lib/supabase-client.js";

export const OnlineVisitors = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    // Initialize presence and track visitors
    const initializePresence = async () => {
      try {
        await initPresence();
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
          <p>Waiting for visitors...</p>
        </div>
      </div>
    `;
  }

  return html`
    <div class="max-w-xs mx-auto">
      <div
        class="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 transition-all duration-200 mb-2 bg-yellow-400 rounded"
      >
        <ul class="list-none p-0 flex h-6 -space-x-2 items-center">
          ${visitors.map((visitor, index) => {
            const visitorId =
              visitor && visitor.user_id
                ? visitor.user_id.substring(0, 4)
                : "Unknown";

            return html`
              <li
                key=${index}
                class="flex items-center justify-center bg-white border-2 border-black rounded-full w-8 h-8 hover:-translate-y-0.5 transition-transform"
              >
                <img
                  src="https://api.dicebear.com/9.x/pixel-art/svg?seed=${visitorId}"
                  alt="User"
                  class="w-6 h-6 rounded-full"
                />
              </li>
            `;
          })}
        </ul>
      </div>
    </div>
  `;
};
