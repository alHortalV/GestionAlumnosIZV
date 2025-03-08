import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from '../../types/types';

interface StudentsState {
  students: Student[];
}

const initialState: StudentsState = {
  students: [],
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    removeStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter(student => student._id !== action.payload);
    },
  },
});

export const { setStudents, addStudent, removeStudent } = studentsSlice.actions;
export default studentsSlice.reducer;