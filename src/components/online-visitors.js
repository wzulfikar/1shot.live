import { getCountryFlagEmoji } from "../lib/country-flag.js";
import { getSessionId } from "../lib/session-id.js";
import { initPresence } from "../lib/supabase-client.js";

export const OnlineVisitors = () => {
  const sessionId = useRef(getSessionId());
  const [visitors, setVisitors] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
        const countryFlag = getCountryFlagEmoji();
        await initPresence(sessionId.current, countryFlag);
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
      <div
        class="inline-flex h-[45px] items-center px-4 py-2 bg-yellow-400 border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
      >
        <p class="text-sm">Waiting for visitors...</p>
      </div>
    `;
  }

  return html`
    <div class="max-w-xs mx-auto cursor-pointer">
      <div
        class="neo-button flex items-center justify-between gap-3 h-[45px] px-3 py-2 bg-yellow-400 border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold"
        onClick=${() => setShowModal(true)}
      >
        <div class="text-center text-sm">
          ${visitors.length} online visitors
        </div>
        <ul class="list-none p-0 flex h-6 -space-x-2 items-center">
          ${sortedVisitors.slice(0, 5).map((visitor, index) => {
            const visitorId = visitor?.session_id || "Unknown";
            const countryFlag = visitor?.country_flag;
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
                  ${visitorId} ${isCurrentUser ? "(You)" : ""} ${countryFlag}
                </div>
              </li>
            `;
          })}
        </ul>
      </div>
    </div>

    ${showModal
      ? html`<${OnlineVisitorsModal}
          visitors=${sortedVisitors}
          show=${showModal}
          setShow=${setShowModal}
          currentSessionId=${sessionId.current}
        />`
      : null}
  `;
};

function OnlineVisitorsModal({ visitors, show, setShow, currentSessionId }) {
  const uniqueCountries = new Set(visitors.map((v) => v.country_flag)).size;

  return html`<div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick=${(e) => {
      if (e.target === e.currentTarget) setShow(false);
    }}
  >
    <div
      class="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md rounded relative mx-4"
    >
      <button
        onClick=${() => setShow(false)}
        class="absolute top-2 right-2 text-black hover:text-gray-700"
        aria-label="Close"
      >
        <i class="fas fa-times text-xl"></i>
      </button>

      <h2 class="text-2xl font-bold mb-4 text-black">
        ${visitors.length} online visitors from ${uniqueCountries}
        ${uniqueCountries === 1 ? "country" : "countries"}
      </h2>

      <div class="max-h-[60vh] overflow-y-auto">
        <ul class="space-y-4">
          ${visitors.map((visitor, index) => {
            const visitorId = visitor?.session_id || "Unknown";
            const countryFlag = visitor?.country_flag;
            const isCurrentUser = visitorId === currentSessionId;

            return html`
              <li
                key=${index}
                class="flex items-center gap-4 p-3 bg-yellow-100 border-2 border-black rounded"
              >
                <div class="flex-shrink-0">
                  <img
                    src="https://api.dicebear.com/9.x/pixel-art/svg?seed=${visitorId}"
                    alt="User"
                    class="w-12 h-12 rounded-full border-2 ${isCurrentUser
                      ? "border-green-700"
                      : "border-black"}"
                  />
                </div>
                <div class="flex-grow">
                  <div class="font-bold text-black">
                    ${visitorId} ${isCurrentUser ? "(You)" : ""}
                  </div>
                  <div class="text-sm text-gray-600">${countryFlag}</div>
                </div>
              </li>
            `;
          })}
        </ul>
      </div>
    </div>
  </div> `;
}
