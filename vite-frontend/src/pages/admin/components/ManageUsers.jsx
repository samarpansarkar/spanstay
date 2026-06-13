import { useState } from 'react';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '@/redux/api/adminApi';
import { Trash2, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import { TableSkeleton } from '@/components/ui/Skeleton';

const ManageUsers = () => {
  const { data: usersData, isLoading } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  
  const [editingId, setEditingId] = useState(null);
  const [newRole, setNewRole] = useState('');

  if (isLoading) return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
      <TableSkeleton rows={5} cols={4} />
    </div>
  );

  const users = usersData?.data || [];

  const handleUpdateRole = async (id) => {
    try {
      await updateUser({ id, role: newRole }).unwrap();
      toast.success('User role updated');
      setEditingId(null);
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('User deleted');
      } catch (err) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-slate-400">
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Role</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="border-b border-white/5 text-slate-300 hover:bg-white/5">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {editingId === user._id ? (
                    <select
                      className="bg-slate-800 text-white rounded p-1 border border-white/20"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="hotelAdmin">Hotel Admin</option>
                      <option value="admin">Super Admin</option>
                    </select>
                  ) : (
                    <span className="capitalize">{user.role}</span>
                  )}
                </td>
                <td className="p-3 flex items-center gap-2">
                  {editingId === user._id ? (
                    <>
                      <button onClick={() => handleUpdateRole(user._id)} className="text-green-400 hover:text-green-300 text-sm">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-slate-400 hover:text-white text-sm">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => { setEditingId(user._id); setNewRole(user.role); }} className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20">
                      <UserCog className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => handleDelete(user._id)} className="p-2 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <div className="text-center text-slate-400 py-6">No users found.</div>}
      </div>
    </div>
  );
};

export default ManageUsers;
