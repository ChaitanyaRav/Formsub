import mongoose from 'mongoose';

const interestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  propertyType: { type: String, required: true, enum: ['Apartment', 'Plot', 'Commercial', 'Villa', 'Farmhouse'] },
  budget: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Interest', interestSchema);
