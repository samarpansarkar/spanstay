import { useState } from 'react';
import {
  useGetReviewByBookingQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation
} from '@/redux/api/reviewApi';
import { Star, Edit2, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';

export const BookingReviewSection = ({ booking }) => {
  const isEligible = booking.status === 'confirmed' && new Date(booking.checkOut) < new Date();

  const { data: reviewData, isLoading: isReviewLoading } = useGetReviewByBookingQuery(booking._id, { skip: !isEligible });
  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!isEligible) return null;

  const review = reviewData?.data;

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
    return <div className="mt-6 pt-6 border-t border-glass-border text-on-surface-variant text-sm font-body">Loading review data...</div>;
  }

  if (review && !isEditing) {
    return (
      <div className="mt-6 pt-6 border-t border-glass-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-on-surface font-body">Your Review</h4>
          <div className="flex gap-2">
            <button
              onClick={handleEditClick}
              className="p-2 text-on-surface-variant hover:text-warm-gold hover:bg-surface-container rounded-sm transition-colors"
              title="Edit Review"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-on-surface-variant hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-colors"
              title="Delete Review"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="bg-surface-container rounded-sm p-5 border border-glass-border shadow-sm">
          <div className="flex gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${star <= review.rating ? 'fill-warm-gold text-warm-gold' : 'text-surface-container-high'}`}
              />
            ))}
          </div>
          <p className="text-on-surface-variant text-sm font-body leading-relaxed">{review.comment}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-6 border-t border-glass-border">
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-sm font-semibold text-on-surface font-body uppercase tracking-wider">
          {review ? 'Edit Review' : 'Leave a Review'}
        </h4>
        {review && isEditing && (
          <button
            onClick={handleCancelEdit}
            className="p-1 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-container rounded-sm p-5 border border-glass-border shadow-sm">
        <div className="mb-5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3 font-body">Rating</label>
          <div className="flex gap-1.5">
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
                    ? 'fill-warm-gold text-warm-gold'
                    : 'text-surface-container-high hover:text-warm-gold/50'
                    }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3 font-body">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            className="w-full bg-deep-charcoal border border-glass-border rounded-sm p-4 text-sm text-on-surface focus:outline-none focus:border-warm-gold/50 placeholder-on-surface-variant/50 resize-none font-body"
            placeholder="Share details of your experience..."
          />
        </div>
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="bg-warm-gold hover:bg-primary text-on-primary text-xs uppercase tracking-wider font-semibold py-3 px-6 rounded-sm transition-colors disabled:opacity-50 font-body"
        >
          {isCreating || isUpdating ? 'Saving...' : review ? 'Update Review' : 'Post Review'}
        </button>
      </form>
    </div>
  );
};
