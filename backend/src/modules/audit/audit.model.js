import mongoose, { Schema } from 'mongoose';
import { AUDIT_ACTIONS, ENTITY_TYPES, ACTOR_ROLES } from './audit.constants.js';

const auditLogSchema = new Schema(
  {
    actorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Could be null for system automated events
      index: true,
    },
    actorRole: {
      type: String,
      enum: Object.values(ACTOR_ROLES),
      required: true,
      index: true,
    },
    action: {
      type: String,
      enum: Object.values(AUDIT_ACTIONS),
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      enum: Object.values(ENTITY_TYPES),
      required: true,
      index: true,
    },
    entityId: {
      type: Schema.Types.ObjectId,
      required: true, // ID of the hotel, user, booking, etc.
    },
    targetUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false, // The user impacted by the action (e.g., hotel owner)
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    ipAddress: {
      type: String,
      default: null,
    },
    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    // Audit logs should be immutable - once written, they cannot be updated
    capped: false, // Optional: if we want a capped collection, but we'll use normal collection for complex querying
  }
);

// Indexes for performance (especially querying by multiple fields and date ranges)
auditLogSchema.index({ createdAt: -1 });
auditLogSchema.index({ actorId: 1, createdAt: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });
auditLogSchema.index({ action: 1, createdAt: -1 });

// Ensure immutability (Mongoose hook)
auditLogSchema.pre('findOneAndUpdate', function (next) {
  next(new Error('Audit logs are immutable and cannot be updated'));
});

auditLogSchema.pre('updateOne', function (next) {
  next(new Error('Audit logs are immutable and cannot be updated'));
});

auditLogSchema.pre('updateMany', function (next) {
  next(new Error('Audit logs are immutable and cannot be updated'));
});

auditLogSchema.pre('deleteOne', function (next) {
  next(new Error('Audit logs are immutable and cannot be deleted'));
});

auditLogSchema.pre('deleteMany', function (next) {
  next(new Error('Audit logs are immutable and cannot be deleted'));
});

auditLogSchema.pre('remove', function (next) {
  next(new Error('Audit logs are immutable and cannot be deleted'));
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
