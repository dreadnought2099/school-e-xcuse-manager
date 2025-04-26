
import { ExcuseLetter } from '@/types';
import { useApp } from '@/context/AppContext';
import { format } from 'date-fns';
import { Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface LetterCardProps {
  letter: ExcuseLetter;
}

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'pending': return 'bg-status-pending';
      case 'approved': return 'bg-status-approved';
      case 'denied': return 'bg-status-denied';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <Badge className={getStatusClasses()}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const LetterCard = ({ letter }: LetterCardProps) => {
  const { currentReviewer, updateLetterStatus } = useApp();
  const [feedback, setFeedback] = useState(letter.feedback || "");
  const isReviewer = !!currentReviewer;
  
  const handleStatusUpdate = (status: 'approved' | 'denied') => {
    updateLetterStatus(letter.id, status, feedback);
  };
  
  // Format dates for display
  const submissionDate = format(new Date(letter.date), "PPP");
  const absenceDate = format(new Date(letter.absenceDate), "PPP");
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{letter.studentName}</CardTitle>
            <CardDescription>ID: {letter.studentId}</CardDescription>
          </div>
          <StatusBadge status={letter.status} />
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="grid grid-cols-2 text-sm">
            <span className="text-muted-foreground">Submitted:</span>
            <span>{submissionDate}</span>
          </div>
          
          <div className="grid grid-cols-2 text-sm">
            <span className="text-muted-foreground">Absence Date:</span>
            <span>{absenceDate}</span>
          </div>
          
          <div className="mt-2">
            <h4 className="text-sm font-medium text-muted-foreground">Reason:</h4>
            <p className="mt-1 text-sm">{letter.reason}</p>
          </div>
          
          {letter.attachmentUrl && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              <Paperclip className="h-4 w-4" />
              <a href="#" className="text-blue-600 hover:underline">
                View Attachment
              </a>
            </div>
          )}
          
          {letter.feedback && (
            <div className="mt-2 p-2 bg-muted rounded-md">
              <h4 className="text-sm font-medium">Feedback:</h4>
              <p className="text-sm">{letter.feedback}</p>
              {letter.reviewerName && (
                <p className="text-xs text-muted-foreground mt-1">
                  - {letter.reviewerName}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      {isReviewer && letter.status === 'pending' && (
        <CardFooter>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">Review</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Review Excuse Letter</DialogTitle>
                <DialogDescription>
                  Provide feedback and approve or deny this excuse letter.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="font-medium">Student</h3>
                  <p>{letter.studentName} ({letter.studentId})</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Absence Date</h3>
                  <p>{absenceDate}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Reason</h3>
                  <p>{letter.reason}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Feedback (Optional)</h3>
                  <Textarea 
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Enter your feedback or comments here"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <DialogFooter className="flex space-x-2 sm:space-x-0">
                <Button
                  variant="destructive"
                  onClick={() => handleStatusUpdate('denied')}
                >
                  Deny
                </Button>
                <Button
                  variant="default"
                  onClick={() => handleStatusUpdate('approved')}
                  className="bg-status-approved hover:bg-status-approved/90"
                >
                  Approve
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default LetterCard;
