import React, { createContext, useContext, useState } from 'react';
import { Student, Seat } from '../types/types';

interface ClassroomContextType {
    students: Student[];
    seats: Seat[];
    addStudent: (student: Student) => void;
    updateSeat: (seat: Seat) => void;
}

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

export const ClassroomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [seats, setSeats] = useState<Seat[]>([]);

    const addStudent = (student: Student) => {
        setStudents((prev) => [...prev, student]);
    };

    const updateSeat = (seat: Seat) => {
        setSeats((prev) =>
            prev.map((s) => (s.seatNumber === seat.seatNumber ? { ...s, isOccupied: true, studentId: seat.studentId } : s))
        );
    };

    return (
        <ClassroomContext.Provider value={{ students, seats, addStudent, updateSeat }}>
            {children}
        </ClassroomContext.Provider>
    );
};

export const useClassroom = () => {
    const context = useContext(ClassroomContext);
    if (!context) {
        throw new Error('useClassroom debe usarse dentro de un ClassroomProvider');
    }
    return context;
};