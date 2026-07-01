import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface TimelinePost {
  id: string;
  year: string;
  title: string;
  content: string;
  title_en?: string;
  content_en?: string;
  title_ca?: string;
  content_ca?: string;
  media_url?: string;
  media_type?: 'video' | 'image' | 'none';
  created_at: string;
  updated_at: string;
}

export function useTimelinePostsSupabase() {
  const [posts, setPosts] = useState<TimelinePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);

      if (!forceRefresh) {
        const cached = sessionStorage.getItem('timeline_posts_cache');
        if (cached) {
          setPosts(JSON.parse(cached));
          setLoading(false);
          return;
        }
      }

      const { data, error: supabaseError } = await supabase
        .from('timeline_posts')
        .select('*')
        .order('year', { ascending: true })
        .order('created_at', { ascending: true });

      if (supabaseError) throw supabaseError;
      
      const fetchedPosts = data || [];
      sessionStorage.setItem('timeline_posts_cache', JSON.stringify(fetchedPosts));
      setPosts(fetchedPosts);
      setError(null);
    } catch (err: unknown) {
      console.error('Error fetching Timeline posts:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los posts de Our Story';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchPosts();
  }, [fetchPosts]);

  const addPost = async (post: Omit<TimelinePost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error: supabaseError } = await supabase
        .from('timeline_posts')
        .insert([post]);

      if (supabaseError) throw supabaseError;
      
      await fetchPosts(true);
      return { success: true };
    } catch (err: unknown) {
      console.error('Error adding Timeline post:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al añadir el post';
      return { success: false, error: errorMessage };
    }
  };

  const removePost = async (id: string) => {
    try {
      const { error: supabaseError } = await supabase
        .from('timeline_posts')
        .delete()
        .eq('id', id);

      if (supabaseError) throw supabaseError;
      
      await fetchPosts(true);
      return { success: true };
    } catch (err: unknown) {
      console.error('Error removing Timeline post:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el post';
      return { success: false, error: errorMessage };
    }
  };

  return { posts, loading, error, addPost, removePost, refresh: fetchPosts };
}
