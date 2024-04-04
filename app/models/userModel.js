import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userRoles = ['organizer', 'admin', 'player', 'coach', 'agent'];

const UserSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image : {
      type : String,
      required: false,
    },
    role: {
      type: String,
      enum: userRoles,
      default: 'organizer', // Définir le rôle par défaut comme 'player'
    },
    
    confirmed: {
      type: Boolean,
      default: false,
    },
    confirmedByAdmin: {
      type: Boolean,
      default: false,
    },
    
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);

export default User;
