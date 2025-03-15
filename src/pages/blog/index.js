import BlogDetails from "@/components/BlogDetails";
import Blogs from "@/components/Blogs";
import BlogLayout from "@/components/layout/BlogLayout";


export default function BlogPage() {
  return (
    <BlogLayout>
      <h1 className="text-2xl font-bold my-20 text-center">Home/Our Blogs</h1>
      <Blogs />
    <BlogDetails></BlogDetails>
    </BlogLayout>
  );
}