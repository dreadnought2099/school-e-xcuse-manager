
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileUp } from 'lucide-react';
import SubmissionForm from '@/components/SubmissionForm';

const SubmitPage = () => {
  const { currentReviewer } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentReviewer) {
      navigate('/dashboard');
    }
  }, [currentReviewer, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-school-100 via-white to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-2 text-school-700 hover:text-school-800 hover:bg-school-100/50 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-school-800">Submit Excuse Letter</h1>
          <p className="text-gray-600 mt-1">
            Complete the form below to submit your absence excuse
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto py-8">
          <Card className="border-none shadow-lg overflow-hidden bg-white rounded-2xl">
            <CardHeader className="bg-gradient-primary text-white">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-3">
                  <FileUp className="h-5 w-5 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-center">New Excuse Letter Submission</CardTitle>
              <CardDescription className="text-white/90 text-center">
                Fill out all required fields and attach supporting documents
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <SubmissionForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
