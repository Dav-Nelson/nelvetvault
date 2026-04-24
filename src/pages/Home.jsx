import React from 'react';
import { Search, Upload, BookOpen, GraduationCap } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="bg-primary text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="text-accent h-8 w-8" />
            <span className="text-2xl font-bold tracking-tight">Nel <span className="text-accent">VetVault</span></span>
          </div>
          <button className="bg-accent hover:bg-accent-light text-primary font-bold py-2 px-4 rounded-md flex items-center transition-colors">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            The Community Hub for Unijos Vet Students
          </h1>
          <p className="text-xl mb-10 text-gray-200">
            Access past questions, study materials, and clinical notes organized by level and course.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-transparent rounded-full leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent sm:text-lg transition-all"
              placeholder="Search by course code or title (e.g., VPH 404)..."
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-grow">
        {/* Level Filters */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary border-l-4 border-accent pl-3">Browse by Level</h2>
          <div className="flex flex-wrap gap-3">
            {['All', '200L', '300L', '400L', '500L', '600L'].map((level) => (
              <button
                key={level}
                className={`px-6 py-2 rounded-full border-2 transition-all font-semibold ${
                  level === 'All'
                    ? 'bg-primary text-white border-primary shadow-lg scale-105'
                    : 'bg-white text-primary border-gray-200 hover:border-accent hover:text-accent'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </section>

        {/* Recent Materials (Placeholder) */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-primary border-l-4 border-accent pl-3">Recent Uploads</h2>
            <button className="text-primary hover:text-accent font-semibold transition-colors">View All →</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden group">
                <div className="h-2 bg-accent"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-gray-100 text-primary text-xs font-bold px-2 py-1 rounded">VPH 404</span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Past Question</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    Veterinary Public Health & Preventive Medicine I
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span>2023 | 400 Level</span>
                  </div>
                  <button className="w-full bg-gray-50 hover:bg-primary hover:text-white text-primary font-bold py-2 rounded-lg transition-all border border-gray-200 flex justify-center items-center">
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upload CTA Section */}
        <section className="mt-20 p-8 rounded-3xl border-2 border-dashed border-accent bg-accent/5 text-center">
          <Upload className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-primary mb-4">Have something to share?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Help your fellow students by uploading past questions or study materials. 
            The platform grows with every contribution.
          </p>
          <button className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all hover:scale-105">
            Contribute Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <div className="flex items-center space-x-2 mb-4 justify-center md:justify-start">
              <GraduationCap className="text-accent h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">Nel <span className="text-accent">VetVault</span></span>
            </div>
            <p className="text-gray-400 text-sm">
              Supporting the Faculty of Veterinary Medicine, University of Jos.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Browse Materials</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How to Upload</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Admin Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-accent">Contact</h4>
            <p className="text-gray-400 text-sm">
              Have questions? Reach out to your class representatives.
            </p>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Nel VetVault. Built with ❤️ for Unijos Vet Students.
        </div>
      </footer>
    </div>
  );
};

export default Home;
