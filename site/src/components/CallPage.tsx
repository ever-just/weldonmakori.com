"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Video, User, Hash, ArrowRight, PhoneOff } from "lucide-react";

declare global {
  interface Window {
    JitsiMeetExternalAPI: new (
      domain: string,
      options: Record<string, unknown>
    ) => JitsiMeetInstance;
  }
}

interface JitsiMeetInstance {
  dispose: () => void;
  addEventListener: (event: string, handler: () => void) => void;
}

function generateRoomName(): string {
  const adjectives = ["swift", "bright", "calm", "bold", "keen", "warm"];
  const nouns = ["river", "summit", "forest", "meadow", "horizon", "breeze"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${adj}-${noun}-${num}`;
}

function loadJitsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load video call API"));
    document.head.appendChild(script);
  });
}

export default function CallPage() {
  const [roomName, setRoomName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [inCall, setInCall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<JitsiMeetInstance | null>(null);

  const startCall = useCallback(async () => {
    const room = roomName.trim() || generateRoomName();
    setError("");
    setLoading(true);

    try {
      await loadJitsiScript();
    } catch {
      setError("Could not load the video call service. Please try again.");
      setLoading(false);
      return;
    }

    if (!jitsiContainerRef.current) {
      setLoading(false);
      return;
    }

    setInCall(true);
    setLoading(false);

    const api = new window.JitsiMeetExternalAPI("meet.jit.si", {
      roomName: room,
      parentNode: jitsiContainerRef.current,
      width: "100%",
      height: "100%",
      userInfo: {
        displayName: displayName.trim() || "Guest",
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        hideConferenceSubject: true,
        hideConferenceTimer: false,
        subject: " ",
        defaultLanguage: "en",
        disableThirdPartyRequests: true,
        brandingRoomAlias: room,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        SHOW_CHROME_EXTENSION_BANNER: false,
        SHOW_POWERED_BY: false,
        SHOW_PROMOTIONAL_CLOSE_PAGE: false,
        HIDE_INVITE_MORE_HEADER: true,
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
        APP_NAME: "Video Call",
        NATIVE_APP_NAME: "Video Call",
        PROVIDER_NAME: "Weldon Makori",
        DEFAULT_BACKGROUND: "#050505",
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "desktop",
          "chat",
          "raisehand",
          "tileview",
          "hangup",
          "fullscreen",
          "settings",
        ],
      },
    });

    api.addEventListener("readyToClose", () => {
      api.dispose();
      jitsiApiRef.current = null;
      setInCall(false);
    });

    jitsiApiRef.current = api;
  }, [roomName, displayName]);

  const endCall = useCallback(() => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.dispose();
      jitsiApiRef.current = null;
    }
    setInCall(false);
  }, []);

  useEffect(() => {
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
    };
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-4rem)]">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <AnimatePresence mode="wait">
          {!inCall ? (
            <motion.div
              key="pre-call"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs tracking-widest uppercase text-white/50 mb-6"
                >
                  <Video size={12} strokeWidth={1.5} />
                  Video Call
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-light tracking-tight mb-4"
                >
                  <span className="gradient-text">Start a Call</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/40 text-sm md:text-base max-w-md mx-auto"
                >
                  Enter a room name to create or join a video call. Share the
                  room name with others so they can join you.
                </motion.p>
              </div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card p-8 md:p-10 max-w-lg mx-auto"
              >
                <div className="space-y-5">
                  {/* Room Name */}
                  <div>
                    <label className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/40 mb-2">
                      <Hash size={12} strokeWidth={1.5} />
                      Room Name
                    </label>
                    <input
                      type="text"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      placeholder="Leave blank for a random room"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>

                  {/* Display Name */}
                  <div>
                    <label className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/40 mb-2">
                      <User size={12} strokeWidth={1.5} />
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Guest"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400/80 text-xs"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Join Button */}
                  <button
                    onClick={startCall}
                    disabled={loading}
                    className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 border border-white/10 hover:border-white/20 rounded-xl px-6 py-3.5 text-sm font-medium tracking-wide text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Video size={16} strokeWidth={1.5} />
                        Join Call
                        <ArrowRight
                          size={14}
                          strokeWidth={1.5}
                          className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 text-center space-y-2"
              >
                <p className="text-white/20 text-xs tracking-wide">
                  Tip: Share the room name with others to invite them to the
                  same call.
                </p>
                <p className="text-white/20 text-xs tracking-wide">
                  No account required. Calls are peer-to-peer and encrypted.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="in-call"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col"
            >
              {/* Call Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/40">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  In Call
                </div>
                <button
                  onClick={endCall}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs tracking-wide hover:bg-red-500/20 transition-colors"
                >
                  <PhoneOff size={12} strokeWidth={1.5} />
                  Leave
                </button>
              </div>

              {/* Jitsi Container */}
              <div
                ref={jitsiContainerRef}
                className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black"
                style={{ height: "calc(100vh - 12rem)" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden container for Jitsi when not yet in call */}
        {!inCall && (
          <div ref={jitsiContainerRef} className="hidden" />
        )}
      </div>
    </section>
  );
}
