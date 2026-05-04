import Stack from "@/lib/contentstack";
import Link from "next/link";
import Navbar from "@/components/Navbar";

async function getBlogs() {
  try {
    const data = await Stack.ContentType("blog")
      .Query()
      .includeReference(["author"])
      .toJSON()
      .find();

    return data?.[0] || [];
  } catch (err) {
    console.error("BLOG FETCH ERROR:", err);
    return [];
  }
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold">
            Elevate Your Knowledge
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.length === 0 ? (
            <p>No blogs found</p>
          ) : (
            blogs.map((blog: any) => {
              const authorName = Array.isArray(blog.author)
                ? blog.author[0]?.name
                : blog.author?.name;

              return (
                <Link
                  key={blog.uid}
                  href={`/blog/${blog.url}`}
                  className="block bg-[#0b1220] rounded-xl overflow-hidden hover:scale-105 transition"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      blog.featured_image?.url ||
                      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                    }
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* CONTENT */}
                  <div className="p-5">
                    <h2 className="text-xl font-bold mb-2">
                      {blog.title}
                    </h2>

                    <p className="text-gray-400 text-sm">
                      By {authorName || "Unknown"}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>

      </main>
    </div>
  );
}