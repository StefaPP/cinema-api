import { Schema, model } from 'mongoose';

export const RoleSchema = new Schema({
  type: {
    type: String,
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export const Role = model('Role', RoleSchema);