import { api } from "./api";
import { Seat, Student } from "../types/types";

export class ApiService {
  static async fetchSeats(): Promise<Seat[]> {
    return await api.getSeats();
  }

  static async fetchStudents(): Promise<Student[]> {
    return await api.getStudents();
  }

  static async login(username: string, password: string) {
    return await api.login(username, password);
  }

  static async register(username: string, password: string) {
    return await api.register(username, password);
  }

  static async createStudent(data: { name: string; assignedSeat: number }) {
    return await api.createStudent(data);
  }

  static async authorizeMove(data: {
    studentId: string;
    fromSeat: number | undefined;
    toSeat: number;
  }) {
    return await api.authorizeMove(data);
  }
}
