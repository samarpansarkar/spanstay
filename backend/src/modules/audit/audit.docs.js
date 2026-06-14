/**
 * @swagger
 * tags:
 *   name: Audit
 *   description: Audit Log management APIs (Platform Admin Only)
 */

/**
 * @swagger
 * /audit-logs:
 *   get:
 *     summary: Get all audit logs
 *     description: Retrieve a paginated list of audit logs with optional filtering.
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of logs per page
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *         description: Filter by specific action (e.g., HOTEL_APPROVED)
 *       - in: query
 *         name: actorRole
 *         schema:
 *           type: string
 *         description: Filter by actor role (e.g., admin)
 *       - in: query
 *         name: entityType
 *         schema:
 *           type: string
 *         description: Filter by entity type (e.g., HOTEL, USER)
 *     responses:
 *       200:
 *         description: Successful response with paginated audit logs
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Not a platform admin)
 */

/**
 * @swagger
 * /audit-logs/export:
 *   get:
 *     summary: Export audit logs as CSV
 *     description: Downloads a CSV file containing up to the last 10,000 audit logs matching filters.
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: action
 *         schema:
 *           type: string
 *       - in: query
 *         name: entityType
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: CSV file download
 *         content:
 *           text/csv:
 *             schema:
 *               type: string
 *               format: binary
 */

/**
 * @swagger
 * /audit-logs/summary:
 *   get:
 *     summary: Get daily audit summary
 *     description: Retrieves an aggregated summary of audit actions over the past 7 days.
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily audit statistics
 */
