import React, { useState } from "react";
import { Plus, Trash2, LogOut } from "lucide-react"; // Icon library
import HDLogo from "../components/HDLogo"; // adjust path if needed
import { mockNotes } from "../types/index"; // adjust path if needed

// Types
type User = {
  name: string;
  email: string;
};

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

interface DashboardProps {
  user: User;
  onSignOut: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSignOut }) => {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const handleCreateNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: (notes.length + 1).toString(),
        title: newNote.title,
        content: newNote.content,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setNotes([...notes, note]);
      setNewNote({ title: "", content: "" });
      setShowCreateNote(false);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden">
        <HDLogo />
        <div className="flex items-center space-x-4 relative z-50">
          <span className="text-sm font-medium">Dashboard</span>
          <button
            onClick={onSignOut}
            className="text-gray-600 hover:text-gray-800"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop/Mobile Layout */}
     <div className="max-w-md mx-auto bg-white min-h-screen md:max-w-lg md:my-8 md:rounded-2xl md:shadow-xl md:min-h-0">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="hidden md:block">
            <HDLogo />
          </div>
          <h1 className="text-xl font-bold text-gray-900 md:hidden">
            Dashboard
          </h1>
          <button
            onClick={onSignOut}
            className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* User Welcome Section */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Welcome, {user.name}!
          </h2>
          <p className="text-gray-600 text-sm">Email: {user.email}</p>
        </div>

        {/* Create Note Button */}
        <div className="p-6">
          <button
            onClick={() => setShowCreateNote(true)}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Note</span>
          </button>
        </div>

        {/* Notes Section */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{note.title}</h4>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-2">{note.content}</p>
                <p className="text-gray-400 text-xs">
                  Created: {note.createdAt}
                </p>
              </div>
            ))}

            {notes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No notes yet. Create your first note!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Note Modal */}
      {showCreateNote && (
        <div className="fixed inset-0 bg-gray-500/90 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Note</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Note content"
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleCreateNote}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowCreateNote(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;