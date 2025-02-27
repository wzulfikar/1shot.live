export const sessionId = Math.random().toString(36).substring(2, 15);

// Initialize presence channel
export const initPresence = async (displayName = "Visitor") => {
  const { supabaseUrl, supabaseKey } = window.PUBLIC_ENV;
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // For this implementation, we'll create a public channel that doesn't require authentication
  const channel = supabase.channel("online-visitors", {
    config: {
      presence: {
        key: sessionId,
      },
    },
  });

  // Subscribe to presence changes
  channel
    .on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();
      // Convert the state to an array of visitor objects
      const presenceState = Object.values(state).flatMap((presence) =>
        presence.map((p) => p)
      );

      // Dispatch an event when presence state changes
      window.dispatchEvent(
        new CustomEvent("presence-update", {
          detail: { visitors: presenceState },
        })
      );
    })
    .on("presence", { event: "join" }, ({ key, newPresences }) => {
      console.log("New visitor joined:", newPresences);
    })
    .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
      console.log("Visitor left:", leftPresences);
    });

  // Subscribe to the channel and enter the room
  await channel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      // Enter the channel with some user metadata
      await channel.track({
        user_id: sessionId,
        displayName: displayName,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
      });
    }
  });

  return channel;
};
