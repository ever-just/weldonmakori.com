import type { Metadata } from "next";
import EducationPage from "@/components/EducationPage";

export const metadata: Metadata = {
  title: "Education",
  description:
    "Weldon Makori's academic journey — University of St. Thomas (BS Business Administration, Law & Compliance) and Normandale Community College transfer credits.",
};

export default function Education() {
  return <EducationPage />;
}
