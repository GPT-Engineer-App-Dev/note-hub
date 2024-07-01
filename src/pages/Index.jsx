import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function Index() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddNote = () => {
    setNotes([...notes, currentNote]);
    setCurrentNote({ title: "", content: "" });
  };

  const handleEditNote = (index) => {
    setCurrentNote(notes[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    const updatedNotes = [...notes];
    updatedNotes[editIndex] = currentNote;
    setNotes(updatedNotes);
    setCurrentNote({ title: "", content: "" });
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div>
      <h1 className="text-3xl text-center">Notes App</h1>
      <div className="flex justify-end mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Note</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isEditing ? "Edit Note" : "Add Note"}</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Title"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              className="mb-2"
            />
            <Textarea
              placeholder="Content"
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              className="mb-2"
            />
            <Button onClick={isEditing ? handleSaveEdit : handleAddNote}>
              {isEditing ? "Save" : "Add"}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{note.content}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <Button variant="outline" onClick={() => handleEditNote(index)}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDeleteNote(index)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Index;