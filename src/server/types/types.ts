export interface Student {
  _id: string | undefined;
  name: string;
  assignedSeat: number;
  currentSeat: number | null;
}

export interface Seat {
  seatNumber: number;
  id: number;
  isOccupied: boolean;
  studentId?: string;
}