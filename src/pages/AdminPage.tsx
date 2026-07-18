import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';
import { LoginForm } from '../components/admin/LoginForm';
import { InstagramManager } from '../components/admin/InstagramManager';
import { TimelineManager } from '../components/admin/TimelineManager';

type Tab = 'instagram' | 'timeline';

export const AdminPage: React.FC = () => {
  // Auth states
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Tab state
  const [activeTab, setActiveTab] = useState<Tab>('instagram');

  useEffect(() => {
    // Verificar si hay sesión activa
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    // Escuchar cambios de sesión
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // --- VISTA DE LOGIN ---
  if (!user) {
    return <LoginForm />;
  }

  // --- VISTA PANEL ADMIN ---
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-600 hover:text-red-600 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-red-200 transition-colors"
          >
            Cerrar Sesión ({user.email})
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('instagram')}
            className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'instagram'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Gestión de Instagram
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-6 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'timeline'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Gestión de Our Story
          </button>
        </div>

        {activeTab === 'instagram' && <InstagramManager />}
        {activeTab === 'timeline' && <TimelineManager />}
      </div>
    </div>
  );
};
