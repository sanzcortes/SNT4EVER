import React, { useState, useEffect } from 'react';
import { useTimelinePostsSupabase } from '../../hooks/useTimelinePostsSupabase';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { HelpCircle } from 'lucide-react';
import howToIdImg from '../../assets/images/how-to-id.png';

export const TimelineManager: React.FC = () => {
  const { posts: tlPosts, loading: tlLoading, error: tlError, addPost: addTlPost, removePost: removeTlPost } = useTimelinePostsSupabase();
  
  // Draft state initialization
  const [draftState] = useState(() => {
    try {
      const saved = localStorage.getItem('timeline_form_draft');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [tlYear, setTlYear] = useState(draftState.tlYear || '');
  const [tlTitle, setTlTitle] = useState(draftState.tlTitle || '');
  const [tlContent, setTlContent] = useState(draftState.tlContent || '');
  const [tlTitleEn, setTlTitleEn] = useState(draftState.tlTitleEn || '');
  const [tlContentEn, setTlContentEn] = useState(draftState.tlContentEn || '');
  const [tlTitleCa, setTlTitleCa] = useState(draftState.tlTitleCa || '');
  const [tlContentCa, setTlContentCa] = useState(draftState.tlContentCa || '');
  const [tlMediaUrl, setTlMediaUrl] = useState(draftState.tlMediaUrl || '');
  const [tlMediaType, setTlMediaType] = useState<'video' | 'image' | 'none'>(draftState.tlMediaType || 'none');
  const [isAddingTl, setIsAddingTl] = useState(false);
  const [deletingTlId, setDeletingTlId] = useState<string | null>(null);

  // Sync draft to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const draft = {
        tlYear, tlTitle, tlContent,
        tlTitleEn, tlContentEn,
        tlTitleCa, tlContentCa,
        tlMediaType, tlMediaUrl
      };
      const isDraftEmpty = !tlYear && !tlTitle && !tlContent && !tlTitleEn && !tlContentEn && !tlTitleCa && !tlContentCa && tlMediaType === 'none' && !tlMediaUrl;
      
      if (isDraftEmpty) {
        localStorage.removeItem('timeline_form_draft');
      } else {
        localStorage.setItem('timeline_form_draft', JSON.stringify(draft));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [tlYear, tlTitle, tlContent, tlTitleEn, tlContentEn, tlTitleCa, tlContentCa, tlMediaType, tlMediaUrl]);

  const handleAddTl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tlYear.trim() || !tlTitle.trim() || !tlContent.trim()) return;

    setIsAddingTl(true);
    const result = await addTlPost({
      year: tlYear.trim(),
      title: tlTitle.trim(),
      content: tlContent.trim(),
      title_en: tlTitleEn.trim() || undefined,
      content_en: tlContentEn.trim() || undefined,
      title_ca: tlTitleCa.trim() || undefined,
      content_ca: tlContentCa.trim() || undefined,
      media_url: tlMediaUrl.trim() || undefined,
      media_type: tlMediaType
    });

    if (result.success) {
      setTlYear('');
      setTlTitle('');
      setTlContent('');
      setTlTitleEn('');
      setTlContentEn('');
      setTlTitleCa('');
      setTlContentCa('');
      setTlMediaUrl('');
      setTlMediaType('none');
      localStorage.removeItem('timeline_form_draft');
    } else {
      alert(result.error);
    }

    setIsAddingTl(false);
  };

  const handleDeleteTl = async (id: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento de Our Story?')) {
      setDeletingTlId(id);
      const result = await removeTlPost(id);
      
      if (!result.success) {
        alert(result.error);
      }
      
      setDeletingTlId(null);
    }
  };

  const handleClearDraft = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar el borrador y empezar de cero?')) {
      setTlYear('');
      setTlTitle('');
      setTlContent('');
      setTlTitleEn('');
      setTlContentEn('');
      setTlTitleCa('');
      setTlContentCa('');
      setTlMediaUrl('');
      setTlMediaType('none');
      localStorage.removeItem('timeline_form_draft');
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
      {/* Formulario para añadir Our Story */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Añadir Nuevo Evento a Our Story</h2>
          {(tlYear || tlTitle || tlContent || tlTitleEn || tlContentEn || tlTitleCa || tlContentCa || tlMediaUrl) && (
            <button
              type="button"
              onClick={handleClearDraft}
              className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors px-3 py-1 bg-red-50 hover:bg-red-100 rounded-md"
            >
              Eliminar borrador
            </button>
          )}
        </div>
        
        <form onSubmit={handleAddTl} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
              <input
                type="text"
                value={tlYear}
                onChange={(e) => setTlYear(e.target.value)}
                placeholder="Ej. 2026"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isAddingTl}
                required
              />
            </div>
            <div>
              {/* Vacío intencionalmente para alinear el año en grid */}
            </div>
          </div>

          {/* Campos de Idiomas */}
          <div className="space-y-6">
            {/* Español */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Español (Principal)</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    value={tlTitle}
                    onChange={(e) => setTlTitle(e.target.value)}
                    placeholder="Título del evento"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isAddingTl}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Texto explicativo</label>
                  <textarea
                    value={tlContent}
                    onChange={(e) => setTlContent(e.target.value)}
                    placeholder="Contenido del evento..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    disabled={isAddingTl}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Inglés */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Inglés</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={tlTitleEn}
                    onChange={(e) => setTlTitleEn(e.target.value)}
                    placeholder="Event title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isAddingTl}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={tlContentEn}
                    onChange={(e) => setTlContentEn(e.target.value)}
                    placeholder="Event description..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    disabled={isAddingTl}
                  />
                </div>
              </div>
            </div>

            {/* Catalán */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">Català</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Títol</label>
                  <input
                    type="text"
                    value={tlTitleCa}
                    onChange={(e) => setTlTitleCa(e.target.value)}
                    placeholder="Títol de l'esdeveniment"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isAddingTl}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text explicatiu</label>
                  <textarea
                    value={tlContentCa}
                    onChange={(e) => setTlContentCa(e.target.value)}
                    placeholder="Contingut de l'esdeveniment..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    disabled={isAddingTl}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Media</label>
              <select
                value={tlMediaType}
                onChange={(e) => setTlMediaType(e.target.value as 'video' | 'image' | 'none')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isAddingTl}
              >
                <option value="none">Ninguno</option>
                <option value="video">Vídeo (Youtube ID)</option>
                <option value="image">Imagen (URL)</option>
              </select>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">Enlace / ID</label>
                <Dialog>
                  <DialogTrigger asChild>
                    <button 
                      type="button" 
                      className="text-gray-400 hover:text-blue-500 transition-colors focus:outline-none flex items-center justify-center"
                      title="Ayuda sobre cómo extraer el ID de YouTube"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl p-6 bg-white border-gray-200">
                    <DialogTitle className="text-lg font-semibold text-gray-900 mb-4">Extraer el id del link del video de youtube</DialogTitle>
                    <DialogDescription className="sr-only">Instrucciones visuales sobre cómo extraer el ID de un vídeo de YouTube.</DialogDescription>
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <img src={howToIdImg} alt="Cómo extraer ID de YouTube" className="w-full h-auto" />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <input
                type="text"
                value={tlMediaUrl}
                onChange={(e) => setTlMediaUrl(e.target.value)}
                placeholder={tlMediaType === 'video' ? 'ID de Youtube (ej. dQw4w9WgXcQ)' : 'URL de la imagen'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isAddingTl || tlMediaType === 'none'}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isAddingTl || !tlYear.trim() || !tlTitle.trim() || !tlContent.trim()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto flex justify-center items-center h-11"
          >
            {isAddingTl ? (
              <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Añadir Evento'
            )}
          </button>
        </form>
      </div>

      {/* Lista de posts actuales Timeline */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Eventos de Our Story</h2>

        {tlLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : tlError ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            Error: {tlError}
          </div>
        ) : tlPosts.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
            No hay eventos añadidos todavía.
          </div>
        ) : (
          <ul className="space-y-4">
            {tlPosts.map((post) => (
              <li key={post.id} className="flex flex-col sm:flex-row sm:items-start justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-lg">{post.year} - {post.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{post.content}</p>
                  {post.media_type !== 'none' && post.media_url && (
                    <span className="inline-block mt-2 text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      Media: {post.media_type}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 block mt-2">
                    Añadido el {formatDate(post.created_at)}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTl(post.id)}
                  disabled={deletingTlId === post.id}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center min-w-[100px]"
                >
                  {deletingTlId === post.id ? (
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
