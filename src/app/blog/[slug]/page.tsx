import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await api.getBlogPost(slug).catch(() => null);
  if (!post) return { title: "404 — Tapılmadı | StarSoft" };
  return {
    title: `${post.title} | StarSoft`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      url: `https://starsoft.az/blog/${post.slug}`,
      siteName: "StarSoft",
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : [],
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
      <div className="pt-16">
        <div className="px-6 md:px-12 py-24">
          <p className="font-[family-name:var(--font-display)] text-[80px] font-extrabold text-[var(--color-gold)]/15 leading-none mb-6">
            404
          </p>
          <p className="text-[18px] text-[var(--color-slate)] mb-8">Yazı tapılmadı.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Bloga qayıt
          </Link>
        </div>
      </div>
    );
  }

  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
  const date = post.publishedAt
    ? (() => { const d = new Date(post.publishedAt); return `${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}.${d.getFullYear()}`; })()
    : "";

  return (
    <div className="pt-16">

      {/* ── Top nav ── */}
      <div className="border-b border-[var(--color-hairline)] px-6 md:px-12 py-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors"
        >
          <ArrowLeft size={13} strokeWidth={2} />
          Bütün yazılar
        </Link>
      </div>

      {/* ── Article hero: split layout ── */}
      <section className="border-b border-[var(--color-hairline)] grid md:grid-cols-[1fr_1px_280px] lg:grid-cols-[1fr_1px_320px]">

        {/* Left: tags + title */}
        <div className="px-6 md:px-12 py-12 md:py-20">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-7">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-gold-hover)] border border-[var(--color-gold)]/30 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-[family-name:var(--font-display)] text-[36px] md:text-[52px] lg:text-[60px] font-extrabold text-[var(--color-ink)] leading-[1.05] tracking-[-0.03em]">
            {post.title}
          </h1>
        </div>

        {/* Vertical rule */}
        <div className="hidden md:block bg-[var(--color-hairline)]" />

        {/* Right: meta */}
        <div className="hidden md:flex flex-col justify-center px-10 gap-6">
          {[
            { label: "Müəllif",  value: post.author },
            { label: "Tarix",    value: date },
            { label: "Baxış",    value: `${post.viewCount}` },
          ].filter(r => r.value).map(({ label, value }) => (
            <div key={label}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-slate)] mb-1">
                {label}
              </p>
              <p className="text-[15px] font-medium text-[var(--color-ink)]">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mobile meta ── */}
      <div className="md:hidden border-b border-[var(--color-hairline)] px-6 py-4 flex items-center gap-4 text-[13px] text-[var(--color-slate)]">
        {post.author && <span className="font-medium text-[var(--color-ink)]">{post.author}</span>}
        {date && <><span>·</span><span>{date}</span></>}
        <span>·</span><span>{post.viewCount} baxış</span>
      </div>

      {/* ── Cover image ── */}
      {post.coverImage && (
        <div className="border-b border-[var(--color-hairline)] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full max-h-[480px] object-cover"
          />
        </div>
      )}

      {/* ── Summary ── */}
      {post.summary && (
        <div className="border-b border-[var(--color-hairline)] px-6 md:px-12 py-8">
          <p className="text-[18px] md:text-[20px] text-[var(--color-slate)] leading-relaxed italic max-w-3xl">
            {post.summary}
          </p>
        </div>
      )}

      {/* ── Article content ── */}
      <div className="px-6 md:px-12 py-12 md:py-16">
        <div
          className="prose prose-lg max-w-3xl text-[var(--color-ink)] leading-[1.8]
            prose-headings:font-[family-name:var(--font-display)] prose-headings:text-[var(--color-ink)] prose-headings:tracking-[-0.02em]
            prose-h2:text-[26px] prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-[21px] prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
            prose-p:mb-5 prose-p:text-[17px] prose-p:text-[var(--color-ink)]
            prose-strong:text-[var(--color-ink)] prose-strong:font-semibold
            prose-ul:my-4 prose-li:text-[17px] prose-li:text-[var(--color-slate)]
            prose-a:text-[var(--color-gold)] prose-a:font-medium hover:prose-a:text-[var(--color-gold-hover)] prose-a:no-underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>


    </div>
  );
}
