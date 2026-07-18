import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export interface InstagramPost {
  id: string;
  url: string;
  created_at: string;
  updated_at: string;
}

export function useInstagramPostsSupabase() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);

      if (!forceRefresh) {
        const cached = sessionStorage.getItem('instagram_posts_cache');
        if (cached) {
          setPosts(JSON.parse(cached));
          setLoading(false);
          return;
        }
      }

      const { data, error: supabaseError } = await supabase
        .from('instagram_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (supabaseError) throw supabaseError;
      
      const fetchedPosts = data || [];
      sessionStorage.setItem('instagram_posts_cache', JSON.stringify(fetchedPosts));
      setPosts(fetchedPosts);
      setError(null);
    } catch (err: unknown) {
      console.error('Error fetching Instagram posts:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al cargar los posts de Instagram';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchPosts();
  }, [fetchPosts]);

  const addPost = async (url: string) => {
    try {
      // Validación básica de URL de Instagram
      if (!url.includes('instagram.com/p/') && !url.includes('instagram.com/reel/')) {
        throw new Error('URL de Instagram no válida. Debe ser un enlace a un post (/p/) o reel (/reel/).');
      }
      
      // Si ya tenemos 10 o más posts, eliminamos el más antiguo (el último del array local, ya que están ordenados desc)
      if (posts.length >= 10) {
        const oldestPost = posts[posts.length - 1];
        if (oldestPost) {
          const { error: deleteError } = await supabase
            .from('instagram_posts')
            .delete()
            .eq('id', oldestPost.id);
            
          if (deleteError) {
            console.error('Error al intentar eliminar el post más antiguo:', deleteError);
            // No bloqueamos la inserción si falla el borrado, lo intentamos de todas formas
          }
        }
      }

      const { error: supabaseError } = await supabase
        .from('instagram_posts')
        .insert([{ url }]);

      if (supabaseError) throw supabaseError;
      
      await fetchPosts(true);
      return { success: true };
    } catch (err: unknown) {
      console.error('Error adding Instagram post:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al añadir el post';
      return { success: false, error: errorMessage };
    }
  };

  const removePost = async (id: string) => {
    try {
      const { error: supabaseError } = await supabase
        .from('instagram_posts')
        .delete()
        .eq('id', id);

      if (supabaseError) throw supabaseError;
      
      await fetchPosts(true);
      return { success: true };
    } catch (err: unknown) {
      console.error('Error removing Instagram post:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el post';
      return { success: false, error: errorMessage };
    }
  };

  return { posts, loading, error, addPost, removePost, refresh: fetchPosts };
}
