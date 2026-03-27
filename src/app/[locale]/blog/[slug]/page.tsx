export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { prisma } from "@/lib/db";
import type { Locale } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar } from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);
  const isEs = locale === "es";

  const post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post || post.status !== "published") notFound();

  const title = isEs ? post.titleEs : post.title;
  const content = isEs ? (post.contentEs || post.content) : post.content;

  return (
    <div className="bg-[#080808] pt-20">
      {/* Back navigation */}
      <div className="border-b border-[#1A1A1A] bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <Link
            href={`/${locale}/blog`}
            className="flex items-center gap-1.5 text-xs font-mono text-[#606060] hover:text-[#FFD700] transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            {dict.blog.view_all}
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {post.category && (
            <Badge variant="yellow" size="sm">{post.category}</Badge>
          )}
          {post.publishedAt && (
            <span className="flex items-center gap-1.5 text-xs font-mono text-[#606060]">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt, isEs ? "es-US" : "en-US")}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-tight mb-8">
          {title}
        </h1>

        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden border border-[#1A1A1A] mb-12">
            <Image
              src={post.coverImage}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert prose-yellow max-w-none font-sans text-[#A0A0A0] leading-relaxed">
          {content.split("\n\n").map((paragraph, i) => (
            <p key={i} className="mb-4">{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#1A1A1A] flex gap-4">
          <Link href={`/${locale}/blog`}>
            <Button variant="outline" size="md" icon={<ArrowLeft className="h-4 w-4" />}>
              {dict.blog.view_all}
            </Button>
          </Link>
          <Link href={`/${locale}/programas`}>
            <Button variant="primary" size="md">
              {isEs ? "Ver Programas" : "View Programs"}
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}
