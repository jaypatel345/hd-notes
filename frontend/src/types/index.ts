// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// Mock data for demonstration
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Jonas Kahnwald",
    email: "jonas_kahnwald@gmail.com",
    dateOfBirth: "1997-12-11",
  },
];

export const mockNotes: Note[] = [
  {
    id: "1",
    title: "Note 1",
    content: "This is my first note",
    createdAt: "2025-08-31",
  },
  {
    id: "2",
    title: "Note 2",
    content: "This is my second note",
    createdAt: "2025-08-31",
  },
];
