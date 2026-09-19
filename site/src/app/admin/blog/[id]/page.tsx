import AdminBlogEditPage from "@/components/admin/AdminBlogEditPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: "_" }];
}

export default function AdminBlogEdit() {
  return <AdminBlogEditPage />;
}
