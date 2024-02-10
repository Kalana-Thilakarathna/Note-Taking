import { NoteData, Tag } from "../App";
import { NoteForm } from "./NoteForm";
import { useNote } from "./Notelayout";
type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  avialableTags: Tag[];

};
export function EditNote({ onSubmit, onAddTag, avialableTags,}: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title = {note.title}
        tags={note.tags}
        body={note.body}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        avialableTags={avialableTags}
      />
    </>
  );
}
