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