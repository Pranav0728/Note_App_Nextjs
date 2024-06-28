import { Schema ,model, models } from "mongoose";

const UserSchema = new Schema({
    email: { type: "string", required: true },
    username: { type: "string", required: true},
});
const User = models.User || model("User",UserSchema);
export default User;