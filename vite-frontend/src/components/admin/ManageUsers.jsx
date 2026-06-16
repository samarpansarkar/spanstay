import { useState } from 'react';
import { useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } from '@/redux/api/adminApi';
import { Trash2, UserCog } from 'lucide-react';
import { toast } from 'sonner';
import { TableSkeleton } from '@/components/ui/Skeleton/Skeleton';


const ManageUsers = () => {
  const { data: usersData, isLoading } = useGetUsersQuery();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editingId, setEditingId] = useState(null);
  const [newRole, setNewRole] = useState('');

  if (isLoading) return (
    <div className="bg-surface-container border border-glass-border rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-on-surface mb-6">Manage Users</h2>
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

  const UserRow = ({ index }) => {
    const user = users[index];
    return (
      <div className="flex items-center border-b border-glass-border text-on-surface-variant hover:bg-surface-container px-2 py-4">
        <div className="w-1/4 truncate pr-2">{user.name}</div>
        <div className="w-1/3 truncate pr-2">{user.email}</div>
        <div className="w-1/4 pr-2">
          {editingId === user._id ? (
            <select
              className="bg-surface-container-high text-on-surface rounded p-1 border border-glass-border/80 w-full"
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
              <button aria-label="Cancel editing" onClick={() => setEditingId(null)} className="text-on-surface-variant hover:text-on-surface text-sm">Cancel</button>
            </>
          ) : (
            <button aria-label={`Edit role for ${user.name}`} onClick={() => { setEditingId(user._id); setNewRole(user.role); }} className="p-2 bg-primary/10 text-warm-gold rounded-lg hover:bg-primary/20">
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
    <div className="bg-surface-container border border-glass-border rounded-3xl p-6">
      <h2 className="text-2xl font-bold text-on-surface mb-6">Manage Users</h2>

      <div className="overflow-x-auto min-w-[600px]">
        <div className="flex items-center border-b border-glass-border text-on-surface-variant pb-3 px-2 font-medium">
          <div className="w-1/4">Name</div>
          <div className="w-1/3">Email</div>
          <div className="w-1/4">Role</div>
          <div className="flex-1">Actions</div>
        </div>

        {users.length > 0 ? (
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {users.map((user, index) => (
              <UserRow key={user._id} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center text-on-surface-variant py-6">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
