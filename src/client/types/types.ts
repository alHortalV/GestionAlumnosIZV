export interface Student {
    _id: string;
    name: string;
    assignedSeat: number;
    currentSeat: number | null;
  }
  
export interface Seat {
    _id: string;
    seatNumber: number;
    isOccupied: boolean;
    studentId?: string;
  }