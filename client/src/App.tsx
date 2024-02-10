/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { NewNote } from "./components/NewNote";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { NoteList } from "./components/NoteList";
import { Notelayout } from "./components/Notelayout";
import { Note } from "./components/Note";
import { EditNote } from "./components/EditNote";
import useSystemTheme from './components/useSystemTheme';



export type RowNote = {
  id: string;
} & RowNoteData;

export type RowNoteData = {
  title: string;
  body: string;
  tagsIds: string[];
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  body: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  useSystemTheme();
  const [notes, setNotes] = useLocalStorage<RowNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);



  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function addTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  function onDelete(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function editTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label };
        } else {
          return tag;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id);
    });
  }

  function onEditeNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id == id) {
          return { ...note, ...data, tagsIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }


  return (


      <Container className='mt-4'>
 
        <Routes>
          <Route
            path="/"
            element={
              <NoteList
                avialableTags={tags}
                notes={notesWithTags}
                deleteTag={deleteTag}
                editTag={editTag}
              />
            }
          />
          <Route
            path="/new"
            element={
              <NewNote
                onSubmit={onCreateNote}
                onAddTag={addTag}
                avialableTags={tags}
              />
            }
          />
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/:id" element={<Notelayout notes={notesWithTags} />}>
            <Route index element={<Note onDelete={onDelete} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onEditeNote}
                  onAddTag={addTag}
                  avialableTags={tags}
                />
              }
            />
          </Route>
        </Routes>
      </Container>

  );
}

export default App;
