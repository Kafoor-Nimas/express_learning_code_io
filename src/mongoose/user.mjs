import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  user_name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

export const User = mongoose.model("User", UserSchema);
