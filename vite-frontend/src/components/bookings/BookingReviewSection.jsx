import { useState } from 'react';
import {
  useGetReviewByBookingQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} from '@/redux/api/reviewApi';
import { Star, MessageSquare, Edit2, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

export const BookingReviewSection = ({ booking }) => {
  const isEligible = booking.status === 'confirmed' && new Date(booking.checkOut) < new Date();

  if (!isEligible) return null;

  const { data: reviewData, isLoading: isReviewLoading } = useGetReviewByBookingQuery(booking._id);
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const review = reviewData?.data;

  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleEditClick = () => {
    setRating(review.rating);
    setComment(review.comment);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setRating(0);
    setComment('');
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(review._id).unwrap();
        toast.success('Review deleted successfully');
      } catch (error) {
        toast.error(error.data?.message || 'Failed to delete review');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (comment.trim().length < 3) {
      toast.error('Comment must be at least 3 characters long');
      return;
    }

    try {
      if (review) {
        await updateReview({ reviewId: review._id, data: { rating, comment } }).unwrap();
        toast.success('Review updated successfully');
        setIsEditing(false);
      } else {
        await createReview({ hotelId: booking.hotel._id, data: { rating, comment } }).unwrap();
        toast.success('Review posted successfully');
      }
    } catch (error) {
      toast.error(error.data?.message || 'Failed to submit review');
    }
  };

  if (isReviewLoading) {
    return <div className="mt-4 pt-4 border-t border-white/10 text-slate-400 text-sm">Loading review data...</div>;
  }

  if (review && !isEditing) {
    return (
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white">Your Review</h4>
          <div className="flex gap-2">
            <button
              onClick={handleEditClick}
              className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-md transition-colors"
              title="Edit Review"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors"
              title="Delete Review"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="bg-slate-900/50 rounded-xl p-4">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
              />
            ))}
          </div>
          <p className="text-slate-300 text-sm">{review.comment}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white">
          {review ? 'Edit Review' : 'Leave a Review'}
        </h4>
        {review && isEditing && (
          <button
            onClick={handleCancelEdit}
            className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/50 rounded-xl p-4">
        <div className="mb-4">
          <label className="block text-xs text-slate-400 mb-2">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 transition-colors ${star <= (hoverRating || rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-700 hover:text-amber-400/50'
                    }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs text-slate-400 mb-2">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-slate-600 resize-none"
            placeholder="Share details of your experience..."
          />
        </div>
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold py-2 px-6 rounded-lg transition-all disabled:opacity-50"
        >
          {isCreating || isUpdating ? 'Saving...' : review ? 'Update Review' : 'Post Review'}
        </button>
      </form>
    </div>
  );
};
