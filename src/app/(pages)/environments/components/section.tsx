import { LegacyRef, ReactNode, forwardRef } from 'react';

interface SectionProps {
  children: ReactNode;
  enabled?: boolean;
}

const Section = forwardRef<HTMLElement | null, SectionProps>(
  (props: SectionProps, ref) => {
    const { children, enabled = true } = props;

    const disableStyle =
      'pointer-events-none !border-gray-600 text-gray-600 opacity-40';

    return (
      <section
        ref={ref}
        className={`container mx-auto pt-20 min-h-screen w-[600px] max-w-screen-md p-6 ${
          enabled ? '' : disableStyle
        }`}
      >
        {children}
      </section>
    );
  },
);
// Set the displayName property
Section.displayName = 'Section';

export default Section;
