import { useState } from 'react';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '@/redux/api/adminApi';
import { Trash2, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import { TableSkeleton } from '@/components/ui/Skeleton/Skeleton';
import { List } from 'react-window';

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

  const Row = ({ index, style }) => {
    const user = users[index];
    return (
      <div style={style} className="flex items-center border-b border-white/5 text-slate-300 hover:bg-white/5 px-2">
        <div className="w-1/4 truncate pr-2">{user.name}</div>
        <div className="w-1/3 truncate pr-2">{user.email}</div>
        <div className="w-1/4 pr-2">
          {editingId === user._id ? (
            <select
              className="bg-slate-800 text-white rounded p-1 border border-white/20 w-full"
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
        </div>
        <div className="flex-1 flex items-center gap-2">
          {editingId === user._id ? (
            <>
              <button aria-label="Save role" onClick={() => handleUpdateRole(user._id)} className="text-green-400 hover:text-green-300 text-sm">Save</button>
              <button aria-label="Cancel editing" onClick={() => setEditingId(null)} className="text-slate-400 hover:text-white text-sm">Cancel</button>
            </>
          ) : (
            <button aria-label={`Edit role for ${user.name}`} onClick={() => { setEditingId(user._id); setNewRole(user.role); }} className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20">
              <UserCog className="w-4 h-4" />
            </button>
          )}
          <button aria-label={`Delete user ${user.name}`} onClick={() => handleDelete(user._id)} className="p-2 bg-rose-500/10 text-rose-400 rounded-lg hover:bg-rose-500/20">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>

      <div className="overflow-x-auto min-w-[600px]">
        <div className="flex items-center border-b border-white/10 text-slate-400 pb-3 px-2 font-medium">
          <div className="w-1/4">Name</div>
          <div className="w-1/3">Email</div>
          <div className="w-1/4">Role</div>
          <div className="flex-1">Actions</div>
        </div>

        {users.length > 0 ? (
          <List
            height={400}
            rowCount={users.length}
            rowHeight={60}
            width="100%"
            className="custom-scrollbar"
            rowComponent={Row}
          />
        ) : (
          <div className="text-center text-slate-400 py-6">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
