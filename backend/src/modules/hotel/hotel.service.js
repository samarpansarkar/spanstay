import redisClient from '../../config/redis.js';
import AppError from '../../shared/utils/AppError.js';
import clearHotelCache from '../../shared/utils/clearHotelCache.js';
import ApprovalRequest from '../admin/approval.model.js';
import {
  createHotel,
  deleteHotelById,
  getAllHotels,
  getHotelById,
  updateHotel,
} from './hotel.repository.js';

export const registerHotelService = async (hotelData, userId) => {
  const hotel = await createHotel({ ...hotelData, owner: userId, approvalStatus: 'PENDING' });

  await ApprovalRequest.create({
    hotel: hotel._id,
    requestedBy: userId,
    action: 'CREATE',
    payload: { ...hotelData, owner: userId },
    status: 'PENDING',
  });

  await clearHotelCache();
  return hotel;
};

export const getAllHotelsService = async (query) => {
  const cachekKey = `hotels:${JSON.stringify(query)}`;

  const cachedHotels = await redisClient.get(cachekKey);

  if (cachedHotels) {
    console.log('Hotels cache hit');
    return JSON.parse(cachedHotels);
  }

  console.log('Cache Miss');

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const filter = {};

  if (query.location) {
    filter.location = { $regex: query.location, $options: 'i' };
  }

  if (query.search) {
    filter.$or = [
      { title: { $regex: query.search, $options: 'i' } },
      { description: { $regex: query.search, $options: 'i' } },
      { location: { $regex: query.search, $options: 'i' } },
    ];
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  const sort = {};
  if (query.sortBy) {
    sort[query.sortBy] = query.sortOrder === 'asc' ? 1 : -1;
  } else {
    sort.createdAt = -1;
  }

  if (!query.search) {
    filter.isAvailable = true;
  }
  filter.approvalStatus = 'APPROVED';

  const { hotels, total } = await getAllHotels(filter, skip, limit, sort);

  const responseData = {
    hotels,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };

  await redisClient.set(cachekKey, JSON.stringify(responseData), { EX: 60 });
  return responseData;
};

export const getMyApprovalsService = async (userId) => {
  const approvals = await ApprovalRequest.find({ requestedBy: userId })
    .populate('hotel', 'title location')
    .sort({ createdAt: -1 });
  return approvals;
};

export const getMyHotelsService = async (userId) => {
  const { hotels } = await getAllHotels({ owner: userId }, 0, 1000, { createdAt: -1 });
  return hotels;
};

export const getHotelByIdService = async (hotelId) => {
  const hotel = await getHotelById(hotelId);
  if (!hotel) {
    throw new AppError('Hotel not found', 404);
  }
  return hotel;
};

export const updateHotelService = async (hotelId, updateData, currentUser) => {
  const hotel = await getHotelById(hotelId);

  if (!hotel) {
    throw new AppError('Hotel not found!!!', 404);
  }

  const isOwner = hotel.owner.toString() === currentUser.id;

  if (!isOwner) {
    throw new AppError('You are not authorized!!!', 403);
  }

  const existingRequest = await ApprovalRequest.findOne({
    hotel: hotel._id,
    status: 'PENDING',
    action: { $in: ['UPDATE', 'STATUS_CHANGE', 'DELETE'] }
  });

  if (existingRequest) {
    throw new AppError('You already have a pending request for this hotel. Please wait for admin approval.', 429);
  }

  const approvalRequest = await ApprovalRequest.create({
    hotel: hotel._id,
    requestedBy: currentUser.id,
    action: updateData.isAvailable !== undefined && Object.keys(updateData).length === 1 ? 'STATUS_CHANGE' : 'UPDATE',
    payload: updateData,
    status: 'PENDING',
  });

  return approvalRequest;
};

export const deleteHotelService = async (hotelId, currentUser) => {
  const hotel = await getHotelById(hotelId);

  if (!hotel) {
    throw new AppError('Hotel not found!!!', 404);
  }
  const isOwner = hotel.owner.toString() === currentUser.id;
  const isAdmin = currentUser.role === 'admin';

  if (!isOwner && !isAdmin) {
    throw new AppError('You are not authorize!!!', 401);
  }

  if (isAdmin) {
    const deleteHotel = await deleteHotelById(hotel.id);
    await clearHotelCache();
    return deleteHotel;
  } else {
    const existingRequest = await ApprovalRequest.findOne({
      hotel: hotel._id,
      status: 'PENDING',
      action: { $in: ['UPDATE', 'STATUS_CHANGE', 'DELETE'] }
    });

    if (existingRequest) {
      throw new AppError('You already have a pending request for this hotel. Please wait for admin approval.', 429);
    }

    const approvalRequest = await ApprovalRequest.create({
      hotel: hotel._id,
      requestedBy: currentUser.id,
      action: 'DELETE',
      payload: {},
      status: 'PENDING',
    });
    return approvalRequest;
  }
};
