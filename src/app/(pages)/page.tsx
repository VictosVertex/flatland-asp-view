'use client';
import GlowBorderLink from '@flasp/app/_core/components/glow-border-link';
import { motion } from 'framer-motion';

function HomePage() {
  const buttonAnimation = {
    from: { y: '+100px', opacity: 0 },
    to: { y: '0px', opacity: 1 },
  };

  const fadeInAnimation = {
    from: { opacity: 0 },
    to: { opacity: 1 },
  };

  return (
    <div className="mx-auto mt-24 flex flex-col">
      <motion.h1
        className="ml-10 text-xl"
        variants={fadeInAnimation}
        transition={{ duration: 1, ease: 'easeIn' }}
        initial="from"
        animate="to"
      >
        Welcome to
      </motion.h1>
      <div className="flex">
        <motion.h1
          className="text-[140px]"
          variants={fadeInAnimation}
          transition={{ duration: 1, ease: 'easeIn', delay: 0.3 }}
          initial="from"
          animate="to"
        >
          Flatland
        </motion.h1>
        <motion.h1
          className="text-[140px] font-bold text-blue-300"
          variants={fadeInAnimation}
          transition={{
            duration: 1,
            ease: 'easeIn',
            delay: 0.9,
          }}
          initial="from"
          animate="to"
        >
          ASP
        </motion.h1>
      </div>
      <motion.p
        className="text-l ml-auto"
        variants={fadeInAnimation}
        transition={{ duration: 1, ease: 'easeIn', delay: 0.6 }}
        initial="from"
        animate="to"
      >
        Solutions powered by Answer Set Programming
      </motion.p>{' '}
      <motion.div
        className="mx-auto mt-40"
        variants={buttonAnimation}
        transition={{ duration: 0.3, ease: 'easeIn', delay: 1.5 }}
        initial="from"
        animate="to"
      >
        <GlowBorderLink text="Getting Started" href="/environments" />
      </motion.div>
    </div>
  );
}

export default HomePage;
