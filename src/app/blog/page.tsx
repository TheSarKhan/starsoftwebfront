"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { api, BlogPost } from "@/lib/api";

const upcomingTopics = [
  "Biznesiniz üçün sayt nəyə lazımdır və nə qədər başa gəlir?",
  "Kibertəhlükəsizlik — kiçik biznes üçün nəyə diqqət etməli?",
  "Avtomatlaşdırma ilə həftədə 20+ saat necə qazanılır?",
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api
      .getBlogPosts(page)
      .then((data) => {
        setPosts(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  const allTags = Array.from(
    new Set(
      posts.flatMap((p) =>
        p.tags ? p.tags.split(",").map((t) => t.trim()).filter(Boolean) : []
      )
    )
  );

  const visiblePosts = activeTag
    ? posts.filter((p) =>
        p.tags?.split(",").map((t) => t.trim()).includes(activeTag)
      )
    : posts;

  return (
    <div className="pt-16">


      {/* ── Hero: split layout ── */}
      <section className="border-b border-[var(--color-hairline)] grid md:grid-cols-[1fr_1px_400px] lg:grid-cols-[1fr_1px_460px]">
        <div className="px-6 md:px-12 py-14 md:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-[52px] md:text-[72px] lg:text-[88px] font-extrabold text-[var(--color-ink)] leading-[0.93] tracking-[-0.035em]"
          >
            Bilik və<br />
            <em className="not-italic text-[var(--color-gold)]">praktik</em><br />
            təcrübə.
          </motion.h1>
        </div>

        <div className="hidden md:block bg-[var(--color-hairline)]" />

        <div className="hidden md:flex px-10 lg:px-12 flex-col justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[16px] text-[var(--color-slate)] leading-relaxed"
          >
            Sadə dildə — web, kibertəhlükəsizlik, avtomatlaşdırma
            və texnologiya qərarları haqqında praktiki yazılar.
          </motion.p>
        </div>
      </section>

      {/* ── Posts ── */}
      <section>

        {/* Tag filter bar */}
        {!loading && allTags.length > 0 && (
          <div className="px-6 md:px-12 py-5 border-b border-[var(--color-hairline)] flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-full transition-colors ${
                activeTag === null
                  ? "bg-[var(--color-ink)] text-white"
                  : "border border-[var(--color-hairline-strong)] text-[var(--color-slate)] hover:border-[var(--color-slate)]"
              }`}
            >
              Hamısı
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-full transition-colors ${
                  activeTag === tag
                    ? "bg-[var(--color-gold)] text-white"
                    : "border border-[var(--color-hairline-strong)] text-[var(--color-slate)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="px-6 md:px-12 py-16">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-[var(--color-slate)]/40">—</span>
              <span className="text-[16px] text-[var(--color-slate)]">Yazılar yüklənir...</span>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <div className="px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-[1fr_1px_400px] gap-0">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-slate)] mb-8">
                Tezliklə bu mövzularda
              </p>
              <div className="space-y-0">
                {upcomingTopics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-6 py-6 border-b border-[var(--color-hairline)] last:border-0"
                  >
                    <span className="font-mono text-[11px] text-[var(--color-slate)]/40 pt-1 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[17px] text-[var(--color-ink)] leading-snug font-medium">
                      {topic}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block bg-[var(--color-hairline)] mx-12" />

            <div className="hidden md:flex flex-col justify-center">
              <p className="text-[16px] text-[var(--color-slate)] leading-relaxed mb-8">
                Konkret sualınız varsa, birbaşa soruşun — cavab verməkdən məmnun olarıq.
              </p>
              <GoldButton href="/contact" variant="secondary" withArrow>
                Sualınızı göndərin
              </GoldButton>
            </div>
          </div>
        )}

        {/* Post list */}
        {!loading && visiblePosts.length > 0 && (
          <div className="divide-y divide-[var(--color-hairline)]">
            {visiblePosts.map((post, i) => {
              const tags = post.tags ? post.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
              const date = post.publishedAt
                ? (() => { const d = new Date(post.publishedAt); return `${String(d.getDate()).padStart(2,"0")}.${String(d.getMonth()+1).padStart(2,"0")}.${d.getFullYear()}`; })()
                : "";

              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: 0.04 * (i % 10) }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <article className="grid grid-cols-[40px_1fr] md:grid-cols-[64px_1fr_180px] gap-x-6 gap-y-2 px-6 md:px-12 py-8 hover:bg-[var(--color-mist)] transition-colors duration-150">

                      {/* Number */}
                      <span className="font-mono text-[11px] text-[var(--color-slate)]/40 pt-2 md:pt-3">
                        {String(page * 10 + i + 1).padStart(2, "0")}
                      </span>

                      {/* Content */}
                      <div className="min-w-0">
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-slate)] border border-[var(--color-hairline)] rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        <h2 className="font-[family-name:var(--font-display)] text-[20px] md:text-[24px] font-bold text-[var(--color-ink)] leading-[1.15] tracking-[-0.015em] mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-[15px] text-[var(--color-slate)] leading-relaxed line-clamp-2">
                          {post.summary}
                        </p>
                      </div>

                      {/* Meta */}
                      <div className="hidden md:flex flex-col items-end justify-between pl-4">
                        <div className="text-right">
                          {date && (
                            <p className="text-[12px] text-[var(--color-slate)] mb-1">{date}</p>
                          )}
                          <p className="text-[12px] text-[var(--color-slate)]">{post.author}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--color-gold)] group-hover:gap-2 transition-all">
                          Oxu <ArrowUpRight size={13} strokeWidth={2} />
                        </span>
                      </div>

                      {/* Mobile read link */}
                      <div className="col-start-2 md:hidden mt-2">
                        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--color-gold)]">
                          Oxu <ArrowUpRight size={12} strokeWidth={2} />
                        </span>
                      </div>

                    </article>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="px-6 md:px-12 py-10 border-t border-[var(--color-hairline)] flex items-center justify-between">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-slate)] hover:text-[var(--color-ink)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} strokeWidth={2} />
            Əvvəlki
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  page === i
                    ? "w-8 bg-[var(--color-gold)]"
                    : "w-2 bg-[var(--color-hairline-strong)] hover:bg-[var(--color-slate)]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-slate)] hover:text-[var(--color-ink)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Növbəti
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>
      )}

    </div>
  );
}
