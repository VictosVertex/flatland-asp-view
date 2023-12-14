import { motion } from 'framer-motion';
import Link from 'next/link';

interface SubtleLinkProps {
  text: string;
  href: string;
  className?: string;
}

export default function SubtleLink(props: SubtleLinkProps) {
  const { text, href, className = '' } = props;
  const glowTextVariant = {
    normal: { textShadow: 'none' },
    subtle: { textShadow: '0px 0px 10px rgba(66, 153, 225, 1)' },
  };

  const MotionLink = motion(Link);

  return (
    <MotionLink
      whileHover="subtle"
      animate="normal"
      variants={glowTextVariant}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`cursor-pointer px-2 py-3  underline underline-offset-8 ${className}`}
      href={href}
    >
      {text}
    </MotionLink>
  );
}
