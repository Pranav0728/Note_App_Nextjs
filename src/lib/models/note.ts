import { Schema ,model, models } from "mongoose";

const NoteSchema = new Schema({
    title:{required: true , type: String},
    description:{required: true , type: String},
    user:{type:Schema.Types.ObjectId, ref:"User"}
});

const Note = models.Note || model("Note", NoteSchema);

export default Note;