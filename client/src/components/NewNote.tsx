import { NoteData, Tag } from "../App";
import { NoteForm } from "./NoteForm";
type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  avialableTags: Tag[]
}
export function NewNote({onSubmit, onAddTag, avialableTags}:NewNoteProps) {
    return(
      <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} avialableTags = {avialableTags}/>
      </>
    )

  }