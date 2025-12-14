'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  phone: string | null;
  source: string | null;
  status: string;
  submitted_at: string;
}

export default function ContactManagement() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'responded'>('all');

  useEffect(() => {
    async function loadSubmissions() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        let query = supabase
          .from('contact_submissions')
          .select('*')
          .order('submitted_at', { ascending: false });

        if (filter !== 'all') {
          query = query.eq('status', filter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error loading contact submissions:', error);
        } else {
          setSubmissions(data || []);
        }
      } catch (error) {
        console.error('Error in loadSubmissions:', error);
      } finally {
        setLoading(false);
      }
    }

    loadSubmissions();
  }, [filter]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        alert('Error updating submission: ' + error.message);
      } else {
        setSubmissions(submissions.map(s => s.id === id ? { ...s, status: newStatus } : s));
      }
    } catch (error) {
      console.error('Error updating submission:', error);
      alert('Error updating submission');
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
      <h1 className="text-3xl font-bold mb-8 text-deep-sage">Contact Submissions</h1>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-6 border-b border-portal-border">
        {(['all', 'new', 'read', 'responded'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 font-semibold capitalize transition-colors ${
              filter === status
                ? 'text-deep-sage border-b-2 border-deep-sage'
                : 'text-sage hover:text-deep-sage'
            }`}
          >
            {status} ({status === 'all' ? submissions.length : submissions.filter(s => s.status === status).length})
          </button>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg border border-portal-border shadow-md p-12 text-center">
            <p className="text-sage">No contact submissions found.</p>
          </div>
        ) : (
          submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white rounded-lg border border-portal-border shadow-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-deep-sage mb-1">{submission.name}</h3>
                  <p className="text-sage">{submission.email}</p>
                  {submission.phone && (
                    <p className="text-sm text-portal-text-secondary">{submission.phone}</p>
                  )}
                </div>
                <div className="text-right">
                  <select
                    value={submission.status}
                    onChange={(e) => handleStatusChange(submission.id, e.target.value)}
                    className="px-3 py-1 rounded border border-portal-border text-sm font-medium mb-2"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="responded">Responded</option>
                  </select>
                  <p className="text-xs text-portal-text-secondary">
                    {new Date(submission.submitted_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {submission.subject && (
                <div className="mb-3">
                  <p className="text-sm font-semibold text-deep-sage mb-1">Subject</p>
                  <p className="text-sage">{submission.subject}</p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-deep-sage mb-1">Message</p>
                <p className="text-sage leading-relaxed whitespace-pre-wrap">{submission.message}</p>
              </div>

              {submission.source && (
                <div className="mt-3 pt-3 border-t border-portal-border">
                  <p className="text-xs text-portal-text-secondary">Source: {submission.source}</p>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <a
                  href={`mailto:${submission.email}${submission.subject ? `?subject=Re: ${submission.subject}` : ''}`}
                  className="px-4 py-2 text-sm bg-accent hover:bg-highlight text-rich-green font-semibold rounded-md transition-all duration-300"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

