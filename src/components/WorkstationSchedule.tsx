import { Reservation } from '../types';

const tableCellStyles = {
  border: '1px solid black',
  padding: '6px',
};

export const WorkstationSchedule = ({ reservations }: { reservations: Reservation[] }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        border: '1px solid lightgrey',
        boxShadow: '1px 1px 4px 0px lightgrey',
        padding: '12px',
      }}
    >
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={tableCellStyles}>From</th>
            <th style={tableCellStyles}>To</th>
            <th style={tableCellStyles}>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.from}>
              <td style={tableCellStyles}>{reservation.from}</td>
              <td style={tableCellStyles}>{reservation.to}</td>
              <td style={tableCellStyles}>{reservation.isReserved ? 'Reserved' : 'Open'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
