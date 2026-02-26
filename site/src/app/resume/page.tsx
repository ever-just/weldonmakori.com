import type { Metadata } from "next";
import ResumePage from "@/components/ResumePage";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Weldon Makori's professional resume — work experience at Custom AI Studio, Tesla, Sleep Number, Marsh McLennan, and more.",
};

export default function Resume() {
  return <ResumePage />;
}
