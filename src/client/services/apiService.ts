import { api } from "./api";
import { Seat, Student } from "../types/types";

export class ApiService {
  static async fetchSeats(): Promise<Seat[]> {
    return await api.getSeats();
  }

  static async fetchStudents(): Promise<Student[]> {
    return await api.getStudents();
  }

  static async reportUnauthorizedMove(studentId: string, fromSeat: number, toSeat: number): Promise<void> {
    await api.reportUnauthorizedMove({ studentId, fromSeat, toSeat });
  }

  static async login(username: string, password: string) {
    return await api.login(username, password);
  }
  static async register(username: string, password: string) {
    return await api.register(username, password);
  }
}
