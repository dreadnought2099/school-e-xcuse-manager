
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-12">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Submit Excuse Letter</CardTitle>
            <CardDescription>
              Fill out this form to submit your absence excuse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubmissionForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubmitPage;
