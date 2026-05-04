import Stack from "@/lib/contentstack";
import Navbar from "@/components/Navbar";

export default async function BlogPage({ params }: any) {
  try {
    const { url } = await params;
    const decodedUrl = decodeURIComponent(url);

    const response = await Stack.ContentType("blog")
      .Query()
      .where("url", decodedUrl)
      .toJSON()
      .find();

    const blog = response?.[0]?.[0];

    if (!blog) {
      return (
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <h1 className="text-center mt-20 text-xl font-serif text-gray-400">Publication not found.</h1>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-20 animate-fade-in-up delay-100">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
              {blog.title}
            </h1>
            <div className="w-16 h-[1px] bg-accent mx-auto mb-8"></div>
          </div>

          <img
            src={
              blog.featured_image?.url ||
              "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
            }
            className="w-full h-[30rem] object-cover rounded-sm mb-16 filter grayscale hover:grayscale-0 transition-all duration-1000"
          />

          <article
            className="prose prose-invert prose-dark max-w-2xl mx-auto text-lg leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-accent first-letter:float-left first-letter:mr-3 first-letter:mt-1"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>
    );
  } catch (err) {
    console.error("BLOG ERROR:", err);
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <h1 className="text-center mt-20 text-xl font-serif text-gray-400">Error loading publication.</h1>
      </div>
    );
  }
}