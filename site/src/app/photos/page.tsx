import type { Metadata } from "next";
import PhotosPage from "@/components/PhotosPage";

export const metadata: Metadata = {
  title: "Photos",
  description:
    "Browse Weldon Makori's photo gallery — moments captured along the way.",
};

export default function Photos() {
  return <PhotosPage />;
}
