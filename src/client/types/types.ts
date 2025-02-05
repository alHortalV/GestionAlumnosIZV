export interface Student {
  _id: string;
  name: string;
  currentSeat: number | null;
}

export interface Seat {
  _id: string;
  seatNumber: number;
  isOccupied: boolean;
  studentId?: string;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Asientos: undefined;
  Detalles: {
    seat: Seat;
    student?: Student;
  };
};