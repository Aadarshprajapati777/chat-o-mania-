import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  pdfUrl: string;
}

const projectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pdfUrl: { type: String, required: true },
});

export const Project = mongoose.model<IProject>('Project', projectSchema);
