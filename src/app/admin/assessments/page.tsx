'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface AssessmentResponse {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  wealth_shift_level: string | null;
  mindset_type: string | null;
  total_score: number | null;
  completed_at: string;
}

export default function AssessmentManagement() {
  const [assessments, setAssessments] = useState<AssessmentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentResponse | null>(null);

  useEffect(() => {
    async function loadAssessments() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('assessment_responses')
          .select('*')
          .order('completed_at', { ascending: false })
          .limit(100);

        if (error) {
          console.error('Error loading assessments:', error);
        } else {
          setAssessments(data || []);
        }
      } catch (error) {
        console.error('Error in loadAssessments:', error);
      } finally {
        setLoading(false);
      }
    }

    loadAssessments();
  }, []);

  const getAssessmentDetails = async (id: string) => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const { data, error } = await supabase
        .from('assessment_responses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error loading assessment details:', error);
      } else {
        setSelectedAssessment(data);
      }
    } catch (error) {
      console.error('Error in getAssessmentDetails:', error);
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
      <h1 className="text-3xl font-bold mb-8 text-deep-sage">Assessment Responses</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-portal-border shadow-md overflow-hidden">
            <div className="p-4 bg-portal-accent-subtle border-b border-portal-border">
              <h2 className="font-semibold text-deep-sage">All Responses ({assessments.length})</h2>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {assessments.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-sage">No assessment responses found.</p>
                </div>
              ) : (
                <div className="divide-y divide-portal-border">
                  {assessments.map((assessment) => (
                    <button
                      key={assessment.id}
                      onClick={() => getAssessmentDetails(assessment.id)}
                      className={`w-full text-left p-4 hover:bg-portal-accent-subtle transition-colors ${
                        selectedAssessment?.id === assessment.id ? 'bg-accent/10' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-deep-sage">{assessment.full_name || 'Anonymous'}</p>
                          <p className="text-sm text-sage">{assessment.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-portal-text-secondary">
                            {new Date(assessment.completed_at).toLocaleDateString()}
                          </p>
                          {assessment.wealth_shift_level && (
                            <p className="text-xs text-accent font-medium mt-1">
                              {assessment.wealth_shift_level}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-1">
          {selectedAssessment ? (
            <div className="bg-white rounded-lg border border-portal-border shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-4 text-deep-sage">Response Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-deep-sage mb-1">Name</p>
                  <p className="text-sage">{selectedAssessment.full_name || 'N/A'}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-deep-sage mb-1">Email</p>
                  <p className="text-sage">{selectedAssessment.email}</p>
                </div>

                {selectedAssessment.phone && (
                  <div>
                    <p className="text-sm font-semibold text-deep-sage mb-1">Phone</p>
                    <p className="text-sage">{selectedAssessment.phone}</p>
                  </div>
                )}

                {selectedAssessment.wealth_shift_level && (
                  <div>
                    <p className="text-sm font-semibold text-deep-sage mb-1">Wealth Shift Level</p>
                    <p className="text-sage font-medium">{selectedAssessment.wealth_shift_level}</p>
                  </div>
                )}

                {selectedAssessment.mindset_type && (
                  <div>
                    <p className="text-sm font-semibold text-deep-sage mb-1">Mindset Type</p>
                    <p className="text-sage font-medium">{selectedAssessment.mindset_type}</p>
                  </div>
                )}

                {selectedAssessment.total_score !== null && (
                  <div>
                    <p className="text-sm font-semibold text-deep-sage mb-1">Total Score</p>
                    <p className="text-sage font-medium">{selectedAssessment.total_score}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-deep-sage mb-1">Completed At</p>
                  <p className="text-sage text-sm">
                    {new Date(selectedAssessment.completed_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-portal-border shadow-md p-6">
              <p className="text-sage text-center">Select an assessment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

