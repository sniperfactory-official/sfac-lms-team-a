import { Timestamp, DocumentReference } from "firebase/firestore";
export interface User {
  id: string;
  email: string;
  username: string;
  role: "수강생" | "관리자";
  profileImage: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Post {
  id: string;
  parentId: string;
  category: "필독" | "안내사항" | "질문있어요" | "자유게시판" | "익명피드백";
  user?: User;
  userId: DocumentReference;
  title: string;
  content: string;
  postImages: string[];
  thumbnailImages: string[];
  tags: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Course {
  id: string;
  title: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Lecture {
  id: string;
  user?: User;
  userId: DocumentReference;
  course?: Course;
  courseId: DocumentReference;
  title: string;
  isPrivate: boolean;
  startDate: Timestamp;
  endDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lectureType: "노트" | "비디오" | "링크";
  lectureContent: LectureContent;
}

export interface Progress {
  id: string;
  user?: User;
  userId: DocumentReference;
  isCompleted: boolean;
  playTimes: playTime[];
  lectureId: DocumentReference;
}

export interface Assignment {
  id: string;
  user?: User;
  userId: DocumentReference;
  title: string;
  content: string;
  level: "상" | "중" | "하";
  images: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  startDate: Timestamp;
  endDate: Timestamp;
  readStudents: string[];
}

export interface SubmittedAssignment {
  id: string;
  assignment?: Assignment;
  assignmentId: DocumentReference;
  user?: User;
  userId: DocumentReference;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  isRead: boolean;
  feedbacks: Feedback[];
}

export interface Attachment {
  id: string;
  user?: User;
  userId: DocumentReference;
  submittedAssignment?: SubmittedAssignment;
  submittedAssignmentId: DocumentReference;
  links: string[];
  attachmentFiles: AttachmentFile[];
}

export interface Feedback {
  id: string;
  parentId: string;
  user?: User;
  userId: DocumentReference;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface LectureComment {
  id: string;
  lecture?: Lecture;
  lectureId: DocumentReference;
  parentId: string;
  user?: User;
  userId: DocumentReference;
  content: string;
  replyCount: number;
  timestamp: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
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
