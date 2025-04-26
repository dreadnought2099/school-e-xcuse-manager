
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus, 
  ClipboardList,
  School,
  CheckCircle,
  Calendar,
  Upload,
  FileCheck
} from 'lucide-react';

const HomePage = () => {
  const { currentReviewer } = useApp();
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <School className="h-16 w-16 mx-auto text-school-600 mb-4" />
        <h1 className="text-4xl font-bold mb-4 text-school-800">
          School Excuse Letter Management System
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Streamline the process of submitting, reviewing, and tracking student absence excuse letters
        </p>
        
        {currentReviewer ? (
          <Button 
            size="lg" 
            className="px-10 bg-school-600 hover:bg-school-700" 
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-school-600 hover:bg-school-700" 
              onClick={() => navigate('/submit')}
            >
              <FilePlus className="mr-2 h-5 w-5" />
              Submit Excuse Letter
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
      
      <div className="max-w-5xl mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-school-100 rounded-full mb-4">
              <FilePlus className="h-8 w-8 text-school-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Submission</h3>
            <p className="text-gray-600">
              Students can quickly submit excuse letters using their school ID with no account needed
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-school-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-school-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Efficient Review</h3>
            <p className="text-gray-600">
              Teachers and guidance counselors can easily review, approve, or deny excuse letters
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-school-100 rounded-full mb-4">
              <Calendar className="h-8 w-8 text-school-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Tracking</h3>
            <p className="text-gray-600">
              Filter and search submissions by date, class, and status for better organization
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-school-50 rounded-xl p-8 border border-school-100">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-school-800">Supporting Documentation</h3>
              <p className="text-gray-700 mb-4">
                Students can attach medical certificates or other supporting documents to their excuse letter submissions, making the verification process smoother and more accurate.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Upload className="h-5 w-5 text-school-600" />
                  <span>Easy file uploads</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FileCheck className="h-5 w-5 text-school-600" />
                  <span>PDF, JPG, PNG support</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                Upload medical certificates and other supporting documents
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
