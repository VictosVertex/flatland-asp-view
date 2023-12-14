'use client';
import { EnvironmentGetData } from '@flasp/server/environments/data';
import EnvironmentCard from './environment-card';
import { ChangeEvent } from 'react';

interface EnvironmentListProps {
  environments: EnvironmentGetData[];
  onSelectionChange: (selection: string) => void;
}

export default function EnvironmentList(props: EnvironmentListProps) {
  const { environments, onSelectionChange } = props;
  return (
    <ul className="base-scrollbar max-h-[305px] w-full space-y-2 overflow-auto">
      {environments.map((environment: EnvironmentGetData, index) => (
        <li key={`environmentCard-${index.toString()}`}>
          <EnvironmentCard
            name={environment.name}
            json={environment.json}
            pkl={environment.pkl}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onSelectionChange(e.target.value);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
