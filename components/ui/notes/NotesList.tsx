import NotesSvg from '@/components/shared/icon/NotesSvg';
import PopUpConfirmation from '@/components/shared/ui/PopUpConfirm';
import { dateFormat } from '@/utils/dateformat';
import { ConfirmationType } from '@/utils/enum';
import { Delete, DeleteIcon, Plus, Save, Trash, Trash2 } from 'lucide-react';
import React from 'react'

const notes_data = [
  {
    id: 1,
    title: 'Note 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non urna euismod, fermentum nulla a, tincidunt ex.',
    createdAt: new Date(),
    updatedAt: new Date(),
    color: 'bg-yellow-400',
  },
  {
    id: 2,
    title: 'Note 2',
    content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    createdAt: new Date(),
    updatedAt: new Date(),
    color: 'bg-green-400',
  },
  {
    id: 3,
    title: 'Note 3',
    content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
    createdAt: new Date(),
    updatedAt: new Date(),
    color: 'bg-teal-400',
  },
  {
    id: 4,
    title: 'Note 4',
    content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    createdAt: new Date(),
    updatedAt: new Date(),
    color: 'bg-orange-400',
  },
  {
    id: 5,
    title: 'Note 5',
    content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    createdAt: new Date(),
    updatedAt: new Date(),
    color: 'bg-blue-50',
  },
];

const noteColors = [
  { color: 'bg-blue-500', ring: 'ring-blue-500' },
  { color: 'bg-orange-400', ring: 'ring-orange-400' },
  { color: 'bg-yellow-400', ring: 'ring-yellow-400' },
  { color: 'bg-green-400', ring: 'ring-green-400' },
  { color: 'bg-teal-400', ring: 'ring-teal-400' },
];

const NotesList = () => {
  const [selectedNote, setSelectedNote] = React.useState(notes_data[0])
  const [selectedColor, setSelectedColor] = React.useState<number>(0)
  const [collapsed, setCollapsed] = React.useState(false)
  const [showDelete, setShowDelete] = React.useState(false)
  const [addNote, setAddNote] = React.useState(false)

  const handleDeleteNote = () => {
    // Logic to delete the selected note
    alert('Deleted note successfully')
    setShowDelete(false)
  }

  const handleNoteSelect = (note: any) => {
    setSelectedNote(note)
    setAddNote(false)
  }

  const handleAddNote = () => {
    setAddNote(true)
    setSelectedNote(notes_data[0])
  }

  //count notes
  const countNotes = () => {
    return notes_data.length
  }

  return (
    <div className="bg-gray-50 h-100 scroll-auto">
      <div className="mx-auto ">
        <div className="mb-6 bg-[#e7edff] h-[130px] p-3 rounded-xl flex flex-col justify-between relative shadow">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Notes</h1>
            <div className="text-gray-400 text-sm mt-1">Dashboard • Notes {countNotes()}</div>
          </div>
          <div className="absolute right-3 bottom-1">
            <NotesSvg width={120} height={120} />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow flex overflow-hidden">
          {/* Sidebar */}
          <div className={`transition-all duration-300 ${collapsed ? 'none' : 'w-80 p-6 border-r border-r-gray-200'}  bg-white  relative`}>
            {!collapsed && (
              <>
                <div className="mb-4">
                  <div className="relative">
                    <input type="text" placeholder="Search Notes" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-200" />
                    <span className="absolute left-3 top-2.5 text-gray-400">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-2-2" /></svg>
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-400 mb-2">All Notes</div>
                <div className="space-y-2">
                  {notes_data.map((note: any) => (
                    <div
                      key={note.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg  ${note.color} ${note.textColor} ${selectedNote.id === note.id ? 'ring-2 ring-purple-400' : ''}`}
                      onClick={() => handleNoteSelect(note)}
                    >
                      <div>
                        <div className="font-medium text-sm truncate w-40">{note.title}</div>
                        <div className="text-xs text-gray-500">
                          {dateFormat(note.createdAt)}
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setShowDelete(true)}>
                        <Trash2 color='red' width={15} height={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex items-center mb-4 ">
              <button className="mr-4 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
              >
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>

              {
                addNote || selectedNote ? (
                  <>
                    <div className="ml-auto flex gap-2 justify-end">
                      <button className="inline-flex px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 cursor-pointer" onClick={() => {
                        setAddNote(false)
                         
                      }}>
                        Cancel
                      </button>
                      <button className="inline-flex px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 items-center gap-2 cursor-pointer">
                        Save <Save className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="ml-auto inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer"
                    onClick={handleAddNote}
                  >
                    Add <Plus width={15} height={15} />
                  </button>
                )
              }

            </div>
            <hr className='mb-4 border-gray-200' />

            <div className='mb-4 '>
              <h2 className="text-lg font-semibold">
                {
                  addNote ? 'Add New Note' : selectedNote ? "Edit Note" : "Select a Note"
                }
              </h2>
            </div>
            <textarea
              className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 mb-6"
              value={addNote ? '' : selectedNote?.content || ''}
              placeholder="Type your note here..."
              onChange={(e) => {
                if (!addNote && selectedNote) {
                  setSelectedNote({ ...selectedNote, content: e.target.value });
                }
                e.target.value
              }}
            />
            <div>
              <div className="font-medium mb-2">Change Note Color</div>
              <div className="flex space-x-4">
                {noteColors.map((c: { color: string, ring: string }, idx: number) => (
                  <button
                    key={c.color}
                    value={c.color}
                    className={`relative h-6 w-6 rounded-full flex items-center justify-center cursor-pointer ${c.color} ${selectedColor === idx ? c.ring + ' ring-2' : ''}`}
                    onClick={() => setSelectedColor(idx)}
                  >
                    {selectedColor === idx && (
                      <svg
                        className="absolute text-white w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUpConfirmation show={showDelete}
        type={ConfirmationType.DELETE}
        onConfirm={handleDeleteNote}
        onClose={() => setShowDelete(false)} />
    </div>
  );
}

export default NotesList