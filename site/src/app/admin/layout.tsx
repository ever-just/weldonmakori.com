import AdminLayout from "@/components/admin/AdminLayout";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminRootLayout({ children }: { children: React.ReactNode }) {
  await headers();
  return <AdminLayout>{children}</AdminLayout>;
}
