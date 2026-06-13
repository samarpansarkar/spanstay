import { useState } from 'react';
import { useGetHotelReviewsQuery, useCreateReviewMutation } from '@/redux/api/reviewApi';
import { useSelector } from 'react-redux';
import { Star, MessageSquare, User } from 'lucide-react';
import { toast } from 'sonner';

const HotelReviews = ({ hotelId }) => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetHotelReviewsQuery(hotelId);
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
    return <div className="text-slate-500 py-8">Loading reviews...</div>;
  }

  const reviewsData = data?.data;
  const reviews = reviewsData?.reviews || [];

  return (
    <div className="mt-16 pt-10 border-t border-white/10">
      <div className="flex items-center gap-3 mb-8">
        <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
        <h2 className="text-3xl font-bold text-white">
          {reviewsData?.averageRating || 'No'} reviews
        </h2>
        {reviews.length > 0 && (
          <span className="text-slate-400 mt-2">({reviewsData?.totalReviews} total)</span>
        )}
      </div>

      {user ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10">
          <h3 className="text-xl font-semibold text-white mb-4">Leave a review</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Rating</label>
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
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-slate-400 mb-2">Your review</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-xl transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Post Review'}
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mb-10 text-center">
          <MessageSquare className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
          <p className="text-indigo-200">Log in to leave a review for this hotel.</p>
        </div>
      )}

      {/* Review List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden">
                  {review.user?.avatar ? (
                    <img src={review.user.avatar} alt={review.user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-6 h-6 text-slate-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{review.user?.name || 'Unknown User'}</h4>
                  <p className="text-sm text-slate-400">
                    {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`}
                  />
                ))}
              </div>
              <p className="text-slate-300 leading-relaxed">{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 text-center text-slate-500 py-10">
            No reviews yet. Be the first to review this property!
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelReviews;
