import { Reservation } from './types';

export const checkIfTimeIsReserved = (reservations: Reservation[], time: string): boolean => {
  let isReserved = false;

  reservations.forEach((each: Reservation) => {
    if (
      new Date(each.from) < new Date(time) &&
      new Date(time) > new Date(each.from) &&
      each.isReserved
    ) {
      isReserved = true;
    }
  });

  return isReserved;
};
