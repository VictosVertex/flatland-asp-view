'use client';
import { useEffect, useState } from 'react';
import EnvironmentList from './environment-list';
import EnvironmentButtonArea from './environment-button-area';
import { EnvironmentGetData } from '@flasp/server/environments/data';
import { EnvironmentsGetAllResponse } from '@flasp/server/environments/responses';

export default function EnvironmentSelection() {
  const [selection, setSelection] = useState<string | null>(null);
  const [environments, setEnvironments] = useState<EnvironmentGetData[]>([]);
  useEffect(() => {
    fetch(`/api/environments/`, {
      method: 'GET',
      headers: {
        'Content-Type': ' application/json',
      },
    })
      .then((res) => {
        console.log(res);
        res
          .json()
          .then((response: EnvironmentsGetAllResponse) => {
            console.log(response);
            setEnvironments(response.data);
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  const onSelectionChange = (newSelection: string) => {
    setSelection(newSelection);
  };

  return (
    <form>
      <EnvironmentList
        environments={environments}
        onSelectionChange={onSelectionChange}
      />
      <EnvironmentButtonArea selection={selection} />
    </form>
  );
}
