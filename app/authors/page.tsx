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
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-20 relative">

        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Meet Our <span className="text-purple-400">Authors</span>
          </h1>
          <p className="text-gray-400">
            Discover the people behind the blogs.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {authors.length === 0 ? (
            <p>No authors found</p>
          ) : (
            authors.map((author: any) => (
              <Link
                key={author.uid}
                href={`/authors/${author.uid}`}
                className="block bg-[#0b1220] p-6 rounded-xl hover:scale-105 transition text-center"
              >
                <img
                  src={
                    author.profile_image?.url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}`
                  }
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />

                <h3 className="text-lg font-bold mb-2">
                  {author.name}
                </h3>

                {author.bio && (
                  <div
                    className="text-sm text-gray-400 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: author.bio }}
                  />
                )}
              </Link>
            ))
          )}
        </div>

      </main>
    </div>
  );
}
