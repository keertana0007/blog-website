import Stack from "@/lib/contentstack"; // ✅ FIXED
import Navbar from "@/components/Navbar";
import Link from "next/link";

async function getAuthorData(uid: string) {
  // 🔥 Fetch author
  const authorRes = await Stack.ContentType("author")
    .Query()
    .where("uid", uid)
    .toJSON()
    .find();

  const author = authorRes?.[0]?.[0];

  // 🔥 Fetch blogs
  const blogRes = await Stack.ContentType("blog")
    .Query()
    .includeReference(["author"])
    .toJSON()
    .find();

  const blogs = blogRes?.[0] || [];

  // 🔥 Filter blogs for this author
  const authorBlogs = blogs.filter((b: any) => {
    if (Array.isArray(b.author)) {
      return b.author.some((a: any) => a.uid === uid);
    }
    return b.author?.uid === uid;
  });

  return { author, authorBlogs };
}

export default async function AuthorDetailPage({ params }: any) {
  // ✅ FIX: unwrap params (Next.js 16)
  const { uid } = await params;

  const { author, authorBlogs } = await getAuthorData(uid);

  if (!author) {
    return (
      <div className="min-h-screen bg-[#020617] text-white">
        <Navbar />
        <div className="p-20 text-center">
          <p className="text-red-400 text-xl">Author not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">

        {/* AUTHOR HEADER */}
        <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-16">
          <img
            src={
              author.profile_image?.url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}`
            }
            className="w-40 h-40 rounded-full object-cover"
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">{author.name}</h1>

            {author.bio && (
              <div
                className="text-gray-400"
                dangerouslySetInnerHTML={{ __html: author.bio }}
              />
            )}
          </div>
        </div>

        {/* BLOGS */}
        <h2 className="text-2xl font-bold mb-6">
          Articles by {author.name}
        </h2>

        {authorBlogs.length === 0 ? (
          <p className="text-gray-500">No blogs found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {authorBlogs.map((blog: any) => (
              <Link
                key={blog.uid}
                href={`/blog/${blog.url}`}
                className="bg-[#0b1220] rounded-xl overflow-hidden hover:scale-105 transition"
              >
                <img
                  src={
                    blog.featured_image?.url ||
                    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                  }
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg">{blog.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}