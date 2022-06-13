import { useEffect, useState } from 'react';
import { ComputerLab } from './components/ComputerLab';
import { API_ENDPOINTS, BASE_URL } from './constants';
import { User } from './types';

const url = `${BASE_URL}${API_ENDPOINTS.USER_INFO}`;

const App = () => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    timeRemaining: 0,
    reservedStations: [],
  });
  const time = 'June 13, 2022 08:10:00';

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((resData) => setUser(resData))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      Time: {time}
      <ComputerLab user={user} time={time} />
    </>
  );
};

export default App;
