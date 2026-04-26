import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Check, X, Loader2, LogOut } from 'lucide-react';

const Admin = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
    fetchPending();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) navigate('/login');
  };

  const fetchPending = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('materials')
      .select('*')
      .eq('status', 'pending')
      .order('uploaded_at', { ascending: false });
    setMaterials(data || []);
    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    await supabase.from('materials').update({ status }).eq('id', id);
    fetchPending();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Pending Uploads</h1>
          <button onClick={logout} className="flex items-center text-red-600 hover:text-red-800">
            <LogOut className="mr-2" size={20} /> Logout
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12"><Loader2 className="animate-spin mx-auto" /></div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4">Course</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m) => (
                  <tr key={m.id} className="border-b">
                    <td className="p-4 font-bold text-primary">{m.course_code}</td>
                    <td className="p-4">{m.title}</td>
                    <td className="p-4 flex gap-2">
                      <button onClick={() => updateStatus(m.id, 'approved')} className="text-green-600 hover:bg-green-50 p-2 rounded"><Check /></button>
                      <button onClick={() => updateStatus(m.id, 'rejected')} className="text-red-600 hover:bg-red-50 p-2 rounded"><X /></button>
                      <a href={m.file_url} target="_blank" className="text-blue-600 hover:underline p-2">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
