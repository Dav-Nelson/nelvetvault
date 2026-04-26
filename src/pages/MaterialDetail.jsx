import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ChevronLeft, FileText, Download, BookOpen, Calendar, Clock, AlertCircle, Loader2 } from 'lucide-react';

const MaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('materials')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setMaterial(data);
      } catch (err) {
        console.error('Error fetching material:', err);
        setError('Could not load material details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  if (error || !material) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <AlertCircle className="text-red-500 mb-4" size={48} />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Material not found</h2>
      <button onClick={() => navigate('/')} className="text-primary hover:underline font-semibold">Back to Home</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <nav className="bg-primary text-white p-4 shadow-md mb-8">
        <div className="container mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4 hover:text-accent transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Material Details</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-accent p-6 text-primary border-b border-gray-100">
            <div className="flex items-center mb-2">
              <span className="bg-white/90 text-primary text-xs font-bold px-3 py-1 rounded-full mr-2">{material.course_code}</span>
              <span className="bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">{material.type === 'past_question' ? 'Past Question' : 'Study Material'}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">{material.title}</h1>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <BookOpen className="mr-2 text-accent" size={18} />
                <span>Level: {material.level}L</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 text-accent" size={18} />
                <span>Year: {material.year}</span>
              </div>
              <div className="flex items-center">
                <FileText className="mr-2 text-accent" size={18} />
                <span>Size: {(material.file_size / (1024 * 1024)).toFixed(1)} MB</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 text-accent" size={18} />
                <span>Uploaded: {new Date(material.uploaded_at).toLocaleDateString()}</span>
              </div>
            </div>

            {material.comments && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-700 mb-2">Notes from uploader:</h4>
                <p className="text-gray-600 text-sm italic">"{material.comments}"</p>
              </div>
            )}

            <a 
              href={material.file_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center text-lg hover:scale-[1.02]"
            >
              <Download className="mr-2" size={24} />
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetail;
