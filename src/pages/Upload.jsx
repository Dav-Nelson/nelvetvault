import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ChevronLeft, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const UploadPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    course_code: '',
    level: '',
    type: 'past_question',
    year: new Date().getFullYear(),
    uploader_name: '',
    comments: ''
  });
  
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        setFile(null);
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) {
        setError('File size must be less than 50MB.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a PDF file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('materials')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('materials')
        .getPublicUrl(filePath);

      // 3. Insert metadata into Database
      const { error: dbError } = await supabase
        .from('materials')
        .insert([
          {
            title: formData.title,
            course_code: formData.course_code.toUpperCase(),
            level: formData.level,
            type: formData.type,
            year: parseInt(formData.year),
            file_url: publicUrl,
            file_size: file.size,
            uploader_name: formData.uploader_name || 'Anonymous',
            comments: formData.comments,
            status: 'pending'
          }
        ]);

      if (dbError) {
        // Cleanup orphaned file if DB insert fails
        await supabase.storage.from('materials').remove([filePath]);
        throw dbError;
      }

      setSuccess(true);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-8 border-primary">
          <div className="bg-green-100 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Upload Successful!</h2>
          <p className="text-gray-600 mb-8">
            Thank you for contributing! Your material is now being reviewed by an admin and will be live soon.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-all"
            >
              Back to Home
            </button>
            <button 
              onClick={() => {
                setSuccess(false);
                setFormData({
                  title: '',
                  course_code: '',
                  level: '',
                  type: 'past_question',
                  year: new Date().getFullYear(),
                  uploader_name: '',
                  comments: ''
                });
                setFile(null);
              }}
              className="w-full bg-white text-primary border border-gray-200 font-bold py-3 rounded-xl hover:bg-gray-50 transition-all"
            >
              Upload Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <nav className="bg-primary text-white p-4 shadow-md mb-8">
        <div className="container mx-auto flex items-center">
          <button onClick={() => navigate(-1)} className="mr-4 hover:text-accent transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Upload Material</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-accent p-4 text-primary font-bold flex items-center">
            <FileText className="mr-2" size={20} />
            Material Details
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 flex items-start">
                <AlertCircle className="mr-3 flex-shrink-0" size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. 2022 Mid-semester MCQ"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Course Code *</label>
                  <input
                    type="text"
                    name="course_code"
                    required
                    placeholder="VPH 404"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={formData.course_code}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Level *</label>
                  <select
                    name="level"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={formData.level}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                    <option value="500">500 Level</option>
                    <option value="600">600 Level</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Type *</label>
                  <select
                    name="type"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="past_question">Past Question</option>
                    <option value="study_material">Study Material</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    name="year"
                    min="1990"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={formData.year}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">File (PDF, max 50MB) *</label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors ${file ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-accent'}`}>
                  <div className="space-y-1 text-center">
                    <Upload className={`mx-auto h-12 w-12 ${file ? 'text-primary' : 'text-gray-400'}`} />
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark">
                        <span>{file ? 'Change file' : 'Upload a file'}</span>
                        <input type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      {file ? file.name : 'PDF up to 50MB'}
                    </p>
                  </div>
                </div>
              </div>

              <hr />

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Your Name (Optional)</label>
                <input
                  type="text"
                  name="uploader_name"
                  placeholder="Will be displayed as contributor"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.uploader_name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Comments (Optional)</label>
                <textarea
                  name="comments"
                  rows="3"
                  placeholder="Any extra info about this material?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={formData.comments}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex justify-center items-center ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark hover:scale-[1.02]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Uploading to Vault...
                </>
              ) : (
                'Submit for Review'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
