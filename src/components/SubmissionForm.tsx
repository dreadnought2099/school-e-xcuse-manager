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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const SubmissionForm = () => {
  const { students, submitLetter } = useApp();
  
  const [studentId, setStudentId] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [absenceDate, setAbsenceDate] = useState<Date>();
  const [reason, setReason] = useState('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get unique classes from students
  const uniqueClasses = Array.from(new Set(students.map(s => s.class))).sort();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId || !absenceDate || !reason || !studentClass) {
      toast.error("Please complete all required fields");
      return;
    }

    // Check if the absence date is in the future
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (absenceDate < today) {
      toast.error("You cannot submit an excuse letter for past dates");
      return;
    }

    setIsSubmitting(true);
    
    try {
      let attachmentUrl: string | undefined;
      
      if (attachment) {
        attachmentUrl = URL.createObjectURL(attachment);
      }
      
      await submitLetter({
        studentId,
        class: studentClass,
        absenceDate,
        reason,
        attachmentUrl,
        date: new Date()
      });
      
      // Clear form after successful submission
      setStudentId('');
      setStudentClass('');
      setAbsenceDate(undefined);
      setReason('');
      setAttachment(null);
      
      toast.success("Excuse letter submitted successfully");
    } catch (error) {
      toast.error("Failed to submit excuse letter");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
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
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="class">Class</Label>
        <Select 
          value={studentClass} 
          onValueChange={setStudentClass}
          required
        >
          <SelectTrigger id="class">
            <SelectValue placeholder="Select your class" />
          </SelectTrigger>
          <SelectContent>
            {uniqueClasses.map((classOption) => (
              <SelectItem key={classOption} value={classOption}>
                {classOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        <Label htmlFor="attachment">Medical Certificate or Supporting Document (Optional)</Label>
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
          Optional: Accepted file types: PDF, JPG, PNG, DOC, DOCX (max 5MB)
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
