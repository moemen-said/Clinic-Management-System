import mongoose from "mongoose";

export type medicineDocument = mongoose.Document & {
  _id: mongoose.Types.ObjectId;
  name: String;
  unit: String;
  description: Text;
  expireDate: Date;
  quantity: Number;
  price: Number;
  createdAt: Date;
  updatedAt: Date;
};

const medicineSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  unit: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Medicine = mongoose.model<medicineDocument>(
  "Medicine",
  medicineSchema
);
