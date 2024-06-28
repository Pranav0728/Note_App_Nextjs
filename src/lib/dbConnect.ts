import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
export const connect = async () => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
        console.log("Connected")
        return;
    }
    if(connectionState === 2){
        console.log("Connecting")
        return;
    }
    try {
         mongoose.connect(MONGODB_URI!,{
            dbName: "RestAPI_Note",
            bufferCommands:false
         });
    } catch (error) {
        console.log("Error connecting")
    }
}
export default connect;