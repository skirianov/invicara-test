export interface WorkStation {
  id: string;
  name: string;
  deskNumber: number;
  reservations: Reservation[];
}

export interface Lab {
  id: string;
  number: string;
  workstation_ids: string[];
}

export interface User {
  id: string;
  name: string;
  timeRemaining: number;
  reservedStations: WorkStation[];
}

export interface Reservation {
  from: string;
  to: string;
  isReserved: boolean;
}
