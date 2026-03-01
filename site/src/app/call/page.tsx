import type { Metadata } from "next";
import CallPage from "@/components/CallPage";

export const metadata: Metadata = {
  title: "Video Call",
  description:
    "Start or join a video call with Weldon Makori. Real-time video conferencing right from the browser.",
};

export default function Call() {
  return <CallPage />;
}
