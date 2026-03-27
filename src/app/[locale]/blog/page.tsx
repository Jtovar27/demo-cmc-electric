export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n";
import { prisma } from "@/lib/db";
import type { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return { title: locale === "es" ? "Blog" : "Blog" };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEs = locale === "es";

  const posts = await prisma.blogPost.findMany({
    where: { status: "published" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="bg-[#080808] pt-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="yellow" className="mb-6">{dict.blog.badge}</Badge>
            <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tight text-white leading-tight mb-6">
              {dict.blog.title}{" "}
              <span className="text-gradient">{dict.blog.titleHighlight}</span>
            </h1>
            <p className="text-[#A0A0A0] text-xl leading-relaxed font-sans">{dict.blog.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-[#606060] font-mono">
              {isEs ? "No hay articulos disponibles aun." : "No articles available yet."}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const title = isEs ? post.titleEs : post.title;
                const excerpt = isEs ? (post.excerptEs || post.excerpt) : post.excerpt;

                return (
                  <article
                    key={post.id}
                    className="bg-[#0F0F0F] border border-[#1A1A1A] hover:border-[#FFD700]/30 transition-all duration-300 group flex flex-col overflow-hidden"
                  >
                    {post.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />
                        {post.category && (
                          <div className="absolute top-3 left-3">
                            <Badge variant="yellow" size="sm">{post.category}</Badge>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col gap-4 p-5 flex-1">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs font-mono text-[#404040]">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.publishedAt, isEs ? "es-US" : "en-US")}
                          </span>
                        )}
                      </div>

                      <h2 className="text-base font-mono font-bold text-white leading-snug group-hover:text-[#FFD700] transition-colors">
                        {title}
                      </h2>

                      {excerpt && (
                        <p className="text-sm text-[#606060] leading-relaxed font-sans line-clamp-3 flex-1">
                          {excerpt}
                        </p>
                      )}

                      <Link href={`/${locale}/blog/${post.slug}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-0 text-[#FFD700]/60 hover:text-[#FFD700]"
                          iconRight={<ArrowRight className="h-3.5 w-3.5" />}
                        >
                          {dict.blog.read_more}
                        </Button>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
