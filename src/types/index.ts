
export type Status = "pending" | "approved" | "denied";

export interface Student {
  id: string;
  name: string;
  class: string;
  password?: string;
}

export interface Reviewer {
  id: string;
  name: string;
  role: "teacher" | "guidance" | "admin";
  password?: string;
}

export interface ExcuseLetter {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: Date;
  absenceDate: Date;
  reason: string;
  attachmentUrl?: string;
  status: Status;
  reviewerId?: string;
  reviewerName?: string;
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}
