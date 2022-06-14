import { API_ENDPOINTS, BASE_URL } from '../constants';
import { Lab, User } from '../types';
import { useApi } from '../useApi';
import { Workstation } from './Workstation';

const id = '101';
const url = `${BASE_URL}${API_ENDPOINTS.LABS_INFO}/${id}`;

export const ComputerLab = ({ user, time }: { user: User; time: string }) => {
  const { data: lab, isLoading, error } = useApi<Lab>(url);

  if (error) {
    console.log(error);
  }

  return (
    <div
      style={{
        display: 'grid',
        gap: '16px',
        padding: '24px',
      }}
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        lab &&
        lab.workstation_ids.map((id: string) => (
          <Workstation id={id} user={user} key={id} time={time} />
        ))
      )}
    </div>
  );
};
