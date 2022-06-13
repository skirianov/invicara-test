export const StatusIcon = ({ isReserved }: { isReserved: boolean }) => (
  <div
    style={{
      width: '24px',
      height: '24px',
      backgroundColor: isReserved ? 'red' : 'green',
      borderRadius: '50%',
    }}
  >
    <div
      style={{
        width: '8px',
        height: '8px',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        borderRadius: '50%',
      }}
    />
  </div>
);
