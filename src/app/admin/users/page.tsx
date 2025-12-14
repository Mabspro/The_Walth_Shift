'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface User {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  status: string;
  created_at: string;
  last_login: string | null;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    async function loadUsers() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        let query = supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false });

        if (filter !== 'all') {
          query = query.eq('status', filter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error loading users:', error);
        } else {
          setUsers(data || []);
        }
      } catch (error) {
        console.error('Error in loadUsers:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, [filter]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        alert('Error updating user: ' + error.message);
      } else {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  const handleStatusChange = async (userId: string, newStatus: string) => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const { error } = await supabase
        .from('users')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) {
        alert('Error updating user: ' + error.message);
      } else {
        setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-pulse">
          <div className="h-8 bg-accent/20 rounded w-48 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-deep-sage">User Management</h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-portal-border">
        {(['all', 'active', 'inactive'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-semibold capitalize transition-colors ${
              filter === status
                ? 'text-deep-sage border-b-2 border-deep-sage'
                : 'text-sage hover:text-deep-sage'
            }`}
          >
            {status} ({status === 'all' ? users.length : users.filter(u => u.status === status).length})
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-portal-border shadow-md overflow-hidden">
        {users.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sage">No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-portal-accent-subtle">
                <tr>
                  <th className="text-left p-4 font-semibold text-deep-sage">Name</th>
                  <th className="text-left p-4 font-semibold text-deep-sage">Email</th>
                  <th className="text-left p-4 font-semibold text-deep-sage">Role</th>
                  <th className="text-left p-4 font-semibold text-deep-sage">Status</th>
                  <th className="text-left p-4 font-semibold text-deep-sage">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-portal-border hover:bg-portal-accent-subtle/50">
                    <td className="p-4 font-medium text-deep-sage">{user.full_name || 'N/A'}</td>
                    <td className="p-4 text-sage">{user.email}</td>
                    <td className="p-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="px-3 py-1 rounded border border-portal-border text-sm font-medium"
                      >
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className="px-3 py-1 rounded border border-portal-border text-sm font-medium"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </td>
                    <td className="p-4 text-sm text-portal-text-secondary">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

