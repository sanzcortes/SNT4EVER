import React, { useState } from 'react';
import { useInstagramPostsSupabase } from '../../hooks/useInstagramPostsSupabase';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { HelpCircle } from 'lucide-react';
import howToInstaImg from '../../assets/images/how-to-insta.png';

export const InstagramManager: React.FC = () => {
  const { posts: igPosts, loading: igLoading, error: igError, addPost: addIgPost, removePost: removeIgPost } = useInstagramPostsSupabase();
  const [newIgUrl, setNewIgUrl] = useState('');
  const [isAddingIg, setIsAddingIg] = useState(false);
  const [deletingIgId, setDeletingIgId] = useState<string | null>(null);

  const handleAddIg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIgUrl.trim()) return;

    setIsAddingIg(true);
    const result = await addIgPost(newIgUrl.trim());

    if (result.success) {
      setNewIgUrl('');
    } else {
      alert(result.error);
    }

    setIsAddingIg(false);
  };

  const handleDeleteIg = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      setDeletingIgId(id);
      const result = await removeIgPost(id);

      if (!result.success) {
        alert(result.error);
      }

      setDeletingIgId(null);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      {/* Formulario para añadir Instagram */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Añadir Nueva Publicación de Instagram</h2>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="text-gray-400 hover:text-blue-500 transition-colors focus:outline-none flex items-center justify-center"
                title="Ayuda sobre cómo añadir URLs"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-xl p-6 bg-white border-gray-200">
              <DialogTitle className="text-lg font-semibold text-gray-900 mb-4">Copiar url de la página de instagram</DialogTitle>
              <DialogDescription className="sr-only">Instrucciones visuales sobre cómo copiar la URL de Instagram.</DialogDescription>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img src={howToInstaImg} alt="Cómo copiar URL de Instagram" className="w-full h-auto" />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <form onSubmit={handleAddIg} className="flex flex-col sm:flex-row gap-4">
          <input
            type="url"
            value={newIgUrl}
            onChange={(e) => setNewIgUrl(e.target.value)}
            placeholder="https://www.instagram.com/p/..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isAddingIg}
            required
          />
          <button
            type="submit"
            disabled={isAddingIg || !newIgUrl.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[120px] flex justify-center items-center"
          >
            {isAddingIg ? (
              <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Añadir'
            )}
          </button>
        </form>
        {igPosts.length >= 10 && (
          <p className="text-blue-600 text-sm mt-3 font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Se ha alcanzado el límite de 10. Al añadir una nueva publicación, la más antigua se eliminará automáticamente.
          </p>
        )}
      </div>

      {/* Lista de posts actuales Instagram */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Publicaciones Actuales</h2>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${igPosts.length >= 10 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
            }`}>
            {igPosts.length} / 10
          </span>
        </div>

        {igLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : igError ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            Error: {igError}
          </div>
        ) : igPosts.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
            No hay publicaciones añadidas todavía.
          </div>
        ) : (
          <ul className="space-y-4">
            {igPosts.map((post) => (
              <li key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors gap-4">
                <div className="flex-1 min-w-0">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline truncate block font-medium mb-1"
                  >
                    {post.url}
                  </a>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Añadido el {formatDate(post.created_at)}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteIg(post.id)}
                  disabled={deletingIgId === post.id}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center min-w-[100px]"
                >
                  {deletingIgId === post.id ? (
                    <span className="inline-block h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    'Eliminar'
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
