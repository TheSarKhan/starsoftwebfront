"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import GoldButton from "@/components/GoldButton";
import { api, BlogPost } from "@/lib/api";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-5"
          >
            Blog
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display font-[family-name:var(--font-display)] text-[40px] md:text-[56px] font-extrabold text-ink leading-[1.08] tracking-[-0.025em] mb-6"
          >
            Bilik və{" "}
            <span className="text-[var(--color-gold)]">praktik təcrübə</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate text-[18px] md:text-[19px] leading-relaxed"
          >
            Azərbaycan sahibkarları üçün sadə dildə — web, kibertəhlükəsizlik,
            avtomatlaşdırma və texnologiya qərarları haqqında praktiki yazılar.
          </motion.p>
        </div>
      </section>

      {/* ═══ POSTS ═══ */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-72 bg-white border border-[var(--color-hairline)] rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <AnimatedSection>
              <div className="max-w-2xl mx-auto bg-white border border-[var(--color-hairline)] rounded-2xl p-12 text-center">
                <h3 className="font-[family-name:var(--font-display)] text-[24px] font-bold text-ink mb-3 tracking-[-0.01em]">
                  İlk yazılar hazırlanır
                </h3>
                <p className="text-slate text-[16px] leading-relaxed mb-4">
                  Tezliklə bu mövzularda praktiki yazılarla qayıdacağıq:
                </p>
                <ul className="text-left max-w-sm mx-auto space-y-2 mb-8">
                  {[
                    "Biznesiniz üçün sayt nəyə lazımdır və nə qədər başa gəlir?",
                    "Kibertəhlükəsizlik — kiçik biznes üçün nəyə diqqət etməli?",
                    "Avtomatlaşdırma ilə həftədə 20+ saat necə qazanılır?",
                  ].map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-[15px] text-slate">
                      <ArrowRight size={14} strokeWidth={2} className="text-[var(--color-gold)] mt-1 flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-slate text-[14px] mb-6">
                  Bu arada konkret sualınız varsa, birbaşa soruşun — cavab verməkdən məmnun olarıq.
                </p>
                <GoldButton href="/contact" variant="secondary" withArrow>
                  Sualınızı göndərin
                </GoldButton>
              </div>
            </AnimatedSection>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <AnimatedSection key={post.id} delay={i * 0.08}>
                  <Link href={`/blog/${post.slug}`}>
                    <article className="card-lift h-full bg-white border border-[var(--color-hairline)] rounded-xl overflow-hidden">
                      <div className="h-44 bg-gradient-to-br from-[var(--color-gold-soft)] to-white flex items-center justify-center border-b border-[var(--color-hairline)]">
                        <span className="font-[family-name:var(--font-display)] text-[64px] font-extrabold text-[var(--color-gold)]/30 leading-none">
                          {post.title[0]}
                        </span>
                      </div>
                      <div className="p-6">
                        {post.tags && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {post.tags.split(",").slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-mist text-slate text-[11px] font-medium"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                        <h3 className="font-[family-name:var(--font-display)] text-[18px] font-bold text-ink mb-2 tracking-[-0.01em] line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate text-[14px] leading-relaxed line-clamp-2 mb-4">
                          {post.summary}
                        </p>
                        <div className="flex items-center justify-between text-[12px] text-mist-slate pt-3 border-t border-[var(--color-hairline)]">
                          <span>{post.author}</span>
                          <span className="inline-flex items-center gap-1 text-[var(--color-gold)] font-semibold">
                            Oxu <ArrowRight size={12} strokeWidth={2.5} />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-10 h-10 rounded-lg text-[14px] font-semibold transition-all ${
                    page === i
                      ? "bg-[var(--color-gold)] text-white"
                      : "border border-[var(--color-hairline-strong)] text-slate hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
