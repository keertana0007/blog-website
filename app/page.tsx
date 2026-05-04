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
    <div className="min-h-screen text-foreground">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-24 animate-fade-in-up delay-100">

        <div className="text-center mb-28 border-b border-border pb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Elevate Your <span className="text-accent italic font-light">Knowledge</span>
          </h1>
          <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto drop-shadow-md">
            Insights, analysis, and thought leadership from our esteemed panel of experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogs.length === 0 ? (
            <p className="text-gray-400 font-light italic">No publications available at this time.</p>
          ) : (
            blogs.map((blog: any) => {
              const authorName = Array.isArray(blog.author)
                ? blog.author[0]?.name
                : blog.author?.name;

              return (
                <Link
                  key={blog.uid}
                  href={`/blog/${blog.url}`}
                  className="group block glass-panel p-4 rounded-2xl hover:scale-[1.02] transition-transform duration-500"
                >
                  <div className="relative overflow-hidden rounded-xl mb-6 border border-border">
                    <img
                      src={
                        blog.featured_image?.url ||
                        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                      }
                      alt={blog.title}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                    />
                  </div>

                  <div className="px-2 pb-2">
                    <p className="text-accent text-xs tracking-[0.2em] uppercase font-bold mb-3 drop-shadow-md">
                      {authorName || "Editorial Team"}
                    </p>
                    <h2 className="text-2xl font-serif font-medium text-white mb-3 group-hover:text-accent transition-colors duration-300">
                      {blog.title}
                    </h2>
                    <div className="w-12 h-[1px] bg-border group-hover:bg-accent transition-colors duration-300 mt-4"></div>
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
