'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface GlowBorderLinkProps {
  text: string;
  href: string;
  enabled?: boolean;
}

export default function GlowBorderLink(props: GlowBorderLinkProps) {
  const { text, href, enabled = true } = props;
  const glowVariant = {
    normal: { scale: 1, boxShadow: 'none' },
    glow: {
      scale: 1.05,
      boxShadow: '0 0 10px rgba(66, 153, 225, 0.5)', // Adjust the values for the glow effect
    },
  };

  const MotionLink = motion(Link);

  return enabled ? (
    <MotionLink
      whileHover="glow"
      animate="normal"
      variants={glowVariant}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="cursor-pointer rounded-lg border px-6 py-3"
      href={href}
    >
      {text}
    </MotionLink>
  ) : (
    <div className="cursor-default rounded-lg border border-gray-600 px-6 py-3 text-gray-600">
      {text}
    </div>
  );
}
