
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const SubmissionForm = () => {
  const { students, submitLetter } = useApp();
  const { toast } = useToast();
  
  const [studentId, setStudentId] = useState('');
  const [absenceDate, setAbsenceDate] = useState<Date>();
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId || !absenceDate || !reason) {
      toast({
        title: "Error",
        description: "Please complete all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create a mock attachment URL for demonstration
    const attachmentUrl = attachment ? `/uploads/${attachment.name}` : undefined;
    
    submitLetter({
      studentId,
      absenceDate,
      reason,
      attachmentUrl,
      date: new Date()
    });
    
    // Clear form
    setStudentId('');
    setAbsenceDate(undefined);
    setReason('');
    setAttachment(null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };
  
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
        <Label htmlFor="attachment">Attachment (Optional)</Label>
        <Input
          id="attachment"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        />
        <p className="text-xs text-muted-foreground">
          Accepted file types: PDF, JPG, PNG, DOC, DOCX (max 5MB)
        </p>
      </div>
      
      <Button type="submit" className="w-full">Submit Excuse Letter</Button>
    </form>
  );
};

export default SubmissionForm;
