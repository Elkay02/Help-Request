import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  picture: { type: String, default: '/default.png' },
  services: { type: [String], default: [] },
  credit: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  peopleHelped: { type: Number, default: 0 }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
