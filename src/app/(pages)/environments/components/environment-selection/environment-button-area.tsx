'use client';
import GlowBorderLink from '@flasp/app/_core/components/glow-border-link';
import { motion } from 'framer-motion';
import SubtleLink from '@flasp/app/_core/components/subtle-link';

interface EnvironmentButtonAreaProps {
  selection: string | null;
}

export default function EnvironmentButtonArea(
  props: EnvironmentButtonAreaProps,
) {
  const { selection = null } = props;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: '-50%' }}
        animate={{ opacity: 1, y: '0%' }}
        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.3 }}
        className="mt-16 flex h-12 justify-end gap-6 ml-7"
      >
        <SubtleLink
          text="New Environment"
          href="?section=editor"
          className="mr-auto"
        />
        <GlowBorderLink
          text="Next"
          href={`?section=encoding&env=${selection}`}
          enabled={selection != null}
        />
      </motion.div>
    </>
  );
}
