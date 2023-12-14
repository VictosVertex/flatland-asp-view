'use client';
import { usePathname } from 'next/navigation';
import { EnvironmentSelection } from './components/environment-selection';
import { useEffect, useRef, useState } from 'react';
import Section from './components/section';
import EnvironmentEditor from '@flasp/app/features/environment-editor/environment-editor';

enum PageState {
  INITIAL,
  EDITOR,
  ENCODING,
}

interface EnvironmentsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EnvironmentsPage(props: EnvironmentsPageProps) {
  const { searchParams } = props;
  const environmentSelectionRef = useRef<HTMLElement>(null);
  const editorSectionRef = useRef<HTMLElement>(null);
  const [pageState, setPageState] = useState<PageState>(PageState.INITIAL);
  const pathname = usePathname().split('/');

  /**
   * Change the page state based on search parameters
   */
  useEffect(() => {
    switch (searchParams['section']) {
      case 'editor':
        setPageState(PageState.EDITOR);
        break;
      default:
        setPageState(PageState.INITIAL);
        break;
    }
  }, [searchParams]);

  /**
   * Scroll to the corresponding page section based on page state
   */
  useEffect(() => {
    switch (pageState) {
      case PageState.EDITOR:
        if (editorSectionRef.current) {
          editorSectionRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
    }
  }, [pageState, editorSectionRef]);

  return (
    <div className="w-full">
      <Section ref={environmentSelectionRef} enabled={false}>
        <EnvironmentSelection />
      </Section>
      {pageState == PageState.EDITOR && (
        <Section ref={editorSectionRef}>
          <EnvironmentEditor environmentHeight={10} environmentWidth={10} />
        </Section>
      )}
    </div>
  );
}
