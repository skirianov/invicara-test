import { useEffect, useState } from 'react';
import { API_ENDPOINTS, BASE_URL } from '../constants';
import { Lab, User } from '../types';
import { Workstation } from './Workstation';

const id = '101';
const url = `${BASE_URL}${API_ENDPOINTS.LABS_INFO}/${id}`;

export const ComputerLab = ({ user, time }: { user: User; time: string }) => {
  const [data, setData] = useState<Lab>({ id: '', number: '', workstation_ids: [] });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        padding: '24px',
      }}
    >
      {data &&
        data.workstation_ids.map((id: string) => (
          <Workstation id={id} user={user} key={id} time={time} />
        ))}
    </div>
  );
};
