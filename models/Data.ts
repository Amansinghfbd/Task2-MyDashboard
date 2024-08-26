// /models/Data.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IData extends Document {
  end_year: string;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string;
  impact: string;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
}

const DataSchema: Schema = new Schema({
  end_year: { type: String, required: false },
  intensity: { type: Number, required: false },
  sector: { type: String, required: false },
  topic: { type: String, required: false },
  insight: { type: String, required: false },
  url: { type: String, required: false },
  region: { type: String, required: false },
  start_year: { type: String, required: false },
  impact: { type: String, required: false },
  added: { type: String, required: false },
  published: { type: String, required: false },
  country: { type: String, required: false },
  relevance: { type: Number, required: false },
  pestle: { type: String, required: false },
  source: { type: String, required: false },
  title: { type: String, required: false },
  likelihood: { type: Number, required: false },
});

export default (mongoose.models.Data as Model<IData>) || mongoose.model<IData>('Data', DataSchema);
