import type { Metadata } from "next";
import CalendarPage from "@/components/CalendarPage";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "View Weldon Makori's upcoming events and book a meeting.",
};

export default function CalendarRoute() {
  return <CalendarPage />;
}
