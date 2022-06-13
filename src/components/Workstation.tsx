import { useEffect, useState } from 'react';
import { API_ENDPOINTS, BASE_URL } from '../constants';
import { Reservation, User, WorkStation } from '../types';
import { StatusIcon } from './StatusIcon';
import ComputerIcon from '../images/computer.png';
import ScheduleIcon from '../images/schedule.png';
import moment from 'moment';
import { Popover } from 'react-tiny-popover';
import { WorkstationSchedule } from './WorkstationSchedule';

const url = `${BASE_URL}${API_ENDPOINTS.WORKSTATIONS_INFO}`;

export const Workstation = ({ id, user, time }: { id: string; user: User; time: string }) => {
  const [data, setData] = useState<WorkStation>({
    id: '',
    name: '',
    deskNumber: 0,
    reservations: [],
  });
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${url}/${id}`)
      .then((res) => res.json())
      .then((newData: WorkStation) => {
        newData.reservations.forEach((each: Reservation) => {
          if (
            new Date(each.from) < new Date(time) &&
            new Date(time) > new Date(each.from) &&
            each.isReserved
          ) {
            setIsReserved(true);
          }
        });
        setData(newData);
      })
      .catch((error) => console.log(error));
  }, [id, user, time]);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    //@ts-ignore
    <>
      {data && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '270px',
            height: '140px',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '12px',
            gap: '10px',
            border: '1px solid lightgrey',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <p style={{ fontWeight: 500, fontSize: '16px', margin: 0 }}>
              Status: {isReserved ? 'Reserved' : 'Open'}
            </p>
            <div>
              <StatusIcon isReserved={isReserved} />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              gap: '14px',
            }}
          >
            <img src={ComputerIcon} alt="computer icon" height={80} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'start',
                gap: '28px',
              }}
            >
              <p style={{ fontSize: '20px', margin: 0 }}>ID - #{data.id}</p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <button
                  style={{
                    width: '90px',
                    height: '28px',
                    backgroundColor: '#3A57E8',
                    color: 'white',
                    outline: 'none',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Reserve
                </button>
                <Popover
                  isOpen={isPopoverOpen}
                  positions={['right', 'top', 'bottom']}
                  content={
                    <div>
                      <WorkstationSchedule reservations={data.reservations} />
                    </div>
                  }
                >
                  <img src={ScheduleIcon} alt="schedule icon" height={36} onClick={togglePopover} />
                </Popover>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '12px', fontWeight: 300, color: '#393C43', margin: 0 }}>
            You have {user.timeRemaining} minutes remaining
          </p>
        </div>
      )}
    </>
  );
};
