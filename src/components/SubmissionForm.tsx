import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { toast } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Upload } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const SubmissionForm = () => {
  const { students, submitLetter } = useApp();
  
  const [studentId, setStudentId] = useState('');
  const [absenceDate, setAbsenceDate] = useState<Date>();
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId || !absenceDate || !reason) {
      toast("Error", {
        description: "Please complete all required fields",
        variant: "destructive"
      });
      return;
    }

    // Check if the absence date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (absenceDate < today) {
      toast("Date Error", {
        description: "You cannot submit an excuse letter for past dates",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let attachmentUrl: string | undefined;
      
      if (attachment) {
        // Create a mock URL for the attachment (in a real app, this would be handled by file storage)
        attachmentUrl = URL.createObjectURL(attachment);
      }
      
      await submitLetter({
        studentId,
        absenceDate,
        reason,
        attachmentUrl,
        date: new Date()
      });
      
      // Clear form after successful submission
      setStudentId('');
      setAbsenceDate(undefined);
      setReason('');
      setAttachment(null);
      
      toast("Success", {
        description: "Excuse letter submitted successfully"
      });
    } catch (error) {
      toast("Error", {
        description: "Failed to submit excuse letter",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast("File Size Error", {
          description: "File size must be less than 5MB",
          variant: "destructive"
        });
        return;
      }
      setAttachment(file);
    }
  };

  // Get today's date for minimum date restriction
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="studentId">Student ID</Label>
        <Input
          id="studentId"
          list="student-ids"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="Enter your student ID"
          required
        />
        <datalist id="student-ids">
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </datalist>
        <p className="text-sm text-gray-500">
          Demo student IDs: {students.map(s => s.id).join(', ')}
        </p>
      </div>
      
      <div className="space-y-2">
        <Label>Date of Absence</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !absenceDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {absenceDate ? format(absenceDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={absenceDate}
              onSelect={setAbsenceDate}
              disabled={(date) => date < today}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Absence</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Please explain your reason for absence"
          rows={4}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="attachment">Medical Certificate or Supporting Document</Label>
        <div className="flex items-center gap-4">
          <Input
            id="attachment"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            className={cn(
              "flex-1",
              attachment && "file:bg-green-50 file:text-green-700"
            )}
          />
          {attachment && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setAttachment(null)}
            >
              <Upload className="h-4 w-4" />
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Accepted file types: PDF, JPG, PNG, DOC, DOCX (max 5MB)
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Excuse Letter"}
      </Button>
    </form>
  );
};

export default SubmissionForm;
