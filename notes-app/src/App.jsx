import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("General");
  const [search, setSearch] = useState("");


  // Save notes in localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  // Add note
  function addNote(e) {

    e.preventDefault();

    if (title.trim() === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title,
      body: body,
      tag: tag,
      pinned: false
    };

    setNotes([newNote, ...notes]);

    setTitle("");
    setBody("");
    setTag("General");
  }


  // Delete note
  function deleteNote(id) {

    setNotes(
      notes.filter(function(note) {
        return note.id !== id;
      })
    );

  }


  // Pin / Unpin
  function togglePin(id) {

    setNotes(
      notes.map(function(note) {

        if (note.id === id) {
          return {
            ...note,
            pinned: !note.pinned
          };
        }

        return note;

      })
    );

  }


  // Search
  const filteredNotes = notes.filter(function(note) {

    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.body.toLowerCase().includes(search.toLowerCase())
    );

  });


  return (

    <div className="container">

      <h1>📝 My Notes</h1>

      <form onSubmit={addNote}>

        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Note details..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>


        <div className="form-row">

          <select
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          >

            <option>General</option>
            <option>Study</option>
            <option>Health</option>
            <option>Work</option>

          </select>


          <button type="submit">
            + Add Note
          </button>

        </div>

      </form>


      <input
        className="search"
        type="text"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      <div className="notes">

        {filteredNotes.map(function(note) {

          return (

            <div
              className={`note ${note.pinned ? "pinned" : ""}`}
              key={note.id}
            >

              <div className="note-header">

                <h3>
                  {note.pinned && "📌 "}
                  {note.title}
                </h3>

                <span className="tag">
                  {note.tag}
                </span>

              </div>


              <p>
                {note.body}
              </p>


              <div className="actions">

                <button
                  onClick={() => togglePin(note.id)}
                  className="pin-button"
                >
                  {note.pinned ? "Unpin" : "Pin"}
                </button>


                <button
                  onClick={() => deleteNote(note.id)}
                  className="delete-button"
                >
                  Delete
                </button>

              </div>

            </div>

          );

        })}


        {filteredNotes.length === 0 && (

          <p className="no-notes">
            No notes found.
          </p>

        )}

      </div>

    </div>

  );
}

export default App;