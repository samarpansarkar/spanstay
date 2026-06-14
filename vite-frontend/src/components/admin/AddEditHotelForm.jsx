import { useState, useEffect } from 'react';
import { useAddHotelMutation, useUpdateHotelMutation } from '@/redux/api/hotelApi';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const AddEditHotelForm = ({ hotel, onClose }) => {
  const isEditing = !!hotel;
  const [addHotel, { isLoading: isAdding }] = useAddHotelMutation();
  const [updateHotel, { isLoading: isUpdating }] = useUpdateHotelMutation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    amenities: '',
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (hotel) {
      setFormData({
        title: hotel.title || '',
        description: hotel.description || '',
        location: hotel.location || '',
        price: hotel.price || '',
        amenities: hotel.amenities?.join(', ') || '',
      });

      if (hotel.images) {
        setImagePreviews(hotel.images.map(img => img.url));
      }
    }
  }, [hotel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error('You can only upload up to 5 images');
      return;
    }
    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('location', formData.location);
    submitData.append('price', Number(formData.price));

    const amenitiesArray = formData.amenities.split(',').map(item => item.trim()).filter(Boolean);
    amenitiesArray.forEach(amenity => {
      submitData.append('amenities', amenity);
    });


    images.forEach(image => {
      submitData.append('images', image);
    });

    try {
      if (isEditing) {
        await updateHotel({
          id: hotel._id,
          title: formData.title,
          description: formData.description,
          location: formData.location,
          price: Number(formData.price),
          amenities: amenitiesArray,
        }).unwrap();
        toast.success('Hotel updated successfully');
      } else {
        await addHotel(submitData).unwrap();
        toast.success('Hotel added successfully');
      }
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save hotel');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
          <h2 className="text-2xl font-bold text-white">
            {isEditing ? 'Edit Hotel' : 'Add New Hotel'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="E.g. Sea View Resort"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="E.g. Goa, India"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
            placeholder="Describe your property..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Price per night (INR)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="E.g. 5000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Amenities (comma-separated)</label>
            <input
              type="text"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              placeholder="E.g. WiFi, Pool, Spa"
            />
          </div>
        </div>

        {!isEditing && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Images</label>
            <div className="relative border-2 border-dashed border-white/10 rounded-xl p-8 hover:border-indigo-500/50 transition-colors bg-slate-900/50">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                required={!isEditing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <Upload className="w-8 h-8 text-slate-400 mb-3" />
                <p className="text-sm font-medium text-white mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 5 images)</p>
              </div>
            </div>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-5 gap-4 mt-4">
                {imagePreviews.map((url, i) => (
                  <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                    <img src={url} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-300 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isAdding || isUpdating}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {(isAdding || isUpdating) && '... '}
            {hotel ? 'Update Hotel' : 'Create Hotel'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddEditHotelForm;
