"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface Props {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  withArrow?: boolean;
}

const sizeMap = {
  sm: "px-4 py-2 text-[13px]",
  md: "px-5 py-2.5 text-[14px]",
  lg: "px-6 py-3.5 text-[15px]",
};

const variantMap = {
  primary:
    "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-hover)] shadow-[0_1px_2px_rgba(15,20,25,0.06)] hover:shadow-[0_4px_12px_rgba(184,137,58,0.25)]",
  secondary:
    "bg-white text-ink border border-[var(--color-hairline-strong)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]",
  ghost:
    "bg-transparent text-ink hover:bg-mist",
};

/**
 * Brand button. Component name kept (`GoldButton`) for backward compatibility,
 * but visual is now clean modern — no clip-path, no decorative diamonds.
 */
export default function GoldButton({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  withArrow = false,
}: Props) {
  const cls = `inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 font-[family-name:var(--font-body)] ${sizeMap[size]} ${variantMap[variant]} ${className}`;

  const inner = (
    <motion.span
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      className={cls}
    >
      {children}
      {withArrow && <ArrowRight size={16} strokeWidth={2.25} />}
    </motion.span>
  );

  if (href) return <Link href={href}>{inner}</Link>;
  return (
    <button type={type} onClick={onClick}>
      {inner}
    </button>
  );
}
