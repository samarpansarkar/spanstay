import { useState } from 'react';
import { useGetHotelReviewsQuery, useCreateReviewMutation, useCheckEligibilityQuery } from '@/redux/api/reviewApi';
import { useSelector } from 'react-redux';
import { Star, MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';
import { Skeleton, ReviewSkeleton } from '@/components/ui/Skeleton/Skeleton';

const HotelReviews = ({ hotelId }) => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetHotelReviewsQuery(hotelId);
  const { data: eligibilityData, isLoading: isEligibilityLoading } = useCheckEligibilityQuery(hotelId, { skip: !user });
  const [createReview, { isLoading: isSubmitting }] = useCreateReviewMutation();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    if (comment.trim().length < 3) {
      toast.error('Comment must be at least 3 characters');
      return;
    }

    try {
      await createReview({
        hotelId,
        data: { rating, comment },
      }).unwrap();

      toast.success('Review submitted successfully!');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err.data?.message || 'Failed to submit review');
    }
  };

  if (isLoading) {
    return (
      <div className="mt-16 pt-10 border-t border-glass-border">
        <div className="flex items-center gap-3 mb-8">
          <Skeleton className="w-8 h-8 rounded-full shrink-0" />
          <Skeleton className="h-8 w-40 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <ReviewSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  const reviewsData = data?.data;
  const reviews = reviewsData?.reviews || [];

  return (
    <div className="mt-16 pt-12 border-t border-glass-border">
      <div className="flex items-center gap-4 mb-10">
        <Star className="w-8 h-8 fill-warm-gold text-warm-gold" />
        <h2 className="text-3xl font-bold text-on-surface font-display tracking-wide">
          {reviewsData?.averageRating || 'No'} reviews
        </h2>
        {reviews.length > 0 && (
          <span className="text-on-surface-variant mt-2 font-body">({reviewsData?.totalReviews} total)</span>
        )}
      </div>

      {user ? (
        isEligibilityLoading ? (
          <div className="bg-surface-container border border-glass-border rounded-sm p-8 mb-10">
            <h3 className="text-xl font-semibold text-on-surface mb-4 font-display">Checking eligibility...</h3>
          </div>
        ) : eligibilityData?.data?.canReview ? (
          <div className="bg-surface-container-lowest border border-glass-border rounded-sm p-8 mb-12 shadow-sm">
            <h3 className="text-xl font-semibold text-on-surface mb-6 font-display tracking-wide">Leave a review</h3>
            <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3 font-body">Rating</label>
              <div className="flex gap-2">
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
                      className={`w-8 h-8 transition-colors ${star <= (hoverRating || rating)
                          ? 'fill-warm-gold text-warm-gold'
                          : 'text-surface-container-high'
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3 font-body">Your review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full bg-deep-charcoal border border-glass-border rounded-sm p-4 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-warm-gold/50 transition-colors resize-none font-body text-sm"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-warm-gold hover:bg-primary text-on-primary font-semibold py-3 px-8 rounded-sm transition-colors disabled:opacity-50 uppercase tracking-wider text-xs font-body"
            >
              {isSubmitting ? 'Submitting...' : 'Post Review'}
            </button>
          </form>
        </div>
        ) : (
          <div className="bg-surface-container border border-glass-border rounded-sm p-8 mb-12 text-center shadow-sm">
            <MessageSquare className="w-8 h-8 text-on-surface-variant mx-auto mb-4" />
            <p className="text-on-surface-variant font-body">
              {eligibilityData?.data?.message || 'You are not eligible to review this property.'}
            </p>
          </div>
        )
      ) : (
        <div className="bg-surface-container border border-glass-border rounded-sm p-8 mb-12 text-center shadow-sm">
          <MessageSquare className="w-8 h-8 text-on-surface-variant mx-auto mb-4" />
          <p className="text-on-surface-variant font-body">Log in to leave a review for this exclusive property.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-surface-container-lowest border border-glass-border rounded-sm p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-surface-container border border-glass-border rounded-full flex items-center justify-center overflow-hidden">
                  {review.user?.avatar ? (
                    <img src={review.user.avatar} alt={review.user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-on-surface-variant" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-on-surface font-display">{review.user?.name || 'Unknown User'}</h4>
                  <p className="text-xs text-on-surface-variant font-body uppercase tracking-wider mt-1">
                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex mb-4 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-warm-gold text-warm-gold' : 'text-surface-container-high'}`}
                  />
                ))}
              </div>
              <p className="text-on-surface-variant leading-relaxed font-body text-sm">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center text-on-surface-variant py-12 font-body">
            No reviews yet. Be the first to review this property!
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelReviews;
