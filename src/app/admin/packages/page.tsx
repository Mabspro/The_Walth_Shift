'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import type { Database } from '@/types/database';

type Package = Database['public']['Tables']['packages']['Row'];

export default function PackageManagement() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const supabase = createClient();
        if (!supabase) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) {
          console.error('Error loading packages:', error);
        } else {
          setPackages(data || []);
        }
      } catch (error) {
        console.error('Error in loadPackages:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPackages();
  }, []);

  const handleFeatureToggle = async (id: string, currentStatus: boolean, field: 'is_featured' | 'is_active') => {
    try {
      const supabase = createClient();
      if (!supabase) return;

      const { error } = await supabase
        .from('packages')
        .update({ [field]: !currentStatus })
        .eq('id', id);

      if (error) {
        alert('Error updating package: ' + error.message);
      } else {
        setPackages(packages.map(p => p.id === id ? { ...p, [field]: !currentStatus } : p));
      }
    } catch (error) {
      console.error('Error updating package:', error);
      alert('Error updating package');
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
      <h1 className="text-3xl font-bold mb-8 text-deep-sage">Package Management</h1>

      <div className="bg-white rounded-lg border border-portal-border shadow-md overflow-hidden">
        {packages.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sage">No packages found.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-portal-accent-subtle">
              <tr>
                <th className="text-left p-4 font-semibold text-deep-sage">Package</th>
                <th className="text-left p-4 font-semibold text-deep-sage">Price</th>
                <th className="text-left p-4 font-semibold text-deep-sage">Featured</th>
                <th className="text-left p-4 font-semibold text-deep-sage">Active</th>
                <th className="text-left p-4 font-semibold text-deep-sage">Order</th>
                <th className="text-left p-4 font-semibold text-deep-sage">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg.id} className="border-t border-portal-border hover:bg-portal-accent-subtle/50">
                  <td className="p-4">
                    <p className="font-semibold text-deep-sage">{pkg.title}</p>
                    {pkg.description && (
                      <p className="text-sm text-sage line-clamp-1">{pkg.description}</p>
                    )}
                  </td>
                  <td className="p-4 text-sage font-medium">
                    {pkg.price === 0 ? 'FREE' : `$${pkg.price}`}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleFeatureToggle(pkg.id, pkg.is_featured || false, 'is_featured')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        pkg.is_featured
                          ? 'bg-accent text-rich-green'
                          : 'bg-portal-border text-portal-text-secondary'
                      }`}
                    >
                      {pkg.is_featured ? 'Featured' : 'Not Featured'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleFeatureToggle(pkg.id, pkg.is_active || false, 'is_active')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        pkg.is_active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {pkg.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4 text-sage">{pkg.display_order || 0}</td>
                  <td className="p-4">
                    <Link
                      href={`/admin/packages/${pkg.id}`}
                      className="px-3 py-1 text-sm bg-sage hover:bg-deep-sage text-cream rounded transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sage mb-4">Package editing coming soon. For now, edit directly in Supabase.</p>
      </div>
    </div>
  );
}

