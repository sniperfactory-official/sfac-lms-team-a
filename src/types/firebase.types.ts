export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  profileImage: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Post {
  id: string;
  parentId: string;
  category: string;
  userId: string;
  title: string;
  content: string;
  postImages: string[];
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Course {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Lecture {
  id: string;
  userId: string;
  courseId: string;
  title: string;
  private: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt?: Date;
  lectureType: string;
  lectureContent: LectureContent;
}

export interface Progress {
  id: string;
  userId: string;
  complete: boolean;
  playTimes: playTime[];
  lectureId: string;
}

export interface Assignment {
  id: string;
  userId: string;
  assignmentNumber: number;
  title: string;
  content: string;
  level: string;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt?: Date;
  startDate: Date;
  endDate: Date;
  readStudents: string[];
}

export interface SubmittedAssignment {
  id: string;
  assignmentId: string;
  userId: string;
  createdAt: Date;
  updatedAt?: Date;
  byRead: boolean;
  feedbacks: Feedback[];
}

export interface Attachment {
  id: string;
  userId: string;
  submittedAssignmentId: string;
  links: string[];
  attachmentFiles: AttachmentFile[];
}

export interface Feedback {
  id: string;
  parentId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface LectureComment {
  id: string;
  lectureId: string;
  parentId?: string;
  userId: string;
  content: string;
  timestamp: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface LectureContent {
  images: string[];
  textContent: string;
  externalLink: string;
  videoUrl: string;
  videoLength: number;
}

export interface AttachmentFile {
  url: string;
  name: string;
}

export interface playTime {
  start: string;
  end: string;
}
