import asyncHandler from '../../shared/utils/asyncHandler.js';
import sendResponse from '../../shared/utils/SendResponse.js';
import AppError from '../../shared/utils/AppError.js';
import SupportTicket from './ticket.model.js';

export const createTicketController = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;
  const ticket = await SupportTicket.create({
    user: req.user.id,
    subject,
    message,
  });
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Support ticket created successfully',
    data: ticket,
  });
});

export const getMyTicketsController = asyncHandler(async (req, res) => {
  const tickets = await SupportTicket.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My support tickets fetched',
    data: tickets,
  });
});

export const getAllTicketsController = asyncHandler(async (req, res) => {
  const tickets = await SupportTicket.find()
    .populate('user', 'name email role')
    .sort({ createdAt: -1 });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'All support tickets fetched',
    data: tickets,
  });
});

export const resolveTicketController = asyncHandler(async (req, res) => {
  const { adminResponse } = req.body;
  const ticket = await SupportTicket.findById(req.params.id);

  if (!ticket) throw new AppError('Support ticket not found', 404);

  ticket.status = 'RESOLVED';
  ticket.adminResponse = adminResponse;
  await ticket.save();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Support ticket resolved successfully',
    data: ticket,
  });
});
