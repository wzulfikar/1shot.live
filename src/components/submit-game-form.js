export const SubmitGameForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    url: "",
    xProfile: "",
    gameName: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [turnstileToken, setTurnstileToken] = useState(null);

  useEffect(() => {
    // Load Turnstile script when component mounts
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;

    // Define the callback function that Turnstile will call
    window.onTurnstileLoad = () => {
      window.turnstile.render(".cf-turnstile", {
        sitekey: PUBLIC_ENV.turnstileSiteKey,
        theme: "light",
        callback: function (token) {
          setTurnstileToken(token);
        },
      });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.onTurnstileLoad;
    };
  }, [isOpen]); // Re-run when modal opens

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!turnstileToken) {
        throw new Error(
          "Please complete the Turnstile challenge. If it's not showing, please refresh the page."
        );
      }

      // Submit to Edge Function
      const response = await fetch(
        `${PUBLIC_ENV.supabaseUrl}/functions/v1/submit-game`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            turnstileToken,
          }),
        }
      );

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to submit game");
      }

      // Reset form
      setFormData({ url: "", xProfile: "", gameName: "", description: "" });
      setTurnstileToken(null);
      // Reset the widget
      window.turnstile.reset();
      onClose();
      
      // Trigger refresh of games list
      window.dispatchEvent(new Event("refresh-games"));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return html`
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 w-full max-w-md rounded relative"
      >
        <button
          onClick=${onClose}
          class="absolute top-2 right-2 text-black hover:text-gray-700"
          aria-label="Close"
        >
          <i class="fas fa-times text-xl"></i>
        </button>

        <h2 class="text-2xl font-bold mb-4 text-black">Submit Your Game</h2>

        ${error &&
        html`
          <div class="mb-4 p-3 bg-red-100 border-2 border-red-500 rounded">
            <p class="text-red-700">${error}</p>
          </div>
        `}

        <form onSubmit=${handleSubmit}>
          <div class="mb-4">
            <label class="block text-black font-bold mb-2" for="gameName">
              Game Name
            </label>
            <input
              type="text"
              id="gameName"
              name="gameName"
              placeholder="My Awesome Game"
              value=${formData.gameName}
              onChange=${handleChange}
              class="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-black font-bold mb-2" for="url">
              Game URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value=${formData.url}
              onChange=${handleChange}
              class="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="https://mygame.com"
              required
            />
          </div>

          <div class="mb-4">
            <label class="block text-black font-bold mb-2" for="description">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value=${formData.description}
              onChange=${handleChange}
              class="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="A short description of the game"
            />
          </div>

          <div class="mb-6">
            <label class="block text-black font-bold mb-2" for="xProfile">
              X Username
            </label>
            <input
              type="text"
              id="xProfile"
              name="xProfile"
              value=${formData.xProfile}
              onChange=${handleChange}
              class="w-full px-3 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="jack"
              required
            />
            <div class="text-sm text-gray-500 mt-2">
              We need your X username so we know the creator of the game. If you
              don't use X and want to add your game, please open a PR in Github.
            </div>
          </div>

          <div class="mb-6">
            <div
              class="cf-turnstile"
              data-sitekey="${PUBLIC_ENV.turnstileSiteKey}"
              data-theme="light"
            ></div>
          </div>

          <div class="flex justify-end">
            <button
              type="button"
              onClick=${onClose}
              class="mr-2 px-4 py-2 bg-gray-200 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-300 font-bold"
              disabled=${loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="neo-button px-4 py-2 bg-green-400 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-green-500 font-bold disabled:opacity-50"
              disabled=${loading}
            >
              ${loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
};
