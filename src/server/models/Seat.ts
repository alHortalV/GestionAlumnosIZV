import mongoose, { Schema, Document } from 'mongoose';

export interface ISeat extends Document {
  seatNumber: number;
  isOccupied: boolean;
  studentId?: mongoose.Types.ObjectId;
}

const SeatSchema: Schema = new Schema({
  seatNumber: { type: Number, required: true, unique: true },
  isOccupied: { type: Boolean, default: false },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

export default mongoose.model<ISeat>('Seat', SeatSchema);