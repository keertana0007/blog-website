import Stack from "@/lib/contentstack";

export default async function BlogPage({ params }: any) {
  try {
    // ✅ FIX: unwrap params properly
    const { url } = await params;

    const decodedUrl = decodeURIComponent(url);

    const response = await Stack.ContentType("blog")
      .Query()
      .where("url", decodedUrl)
      .toJSON()
      .find();

    const blog = response?.[0]?.[0];

    console.log("URL PARAM:", decodedUrl);
    console.log("FETCHED BLOG:", blog);

    if (!blog) {
      return <h1 className="text-white p-10">Blog not found</h1>;
    }

    return (
      <div className="min-h-screen bg-[#020617] text-white px-6 py-16">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl font-bold mb-4">
            {blog.title}
          </h1>

          <img
            src={
              blog.featured_image?.url ||
              "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
            }
            className="w-full h-64 object-cover rounded-xl mb-10"
          />

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

        </div>
      </div>
    );
  } catch (err) {
    console.error("BLOG ERROR:", err);
    return <h1 className="text-white p-10">Error loading blog</h1>;
  }
}