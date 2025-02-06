import { Config } from "../../config/Config";
import { Seat, Student } from "../types/types";

export const api = {

  async login(username: string, password: string) {
    const response = await fetch(`${Config.apiURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  async register(username: string, password: string) {
    const response = await fetch(`${Config.apiURL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  async getSeats(): Promise<Seat[]> {
    const response = await fetch(`${Config.apiURL}/seats`);
    return response.json();
  },

  async getStudents(): Promise<Student[]> {
    const response = await fetch(`${Config.apiURL}/students`);
    return response.json();
  },

  async createStudent(data: { name: string; assignedSeat: number }) {
    const response = await fetch(`${Config.apiURL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async authorizeMove(data: { 
    studentId: string;
    fromSeat: number | undefined;
    toSeat: number;
  }) {
    const response = await fetch(`${Config.apiURL}/authorized-move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
};