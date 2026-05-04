import Stack from "@/lib/contentstack";   // ✅ use alias (safer)
import Navbar from "@/components/Navbar";
import Link from "next/link";

async function getAuthors() {
  try {
    const Query = Stack.ContentType("author").Query();
    const data = await Query.toJSON().find();

    return data?.[0] || [];
  } catch (err) {
    console.error("Author fetch error:", err);
    return [];
  }
}

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <div className="min-h-screen text-foreground">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-24 animate-fade-in-up delay-100">

        {/* Heading */}
        <div className="text-center mb-24 border-b border-border pb-16">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            Our <span className="text-accent italic font-light">Contributors</span>
          </h1>
          <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto drop-shadow-md">
            The distinguished voices behind our leading publications.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {authors.length === 0 ? (
            <p className="text-gray-400 font-light italic">No contributors found.</p>
          ) : (
            authors.map((author: any) => (
              <Link
                key={author.uid}
                href={`/authors/${author.uid}`}
                className="group block text-center glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 border border-accent/0 rounded-full scale-110 group-hover:scale-100 group-hover:border-accent transition-all duration-500"></div>
                  <img
                    src={
                      author.profile_image?.url ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=121212&color=D4AF37`
                    }
                    className="w-full h-full rounded-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 border border-border"
                  />
                </div>

                <h3 className="text-xl font-serif font-medium text-white mb-2 group-hover:text-accent transition-colors duration-300">
                  {author.name}
                </h3>

                {author.bio && (
                  <div
                    className="text-sm text-gray-300 font-light line-clamp-3 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: author.bio }}
                  />
                )}
                <div className="w-8 h-[1px] bg-border group-hover:bg-accent transition-colors duration-300 mt-6 mx-auto"></div>
              </Link>
            ))
          )}
        </div>

      </main>
    </div>
  );
}


