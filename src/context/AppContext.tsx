import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ExcuseLetter, Status, Student, Reviewer } from '../types';
import { toast } from '@/components/ui/sonner';
import { v4 as uuidv4 } from 'uuid';

// Mock data for development
const mockStudents: Student[] = [
  { id: "S001", name: "John Doe", class: "12A" },
  { id: "S002", name: "Jane Smith", class: "11B" },
  { id: "S003", name: "Alex Johnson", class: "10C" },
];

const mockReviewers: Reviewer[] = [
  { id: "R001", name: "Ms. Peterson", role: "teacher" },
  { id: "R002", name: "Mr. Williams", role: "guidance" },
  { id: "R003", name: "Dr. Carter", role: "admin" },
];

const mockLetters: ExcuseLetter[] = [
  {
    id: uuidv4(),
    studentId: "S001",
    studentName: "John Doe",
    class: "12A", // Added class property
    date: new Date(),
    absenceDate: new Date(Date.now() - 86400000 * 2), // 2 days ago
    reason: "Medical appointment",
    attachmentUrl: "/medical-note.pdf",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    studentId: "S002",
    studentName: "Jane Smith",
    class: "11B", // Added class property
    date: new Date(Date.now() - 86400000), // 1 day ago
    absenceDate: new Date(Date.now() - 86400000 * 3), // 3 days ago
    reason: "Family emergency",
    status: "approved",
    reviewerId: "R001",
    reviewerName: "Ms. Peterson",
    feedback: "Approved. Please catch up on missed work.",
    createdAt: new Date(Date.now() - 86400000),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    studentId: "S003",
    studentName: "Alex Johnson",
    class: "10C", // Added class property
    date: new Date(Date.now() - 86400000 * 2), // 2 days ago
    absenceDate: new Date(Date.now() - 86400000 * 4), // 4 days ago
    reason: "Transportation issues",
    status: "denied",
    reviewerId: "R002",
    reviewerName: "Mr. Williams",
    feedback: "Insufficient explanation. Please provide more details.",
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(),
  },
];

interface AppContextType {
  letters: ExcuseLetter[];
  students: Student[];
  reviewers: Reviewer[];
  currentReviewer: Reviewer | null;
  isAdmin: boolean;
  
  submitLetter: (letter: Partial<ExcuseLetter>) => void;
  getStudentById: (id: string) => Student | undefined;
  
  loginAsReviewer: (id: string) => void;
  logoutReviewer: () => void;
  updateLetterStatus: (letterId: string, status: Status, feedback?: string) => void;
  
  filteredLetters: ExcuseLetter[];
  filterByDate: Date | null;
  filterByClass: string | null;
  filterByStatus: Status | null;
  setFilterByDate: (date: Date | null) => void;
  setFilterByClass: (className: string | null) => void;
  setFilterByStatus: (status: Status | null) => void;
  clearFilters: () => void;
  
  updateLetter: (id: string, updates: Partial<ExcuseLetter>) => void;
  deleteLetter: (id: string) => void;
  
  updateStudent: (id: string, updates: Partial<Student>) => void;
  
  updateReviewer: (id: string, updates: Partial<Reviewer>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // State
  const [letters, setLetters] = useState<ExcuseLetter[]>(() => {
    const savedLetters = localStorage.getItem('excuseLetters');
    return savedLetters ? JSON.parse(savedLetters) : mockLetters;
  });
  
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [reviewers, setReviewers] = useState<Reviewer[]>(mockReviewers);
  const [currentReviewer, setCurrentReviewer] = useState<Reviewer | null>(() => {
    const savedReviewer = localStorage.getItem('currentReviewer');
    return savedReviewer ? JSON.parse(savedReviewer) : null;
  });

  // Filters
  const [filterByDate, setFilterByDate] = useState<Date | null>(null);
  const [filterByClass, setFilterByClass] = useState<string | null>(null);
  const [filterByStatus, setFilterByStatus] = useState<Status | null>(null);

  // Save letters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('excuseLetters', JSON.stringify(letters));
  }, [letters]);

  // Save currentReviewer to localStorage whenever it changes
  useEffect(() => {
    if (currentReviewer) {
      localStorage.setItem('currentReviewer', JSON.stringify(currentReviewer));
    } else {
      localStorage.removeItem('currentReviewer');
    }
  }, [currentReviewer]);
  
  // Get a student by ID
  const getStudentById = (id: string) => {
    return students.find(student => student.id === id);
  };
  
  // Submit a new excuse letter
  const submitLetter = (letter: Partial<ExcuseLetter>) => {
    const student = students.find(s => s.id === letter.studentId);
    
    if (!student) {
      toast.error("Student ID not found");
      return;
    }
    
    const newLetter: ExcuseLetter = {
      id: uuidv4(),
      studentId: letter.studentId!,
      studentName: student.name,
      class: student.class,
      date: letter.date || new Date(),
      absenceDate: letter.absenceDate || new Date(),
      reason: letter.reason || "",
      attachmentUrl: letter.attachmentUrl,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setLetters(prev => [newLetter, ...prev]);
    toast.success("Excuse letter submitted successfully");
  };
  
  // Login as a reviewer
  const loginAsReviewer = (id: string) => {
    const reviewer = reviewers.find(r => r.id === id);
    if (reviewer) {
      setCurrentReviewer(reviewer);
      toast.success(`Logged in as ${reviewer.name}`);
    } else {
      toast.error("Invalid reviewer ID");
    }
  };
  
  // Logout reviewer
  const logoutReviewer = () => {
    setCurrentReviewer(null);
    localStorage.removeItem('currentReviewer');
    toast.info("Logged out successfully");
  };
  
  // Update letter status
  const updateLetterStatus = (letterId: string, status: Status, feedback?: string) => {
    if (!currentReviewer) {
      toast.error("You must be logged in as a reviewer to update status");
      return;
    }
    
    setLetters(prev => 
      prev.map(letter => 
        letter.id === letterId 
          ? {
              ...letter,
              status,
              feedback: feedback || letter.feedback,
              reviewerId: currentReviewer.id,
              reviewerName: currentReviewer.name,
              updatedAt: new Date()
            }
          : letter
      )
    );
    
    toast.success(`Letter status updated to ${status}`);
  };
  
  // Update letter
  const updateLetter = (id: string, updates: Partial<ExcuseLetter>) => {
    setLetters(prev =>
      prev.map(letter =>
        letter.id === id
          ? {
              ...letter,
              ...updates,
              updatedAt: new Date()
            }
          : letter
      )
    );
  };
  
  // Delete letter
  const deleteLetter = (id: string) => {
    setLetters(prev => prev.filter(letter => letter.id !== id));
  };
  
  // Update student
  const updateStudent = (id: string, updates: Partial<Student>) => {
    const studentExists = students.find(s => s.id === id);
    if (!studentExists) {
      toast.error("Student not found");
      return;
    }
    
    const updatedStudents = students.map(student =>
      student.id === id ? { ...student, ...updates } : student
    );
    
    setStudents(updatedStudents);
    toast.success("Student information updated successfully");
  };
  
  // Update reviewer
  const updateReviewer = (id: string, updates: Partial<Reviewer>) => {
    const reviewerExists = reviewers.find(r => r.id === id);
    if (!reviewerExists) {
      toast.error("Staff member not found");
      return;
    }
    
    setReviewers(prev =>
      prev.map(reviewer =>
        reviewer.id === id ? { ...reviewer, ...updates } : reviewer
      )
    );
    
    toast.success("Staff information updated successfully");
  };
  
  // Apply filters to get filtered letters
  const filteredLetters = letters.filter(letter => {
    // Filter by date (if set)
    if (filterByDate) {
      const letterDate = new Date(letter.absenceDate);
      const filter = new Date(filterByDate);
      if (
        letterDate.getDate() !== filter.getDate() ||
        letterDate.getMonth() !== filter.getMonth() ||
        letterDate.getFullYear() !== filter.getFullYear()
      ) {
        return false;
      }
    }
    
    // Filter by class (if set)
    if (filterByClass) {
      const student = students.find(s => s.id === letter.studentId);
      if (!student || student.class !== filterByClass) {
        return false;
      }
    }
    
    // Filter by status (if set)
    if (filterByStatus && letter.status !== filterByStatus) {
      return false;
    }
    
    return true;
  });
  
  // Clear all filters
  const clearFilters = () => {
    setFilterByDate(null);
    setFilterByClass(null);
    setFilterByStatus(null);
  };
  
  // Check if current reviewer is admin
  const isAdmin = currentReviewer?.role === 'admin';
  
  const value = {
    letters,
    students,
    reviewers,
    currentReviewer,
    isAdmin,
    submitLetter,
    getStudentById,
    loginAsReviewer,
    logoutReviewer,
    updateLetterStatus,
    filteredLetters,
    filterByDate,
    filterByClass,
    filterByStatus,
    setFilterByDate,
    setFilterByClass,
    setFilterByStatus,
    clearFilters,
    updateLetter,
    deleteLetter,
    updateStudent,
    updateReviewer,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
