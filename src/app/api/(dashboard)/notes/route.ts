import connect from "@/lib/dbConnect";
import Note from "@/lib/models/note";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
const ObjectId = require("mongoose").Types.ObjectId;


export const GET = async(request: Request)=>{
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        if(!userId){
            return new NextResponse(JSON.stringify({message:"User not found"}),{status: 404});
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"Invalid user"}),{status: 400});
        }
        await connect();
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message:"User not found"}),{status: 404});
        }
        const notes = await Note.find({
            user: new Types.ObjectId(userId)
        });
        return new NextResponse(JSON.stringify(notes),{status: 200});
    } catch (error) {
         return new NextResponse(JSON.stringify({message:error}))
    }
}

export const POST = async (request:Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");

        const {title, description} = await request.json();
        if(!userId){
            return new NextResponse(JSON.stringify({message:"User not found"}),{status: 404});
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"Invalid user"}),{status: 400});
        }
        await connect();
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message:"User not found"}),{status: 404});
        }
        const newNote = new Note({
            title,
            description,
            user: new Types.ObjectId(userId)
        });
        await newNote.save();
        return new NextResponse(JSON.stringify(newNote),{status: 200});

    } catch (error) {
        return new NextResponse(JSON.stringify(error),{status: 400});
    }
}

export const PATCH = async (request:Request) => {
    try {
        const body = await request.json();
        const {noteId, title, description} = body;
        const {searchParams} = new URL(request.url)
        const userId = searchParams.get("userId");

        if(!noteId){
            return new NextResponse(JSON.stringify({message:"Note not found"}),{status: 404});
        }
        if(!Types.ObjectId.isValid(noteId)){
            return new NextResponse(JSON.stringify({message:"Invalid note"}),{status: 400});
        }
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"Inavlid or missing user ID"}),{status: 400});
        }
        await connect();
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message:"User not found"}),{status: 404});
        }
        const updateNote = await Note.findByIdAndUpdate(noteId,{title,description},{new : true});
        return new NextResponse(JSON.stringify({message:updateNote}));
    } catch (error) {
        return new NextResponse(JSON.stringify({message:error})),{status:400};
    }
}   

export const DELETE = async (request:Request) => {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        const noteId = searchParams.get("noteId");
        if(!noteId || !Types.ObjectId.isValid(noteId)){
            return new NextResponse(JSON.stringify({message:"Note not found"}),{status: 404});
        }
        if(!userId || !Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({messsage: "User not found"}),{status: 404})
        }
        await connect();
        const user = await User.findById(userId);
        if(!user){
            return new NextResponse(JSON.stringify({message:"User not found"}),{status: 404});
        }
        const note = await Note.findOne({_id : noteId,user : userId});
        if(!note){
            return new NextResponse(JSON.stringify({message:"Note not found"}),{status: 404});
        }
        await Note.findByIdAndDelete(noteId);
        return new NextResponse(JSON.stringify({message:"Note deleted"}),{status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({message:error}),{status: 400});
    }
}