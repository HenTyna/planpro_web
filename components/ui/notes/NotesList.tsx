import { useState, useEffect, useRef } from "react"
import { CalendarDays, Check, Plus, Save, Search, Trash2, X } from "lucide-react"
import { ConfirmationType } from "@/utils/enum"
import { Button } from "@/components/shared/ui/Button"
import { Input } from "@/components/shared/ui/Input"
import Image from "next/image"
import todo from "@/public/asset/TodosImage.png"
import { formatDate } from "@/utils/dateformat"
import useFetchNote from "@/lib/hooks/useFetchNote"
import { NoteService } from "@/service/note.service"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import NoteDetailModal from "./NoteDetailModal"
import LandingSpinner from "@/components/shared/LandingSpinner"
// Sample notes data
const notes_data = [
  {
    id: 1,
    title: "Project Ideas",
    content:
      "1. Mobile app for plant care tracking\n2. Browser extension for productivity\n3. Smart home dashboard\n4. Recipe organizer with shopping list",
    createdAt: new Date("2025-05-10"),
    updatedAt: new Date("2025-05-11"),
    color: "bg-blue-400",
    textColor: "text-blue-900",
  },
  {
    id: 2,
    title: "Meeting Notes - Design Team",
    content:
      "- Review wireframes for dashboard\n- Discuss color palette changes\n- Plan user testing for next sprint\n- Assign new tasks to team members",
    createdAt: new Date("2025-05-08"),
    updatedAt: new Date("2025-05-12"),
    color: "bg-green-400",
    textColor: "text-green-900",
  },
  {
    id: 3,
    title: "Books to Read",
    content:
      "1. Atomic Habits - James Clear\n2. Deep Work - Cal Newport\n3. The Design of Everyday Things - Don Norman\n4. Thinking, Fast and Slow - Daniel Kahneman",
    createdAt: new Date("2025-05-05"),
    updatedAt: new Date("2025-05-05"),
    color: "bg-yellow-400",
    textColor: "text-yellow-900",
  },
  {
    id: 4,
    title: "Weekly Goals",
    content:
      "- Complete project proposal\n- Schedule team meeting\n- Review quarterly metrics\n- Update documentation\n- Prepare presentation",
    createdAt: new Date("2025-05-01"),
    updatedAt: new Date("2025-05-03"),
    color: "bg-orange-400",
    textColor: "text-orange-900",
  },
  {
    id: 5,
    title: "Travel Plans",
    content:
      "Places to visit:\n- Tokyo, Japan\n- Barcelona, Spain\n- New York City, USA\n- Sydney, Australia\n\nBudget: $3000\nDuration: 2 weeks",
    createdAt: new Date("2025-04-28"),
    updatedAt: new Date("2025-04-30"),
    color: "bg-teal-400",
    textColor: "text-teal-900",
  },
]

// Note color options with enhanced styling
const noteColors = [
  { color: "bg-blue-400", ring: "ring-blue-500", name: "Blue", gradient: "from-blue-400 to-blue-300" },
  { color: "bg-green-400", ring: "ring-green-500", name: "Green", gradient: "from-green-400 to-green-300" },
  { color: "bg-yellow-400", ring: "ring-yellow-500", name: "Yellow", gradient: "from-yellow-400 to-yellow-300" },
  { color: "bg-orange-400", ring: "ring-orange-500", name: "Orange", gradient: "from-orange-400 to-orange-300" },
  { color: "bg-teal-400", ring: "ring-teal-500", name: "Teal", gradient: "from-teal-400 to-teal-300" },
  { color: "bg-purple-400", ring: "ring-purple-500", name: "Purple", gradient: "from-purple-400 to-purple-300" },
  { color: "bg-pink-400", ring: "ring-pink-500", name: "Pink", gradient: "from-pink-400 to-pink-300" },
]

// Define a Note type matching notes_data
interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  color: string;
  textColor: string;
}

// Confirmation Dialog Component
export const ConfirmationDialog = ({ show, onConfirm, onClose }: { show: boolean; onConfirm: () => void; onClose: () => void }) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div
        className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-red-500 p-4 text-white">
          <h2 className="text-xl font-semibold">Delete Note</h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
              <Trash2 className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-center text-gray-700">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                onConfirm()
                onClose()
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
type NoteCardProps = {
  note: Note
  isSelected: boolean
  onSelect: (note: Note) => void
  onDelete: (note: Note) => void
  onShowDetail: (note: Note) => void
}

// Note Card Component
const NoteCard = ({ note, isSelected, onSelect, onDelete, onShowDetail }: NoteCardProps) => {
  const getGradient = (color: string) => {
    const colorMap: Record<string, string> = {
      "bg-blue-400": "from-blue-400 to-blue-300",
      "bg-green-400": "from-green-400 to-green-300",
      "bg-yellow-400": "from-yellow-400 to-yellow-300",
      "bg-orange-400": "from-orange-400 to-orange-300",
      "bg-teal-400": "from-teal-400 to-teal-300",
      "bg-purple-400": "from-purple-400 to-purple-300",
      "bg-pink-400": "from-pink-400 to-pink-300",
    }
    return colorMap[color] || "from-gray-400 to-gray-300"
  }

  return (
    <div
      className={`relative group rounded-xl overflow-hidden transition-all duration-300 ${isSelected ? "ring-2 ring-offset-2 ring-blue-500 shadow-md" : "shadow-sm hover:shadow-md"
        }`}
      onClick={() => {
        onSelect(note)
        onShowDetail(note)
      }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradient(
          note.color,
        )} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
      ></div>
      <div className="relative p-4 h-full flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-sm text-gray-900 truncate max-w-[80%]">{note.title}</h3>
          <button
            className="text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-red-600 p-1 rounded-full hover:bg-white hover:bg-opacity-30"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(note)
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
        <p className="text-xs text-gray-700 line-clamp-3 mb-2 flex-grow">{note.content}</p>
        <div className="flex items-center text-xs text-gray-700 mt-auto">
          <CalendarDays size={12} className="mr-1" />
          {formatDate(note.createdAt)}
        </div>
      </div>
    </div>
  )
}

// Main Notes List Component
const NotesList = () => {
  const { data, isLoading, error } = useFetchNote()
  const notesData = data?.data?.data || []
  const queryClient = useQueryClient()
  const [notes, setNotes] = useState<Note[]>(notesData)
  const [selectedNote, setSelectedNote] = useState<Note | null>(notesData)
  const [selectedColor, setSelectedColor] = useState<number>(0)
  const [showDelete, setShowDelete] = useState(false)
  const [addNote, setAddNote] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null)
  const [editedContent, setEditedContent] = useState("")
  const [editedTitle, setEditedTitle] = useState("")
  const [mounted, setMounted] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [showNoteDetail, setShowNoteDetail] = useState(false)
  const [noteDetailNote, setNoteDetailNote] = useState<Note | null>(null)

  useEffect(() => {
    setMounted(true)
    // Add CSS for custom scrollbar and animations
    const style = document.createElement("style")
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.2s ease-out;
      }
      .animate-scaleIn {
        animation: scaleIn 0.3s ease-out;
      }
      .note-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    if (selectedNote) {
      setEditedContent(selectedNote.content)
      setEditedTitle(selectedNote.title)
      setSelectedColor(noteColors.findIndex((c) => c.color === selectedNote.color) || 0)
    }
  }, [selectedNote])

  useEffect(() => {
    if (addNote && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [addNote])

  //mutation create note
  const { mutate: createNote } = useMutation({
    mutationFn: (data: any) => NoteService.createNote(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      toast.success("Note created successfully")
    },
    onError: (error: any) => {
      console.log(error)
      toast.error("Failed to create note")
    }
    ,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    }
  })

  //mutation update note
  const { mutate: updateNote } = useMutation({
    mutationFn: (data: any) => NoteService.updateNote(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      toast.success("Note updated successfully")
    },
    onError: (error: any) => {
      console.log(error)
      toast.error("Failed to update note")
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    }
  })


  //mutation delete note
  const { mutate: deleteNote } = useMutation({
    mutationFn: (id: any) => NoteService.deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      toast.success("Note deleted successfully")
      //close modal
      setShowDelete(false)
    },
    onError: (error: any) => {
      console.log(error)
      toast.error("Failed to delete note")
    }
  })

  //get note detail 
  const { data: noteDetail, isLoading: noteDetailLoading, error: noteDetailError } = useQuery({
    queryKey: ["noteDetail", noteDetailNote?.id],
    queryFn: () => NoteService.getNoteById(noteDetailNote!.id),
    enabled: typeof noteDetailNote?.id === "number" && showNoteDetail,
  })

  const handleDeleteNote = () => {
    deleteNote(noteToDelete)
    setNoteToDelete(null)
  }
  console.log("noteToDelete", noteToDelete)

  const handleNoteSelect = (note: Note) => {
    console.log("note", note.id)
    setSelectedNote(note)
    setAddNote(false)
    setEditedContent(note.content)
    setEditedTitle(note.title)
    setNoteToDelete(note.id)
  }

  const handleAddNote = () => {
    setAddNote(true)
    setSelectedNote(null)
    setEditedContent("")
    setEditedTitle("")
    setSelectedColor(0)
  }

  const handleSaveNote = () => {
    if (addNote) {
      const newNote = {
        id: Date.now(),
        title: editedTitle || "Untitled Note",
        content: editedContent,
        createdAt: new Date(),
        updatedAt: new Date(),
        color: noteColors[selectedColor].color,
        textColor: `text-${noteColors[selectedColor].color.split("-")[1]}-900`,
      }
      setNotes([newNote, ...notes]) 
      setSelectedNote(newNote)
      setAddNote(false)
      createNote(newNote)
    } else if (selectedNote) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNote.id
          ? {
            ...note,
            title: editedTitle,
            content: editedContent,
            updatedAt: new Date(),
            color: noteColors[selectedColor].color,
            textColor: `text-${noteColors[selectedColor].color.split("-")[1]}-900`,
          }
          : note,
      )
      setNotes(updatedNotes)
      // Find the updated note object
      const updatedNote = updatedNotes.find((note) => note.id === selectedNote.id)
      if (updatedNote) {
        updateNote(updatedNote)
        setSelectedNote(updatedNote)
      }
    }
  }

  // Show note detail modal
  const handleShowNoteDetail = (note: Note) => {
    setNoteDetailNote(note)
    setShowNoteDetail(true)
  }

  const filteredNotes = notes?.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!mounted) return null
  if (isLoading) return (
    <div className="bg-gray-50 max-h-screen overflow-auto">
      <div className="mx-auto p-4">
        <LandingSpinner />
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50 custom-scrollbar overflow-auto">
      <div className=" mx-auto p-4">
        {/* Header Section */}
        <div className="mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-teal-400 opacity-10 rounded-xl"></div>
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-teal-50 rounded-xl p-6 relative shadow-lg border border-white">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-5 translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 rounded-full opacity-5 -translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Notes
              </h1>
              <div className="text-gray-600 text-sm mb-4">Dashboard • Notes ({notes?.length})</div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-white flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-500 font-semibold">{notes?.length}</span>
                  </div>
                  <span className="text-gray-700">Total Notes</span>
                </div>
                <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg px-4 py-3 shadow-sm border border-white flex items-center">
                  <div className="w-20   flex items-center justify-center mr-3">
                    <span className="text-purple-500 font-semibold">
                      {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })},
                    </span>
                  </div>
                  <span className="text-gray-700">Today</span>
                </div>
              </div>
            </div>
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 ">
              <Image src={todo} alt="Notes illustration" width={150} height={150} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <span className="bg-gradient-to-r from-blue-500 to-purple-400 w-5 h-5 rounded-md mr-2"></span>
              My Notes
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <Button onClick={handleAddNote} className="relative group overflow-hidden" disabled={addNote}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                <span className="relative z-10 flex items-center justify-center text-white">
                  <Plus size={16} className="mr-1" />
                  New Note
                </span>
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Notes Grid */}
              <div className={`${selectedNote || addNote ? "w-full md:w-1/2 lg:w-2/3" : "w-full"}`}>
                {filteredNotes?.length > 0 ? (
                  <div className="note-grid">
                    {filteredNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        isSelected={Boolean(selectedNote && selectedNote.id === note.id)}
                        onSelect={handleNoteSelect}
                        onDelete={(note: Note) => {
                          setNoteToDelete(note.id)
                          setShowDelete(true)
                        }}
                        onShowDetail={handleShowNoteDetail}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
                    <p className="text-gray-500 mb-4">
                      {searchQuery ? "No notes match your search criteria" : "You haven't created any notes yet"}
                    </p>
                    <Button onClick={handleAddNote} className="relative group overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center text-white">
                        <Plus size={16} className="mr-1" />
                        Create your first note
                      </span>
                    </Button>
                  </div>
                )}
              </div>

              {/* Note Editor */}
              {(selectedNote || addNote) && (
                <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl p-6 border border-gray-200 animate-fadeIn">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">{addNote ? "Create New Note" : "Edit Note"}</h3>
                    <button
                      onClick={() => {
                        setAddNote(false)
                        if (!selectedNote && notes.length > 0) {
                          setSelectedNote(notes[0])
                        }
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="note-title" className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <Input
                        id="note-title"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        placeholder="Note title"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="note-content" className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <textarea
                        ref={textareaRef}
                        id="note-content"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        placeholder="Write your note here..."
                        className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 custom-scrollbar"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Note Color</label>
                      <div className="flex flex-wrap gap-3">
                        {noteColors.map((color, idx) => (
                          <button
                            key={color.color}
                            type="button"
                            className={`relative h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 ${selectedColor === idx ? "ring-2 ring-offset-2 " + color.ring : ""
                              }`}
                            onClick={() => setSelectedColor(idx)}
                            style={{
                              background: `linear-gradient(135deg, var(--${color.color.split("-")[1]}-400), var(--${color.color.split("-")[1]
                                }-300))`,
                            }}
                          >
                            {selectedColor === idx && <Check className="h-4 w-4 text-white" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setAddNote(false)
                          if (selectedNote) {
                            setEditedContent(selectedNote.content)
                            setEditedTitle(selectedNote.title)
                          }
                        }}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleSaveNote} className="relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-400 to-blue-500 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-500 group-hover:to-blue-600 transition-all duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center text-white">
                          <Save className="mr-1 h-4 w-4" />
                          {addNote ? "Create Note" : "Save Changes"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        show={showDelete}
        onConfirm={handleDeleteNote}
        onClose={() => setShowDelete(false)}
      />

      <NoteDetailModal
        data={noteDetail}
        onClose={() => setShowNoteDetail(false)}
        onDelete={handleDeleteNote}
        open={showNoteDetail}
      />
    </div>
  )
}

export default NotesList
