import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Weldon Makori. Send a message, ask a question, or discuss a project idea.",
};

export default function Contact() {
  return <ContactPage />;
}
