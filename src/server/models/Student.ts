import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  assignedSeat: number;
  currentSeat: number | null;
}

const StudentSchema: Schema = new Schema({
  name: { type: String, required: true },
  assignedSeat: { type: Number, required: true },
  currentSeat: { type: Number, default: null }
});

export default mongoose.model<IStudent>('Student', StudentSchema);