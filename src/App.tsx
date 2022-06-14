import { ComputerLab } from './components/ComputerLab';
import { API_ENDPOINTS, BASE_URL } from './constants';
import { User } from './types';
import { useApi } from './useApi';

const url = `${BASE_URL}${API_ENDPOINTS.USER_INFO}`;

const App = () => {
  const { data, isLoading, error } = useApi<User>(url);
  const time = 'June 13, 2022 08:10:00';

  if (error) {
    console.log(error);
  }

  return (
    <>
      Time: {time}
      {isLoading ? <p>Loading...</p> : <ComputerLab user={data} time={time} />}
    </>
  );
};

export default App;
