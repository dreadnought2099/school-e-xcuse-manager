
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

