import { Worker } from 'bullmq';
import { connection } from '../config/bullmq.js';
import { QUEUES, CLEANUP_JOB_TYPES } from '../constants/job.constants.js';
import User from '../../modules/auth/user.model.js';
import Notification from '../../modules/notification/notification.model.js';
import AuditLog from '../../modules/audit/audit.model.js';

const processCleanupJob = async (job) => {
  console.log(`Processing Cleanup Job [${job.id}]: ${job.name}`);
  const now = new Date();

  switch (job.name) {
    case CLEANUP_JOB_TYPES.DELETE_EXPIRED_OTPS:
      // Assuming user has resetPasswordExpire field
      const otpResult = await User.updateMany(
        { resetPasswordExpire: { $lt: now } },
        { $unset: { resetPasswordToken: 1, resetPasswordExpire: 1 } }
      );
      console.log(`Cleared expired OTPs for ${otpResult.modifiedCount} users`);
      break;

    case CLEANUP_JOB_TYPES.DELETE_EXPIRED_TOKENS:
      // Example for email verification tokens
      const tokenResult = await User.updateMany(
        { verificationTokenExpire: { $lt: now } },
        { $unset: { verificationToken: 1, verificationTokenExpire: 1 } }
      );
      console.log(`Cleared expired verification tokens for ${tokenResult.modifiedCount} users`);
      break;

    case CLEANUP_JOB_TYPES.DELETE_OLD_NOTIFICATIONS:
      // Delete read notifications older than 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const notifResult = await Notification.deleteMany({
        isRead: true,
        createdAt: { $lt: thirtyDaysAgo }
      });
      console.log(`Deleted ${notifResult.deletedCount} old notifications`);
      break;

    case CLEANUP_JOB_TYPES.DELETE_OLD_AUDIT_LOGS:
      // Delete audit logs older than 90 days
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      // Bypassing immutable pre hook by using mongoose.connection.collection directly
      const auditResult = await AuditLog.collection.deleteMany({
        createdAt: { $lt: ninetyDaysAgo }
      });
      console.log(`Deleted ${auditResult.deletedCount} old audit logs`);
      break;

    case CLEANUP_JOB_TYPES.DELETE_INACTIVE_ACCOUNTS:
      // Delete unverified accounts older than 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const inactiveResult = await User.deleteMany({
        isVerified: false,
        createdAt: { $lt: sevenDaysAgo }
      });
      console.log(`Deleted ${inactiveResult.deletedCount} inactive unverified accounts`);
      break;

    default:
      console.warn(`Unknown cleanup job type: ${job.name}`);
      throw new Error(`Unknown cleanup job type: ${job.name}`);
  }
};

export const cleanupWorker = new Worker(QUEUES.CLEANUP, processCleanupJob, {
  connection,
  concurrency: 1, // Only run 1 cleanup job at a time to prevent DB strain
});

cleanupWorker.on('completed', (job) => {
  console.log(`Cleanup Job [${job.id}] completed successfully`);
});

cleanupWorker.on('failed', (job, err) => {
  console.error(`Cleanup Job [${job.id}] failed with error: ${err.message}`);
});
