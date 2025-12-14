'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Subscriber {
  id: string;
  email: string;
  full_name: string | null;
  source: string | null;
  status: string;
  subscribed_at: string;
}

export default function SubscriberManagement() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');

  useEffect(() => {
    async function loadSubscribers() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        let query = supabase
          .from('email_subscribers')
          .select('*')
          .order('subscribed_at', { ascending: false });

        if (filter !== 'all') {
          query = query.eq('status', filter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error loading subscribers:', error);
        } else {
          setSubscribers(data || []);
        }
      } catch (error) {
        console.error('Error in loadSubscribers:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSubscribers();
  }, [filter]);

  const handleExport = () => {
    const csv = [
      ['Email', 'Name', 'Source', 'Status', 'Subscribed At'],
      ...subscribers.map(s => [
        s.email,
        s.full_name || '',
        s.source || '',
        s.status,
        new Date(s.subscribed_at).toLocaleString()
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const { error } = await supabase
        .from('email_subscribers')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        alert('Error updating subscriber: ' + error.message);
      } else {
        setSubscribers(subscribers.map(s => s.id === id ? { ...s, status: newStatus } : s));
      }
    } catch (error) {
      console.error('Error updating subscriber:', error);
      alert('Error updating subscriber');
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
        <h1 className="text-3xl font-bold text-deep-sage">Email Subscribers</h1>
        <button
          onClick={handleExport}
          className="px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300"
        >
          Export CSV
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-portal-border">
        {(['all', 'active', 'unsubscribed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-semibold capitalize transition-colors ${
              filter === status
                ? 'text-deep-sage border-b-2 border-deep-sage'
                : 'text-sage hover:text-deep-sage'
            }`}
          >
            {status} ({status === 'all' ? subscribers.length : subscribers.filter(s => s.status === status).length})
          </button>
        ))}
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg border border-portal-border shadow-md overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sage">No subscribers found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-portal-accent-subtle">
                <tr>
                  <th className="text-left p-4 font-semibold text-deep-sage">Email</th>
                  <th className="text-left p-4 font-semibold text-deep-sage">Name</th>
                  <th className="text-left p-4 font-semibold text-deep-sage">Source</th>
                  <th className="text-left p-4 font-semibold text-deep-sage">Status</th>
                  <th className="text-left p-4 font-semibold text-deep-sage">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="border-t border-portal-border hover:bg-portal-accent-subtle/50">
                    <td className="p-4 text-sage">{subscriber.email}</td>
                    <td className="p-4 text-portal-text-secondary">{subscriber.full_name || '-'}</td>
                    <td className="p-4 text-portal-text-secondary">{subscriber.source || '-'}</td>
                    <td className="p-4">
                      <select
                        value={subscriber.status}
                        onChange={(e) => handleStatusChange(subscriber.id, e.target.value)}
                        className="px-3 py-1 rounded border border-portal-border text-sm font-medium"
                      >
                        <option value="active">Active</option>
                        <option value="unsubscribed">Unsubscribed</option>
                        <option value="bounced">Bounced</option>
                      </select>
                    </td>
                    <td className="p-4 text-sm text-portal-text-secondary">
                      {new Date(subscriber.subscribed_at).toLocaleDateString()}
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

