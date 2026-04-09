import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { api } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await api.getBlogPost(slug).catch(() => null);

  if (!post) {
    return { title: "404 - Tapılmadı | StarSoft" };
  }

  return {
    title: `${post.title} | StarSoft`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://starsoft.az/blog/${post.slug}`,
      siteName: "StarSoft",
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await api.getBlogPost(slug).catch(() => null);

  if (!post) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-[64px] font-extrabold text-[var(--color-gold)]/30 leading-none">
          404
        </h1>
        <p className="text-slate text-[16px]">Yazı tapılmadı.</p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] font-semibold text-[15px] transition-colors"
        >
          <ArrowLeft size={15} strokeWidth={2.25} />
          Bloga qayıt
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="max-w-3xl mx-auto px-4">
        <AnimatedSection>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] font-semibold text-[14px] mb-8 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2.25} />
            Bloga qayıt
          </Link>

          {post.tags && (
            <div className="flex flex-wrap gap-1.5 mb-5">
              {post.tags.split(",").map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-mist text-slate text-[11px] font-medium"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-[family-name:var(--font-display)] text-[36px] md:text-[48px] font-extrabold text-ink leading-[1.1] tracking-[-0.025em] mb-5">
            {post.title}
          </h1>

          {post.coverImage && (
            <div className="rounded-xl overflow-hidden mb-8">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-auto max-h-[420px] object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-3 text-mist-slate text-[13px] mb-8 pb-8 border-b border-[var(--color-hairline)]">
            <span className="font-medium">{post.author}</span>
            <span>·</span>
            <span>{post.viewCount} baxış</span>
            {post.publishedAt && (
              <>
                <span>·</span>
                <span>{new Date(post.publishedAt).toLocaleDateString("az")}</span>
              </>
            )}
          </div>

          {post.summary && (
            <p className="text-slate text-[19px] leading-relaxed mb-8 italic">
              {post.summary}
            </p>
          )}

          <div
            className="prose prose-lg max-w-none text-ink leading-[1.8]
              prose-headings:font-[family-name:var(--font-display)] prose-headings:text-ink prose-headings:tracking-[-0.02em]
              prose-h2:text-[26px] prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-[21px] prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
              prose-p:mb-5 prose-p:text-[17px]
              prose-strong:text-ink prose-strong:font-semibold
              prose-ul:my-4 prose-li:text-[17px] prose-li:text-slate
              prose-a:text-[var(--color-gold)] prose-a:font-medium hover:prose-a:text-[var(--color-gold-hover)]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </AnimatedSection>
      </div>
    </article>
  );
}
