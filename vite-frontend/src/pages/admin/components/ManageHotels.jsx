import { useState } from 'react';
import { useGetMyHotelsQuery, useUpdateHotelMutation, useDeleteHotelMutation } from '@/redux/api/hotelApi';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Plus, Loader2, MapPin, IndianRupee, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import AddEditHotelForm from './AddEditHotelForm';
import { CardSkeleton } from '@/components/ui/Skeleton';

const ManageHotels = () => {
  const { data, isLoading } = useGetMyHotelsQuery();
  const [updateHotel] = useUpdateHotelMutation();
  const [deleteHotel] = useDeleteHotelMutation();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  const handleToggleStatus = async (hotel) => {
    try {
      await updateHotel({ id: hotel._id, isAvailable: !hotel.isAvailable }).unwrap();
      toast.success(`Hotel marked as ${!hotel.isAvailable ? 'available' : 'out of service'}`);
    } catch (error) {
      toast.error('Failed to update hotel status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hotel? This action cannot be undone.')) {
      try {
        await deleteHotel(id).unwrap();
        toast.success('Hotel deleted successfully');
      } catch (error) {
        toast.error('Failed to delete hotel');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">My Hotels</h1>
            <p className="text-slate-400">Manage your properties and their availability</p>
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  const hotels = data?.data || [];

  if (isFormOpen) {
    return (
      <AddEditHotelForm 
        hotel={editingHotel} 
        onClose={() => {
          setIsFormOpen(false);
          setEditingHotel(null);
        }} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Hotels</h1>
          <p className="text-slate-400">Manage your properties and their availability</p>
        </div>
        <button
          onClick={() => {
            setEditingHotel(null);
            setIsFormOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Hotel
        </button>
      </div>

      {hotels.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
          <p className="text-slate-400 mb-4">You haven't added any hotels yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <motion.div
              key={hotel._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 transition-all ${!hotel.isAvailable ? 'opacity-60 grayscale-[0.5]' : ''}`}
            >
              <div className="w-full sm:w-40 h-32 rounded-xl overflow-hidden shrink-0">
                <img 
                  src={hotel.images?.[0]?.url || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'} 
                  alt={hotel.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-semibold text-white line-clamp-1">{hotel.title}</h3>
                    <div className="flex gap-2 shrink-0">
                      <button
                        disabled={hotel.approvalStatus === 'PENDING'}
                        onClick={() => handleToggleStatus(hotel)}
                        className={`p-2 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${hotel.isAvailable ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'}`}
                        title={hotel.approvalStatus === 'PENDING' ? "Pending admin approval" : (hotel.isAvailable ? "Mark Out of Service" : "Mark Available")}
                      >
                        {hotel.isAvailable ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        disabled={hotel.approvalStatus === 'PENDING'}
                        onClick={() => {
                          setEditingHotel(hotel);
                          setIsFormOpen(true);
                        }}
                        className="p-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title={hotel.approvalStatus === 'PENDING' ? "Pending admin approval" : "Edit Hotel"}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        disabled={hotel.approvalStatus === 'PENDING'}
                        onClick={() => handleDelete(hotel._id)}
                        className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title={hotel.approvalStatus === 'PENDING' ? "Pending admin approval" : "Delete Hotel"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-slate-400 mt-1 mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-sm">{hotel.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center text-emerald-400 font-semibold">
                    <IndianRupee className="w-4 h-4 mr-0.5" />
                    {hotel.price.toLocaleString('en-IN')} <span className="text-slate-500 text-xs font-normal ml-1">/ night</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-2 shrink-0 max-w-[50%]">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                      hotel.approvalStatus === 'PENDING' ? 'bg-amber-500/20 text-amber-400' :
                      hotel.approvalStatus === 'REJECTED' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {hotel.approvalStatus}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${hotel.isAvailable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                      {hotel.isAvailable ? 'Active' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageHotels;
