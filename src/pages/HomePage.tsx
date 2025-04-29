
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus, 
  ClipboardList,
  CheckCircle,
  Calendar,
  Upload,
  FileCheck,
  ArrowRight
} from 'lucide-react';

const HomePage = () => {
  const { currentReviewer } = useApp();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative pb-20 pt-10 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-school-800 to-school-600">
                School Excuse Letter Management
              </h1>
              <p className="text-xl mb-8 text-gray-600 leading-relaxed">
                A modern platform for students to submit, track, and manage absence excuse letters efficiently
              </p>
              
              {currentReviewer ? (
                <Button 
                  size="lg" 
                  className="btn-gradient px-8" 
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="btn-gradient" 
                    onClick={() => navigate('/submit')}
                  >
                    <FilePlus className="mr-2 h-5 w-5" />
                    Submit Letter
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-school-600 text-school-600 hover:bg-school-50"
                    onClick={() => navigate('/status')}
                  >
                    <ClipboardList className="mr-2 h-5 w-5" />
                    Check Status
                  </Button>
                </div>
              )}
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-2xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-hero p-1 rounded-2xl">
                  <div className="bg-white w-full h-full rounded-xl p-6 flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <div className="bg-school-50 p-4 rounded-lg mb-3 shadow-sm">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-school-600 rounded-full flex items-center justify-center text-white font-medium">S</div>
                          <div className="ml-2">
                            <div className="text-sm font-medium">Science Class</div>
                            <div className="text-xs text-gray-500">Medical Absence</div>
                          </div>
                          <span className="ml-auto status-badge status-approved">Approved</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          Excuse letter for absence on April 15-17, 2025
                        </p>
                      </div>
                      
                      <div className="bg-school-50 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-school-700 rounded-full flex items-center justify-center text-white font-medium">M</div>
                          <div className="ml-2">
                            <div className="text-sm font-medium">Math Class</div>
                            <div className="text-xs text-gray-500">Family Emergency</div>
                          </div>
                          <span className="ml-auto status-badge status-pending">Pending</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          Excuse letter for absence on April 22, 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-school-100 rounded-full blur-xl z-0 opacity-80"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-school-200 rounded-full blur-xl z-0 opacity-80"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-gradient-to-b from-white to-school-50">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-school-800">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 card-hover">
              <div className="inline-flex items-center justify-center p-3 bg-school-100 rounded-full mb-4">
                <FilePlus className="h-8 w-8 text-school-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-school-800">Simple Submission</h3>
              <p className="text-gray-600">
                Submit excuse letters quickly with no account needed. Just use your school ID to get started.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 card-hover">
              <div className="inline-flex items-center justify-center p-3 bg-school-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-school-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-school-800">Quick Approvals</h3>
              <p className="text-gray-600">
                Staff can efficiently review, approve, or deny excuse letters through an intuitive interface.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 card-hover">
              <div className="inline-flex items-center justify-center p-3 bg-school-100 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-school-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-school-800">Real-time Tracking</h3>
              <p className="text-gray-600">
                Check your letter status anytime and receive notifications when your status changes.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Documentation section */}
      <section className="py-16 bg-gradient-to-br from-school-50 to-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-school-800">Supporting Documentation</h3>
                <p className="text-gray-700 mb-4">
                  Attach medical certificates or other supporting documents directly to your submissions to streamline verification.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 mt-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="bg-school-100 p-2 rounded-full">
                      <Upload className="h-5 w-5 text-school-600" />
                    </div>
                    <span>Easy file uploads</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="bg-school-100 p-2 rounded-full">
                      <FileCheck className="h-5 w-5 text-school-600" />
                    </div>
                    <span>Multiple formats supported</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-gradient-to-br from-school-100 to-school-50 p-1 rounded-xl shadow-md">
                  <div className="bg-white p-6 rounded-lg h-full">
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                      <div className="text-center">
                        <Upload className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">
                          Upload your supporting documents here
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      <p className="font-medium mb-1">Supported formats:</p>
                      <p>PDF, JPG, PNG, DOC files (max 5MB)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
