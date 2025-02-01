import { Seat, Student } from "../types/types";

const API_URL = 'http://192.168.1.102:3000/api';

export const api = {
  async getSeats(): Promise<Seat[]> {
    const response = await fetch(`${API_URL}/seats`);
    return response.json();
  },

  async getStudents(): Promise<Student[]> {
    const response = await fetch(`${API_URL}/students`);
    return response.json();
  },

  async reportUnauthorizedMove(data: { 
    studentId: string, 
    fromSeat: number, 
    toSeat: number 
  }) {
    const response = await fetch(`${API_URL}/unauthorized-move`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};