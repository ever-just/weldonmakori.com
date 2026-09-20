import type { Metadata } from "next";
import PhotosPage from "@/components/PhotosPage";

export const metadata: Metadata = {
  alternates: { canonical: "/photos" },
  title: "Media",
  description:
    "Browse Weldon Makori's media gallery — photos, videos & more.",
};

export default function Photos() {
  return <PhotosPage />;
}
