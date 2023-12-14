'use client';
import { usePathname } from 'next/navigation';
import { EnvironmentSelection } from './components/environment-selection';
import { useEffect, useRef, useState } from 'react';
import Section from './components/section';

interface EnvironmentsPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function EnvironmentsPage(props: EnvironmentsPageProps) {
  const { searchParams } = props;
  const environmentSelectionRef = useRef<HTMLElement>(null);
  return (
    <div className="mt-40 w-full">
      <Section ref={environmentSelectionRef}>
        <EnvironmentSelection />
      </Section>
    </div>
  );
}
