import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { Note, Tag } from "../App";
import { useMemo, useState } from "react";
import styles from "./NoteList.module.css";

type NoteListProps = {
  avialableTags: Tag[];
  notes: Note[];
  editTag: (id: string, label: string) => void
  deleteTag: (id: string) => void
};
type simpleNote = {
  title: string;
  id: string;
  tags: Tag[];
};
type editTagModelProps = {
  avialableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  editTag: (id: string, label: string) => void
  deleteTag: (id: string) => void
};

export function NoteList({ avialableTags, notes, editTag, deleteTag}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)
    console.log("closing")};

  const FilterNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        title === "" ||
        (note.title.toLocaleLowerCase().includes(title.toLowerCase()) &&
          (selectedTags.length === 0 ||
            selectedTags.every((tag) =>
              note.tags.some((noteTag) => noteTag.id === tag.id)
            )))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setShow(true)
                console.log("openning");
              }}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form className="mb-3">
        <Row>
          <Col>
            <Form.Group controlId="tittle">
              <Form.Label><h4>Title</h4></Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label><h4>Tags</h4></Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={avialableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                //convert label, value(expect from the CreatetableReactSelect) to label, id(expect from the Tag[])
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={2} sm={3} lg={4} xl={5}>
        {FilterNotes.map((note) => (
          <Col key={note.id} className="mb-3">
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagModel avialableTags={avialableTags} show={show} handleClose={handleClose} deleteTag={deleteTag} editTag={editTag} />
    </>
  );
}

function NoteCard({ title, tags, id }: simpleNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none  ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function EditTagModel({ avialableTags, show, handleClose, deleteTag, editTag }: editTagModelProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {avialableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control type="text" value={tag.label} onChange={event=>{
                    editTag(tag.id, event.target.value)
                  }} />
                </Col>
                <Col xs="auto">
                  <Button variant="outline-danger"onClick={()=>{
                    deleteTag(tag.id)
                  }}>&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
