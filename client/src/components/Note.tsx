import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "./Notelayout";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type noteProps = {
  onDelete: (id: string) => void;
};

export function Note({onDelete}:noteProps) {
  const note = useNote();
  const navigate = useNavigate()

  return (
    <>
      <Row className="align-item-center mb-4 ">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="mt-1 flex-wrap">
              {note.tags.map((tag) => (
                <Badge key={tag.id}>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>

            <Button variant="outline-danger" type="button" onClick={()=>{
              onDelete(note.id)
              navigate("/")
            }}>
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary" type="button">
                Back
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div className="markdown">
      <ReactMarkdown>{note.body}</ReactMarkdown>
      </div>
      
    </>
  );
}
