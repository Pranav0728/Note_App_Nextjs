import connect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
const ObjectId = require("mongoose").Types.ObjectId;

export const  GET = async ()=> {
    try {
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users),{status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify(error),{status: 500});
    }
}

export const POST = async (request:Request)=> {
    try {
        const body = await request.json()
        await connect();
        const newUser = new User(body);
        await newUser.save();
        return new NextResponse(JSON.stringify({message:"User is created", user : newUser}),{status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({message:"Error creating user", error}));
    }
}

export const PATCH = async (request:Request)=> {
    try {
        const body = await request.json()
        const {userId, newUsername}= body;
        await connect();
        if(!userId || !newUsername){
            return new NextResponse(JSON.stringify({message:"Error updating user"}),{status: 400});
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"Invalid user"}),{status: 400});
        }
        const UpdateUser = await User.findByIdAndUpdate({_id: new ObjectId(userId)},{username: newUsername},{new: true});
        if(!UpdateUser){
            return new NextResponse(JSON.stringify({message:"Error updating user"}),{status: 400});
        }
        return new NextResponse(JSON.stringify({message:"User is updated", user : UpdateUser}),{status: 200});
    1   } catch (error) {
        return new NextResponse(JSON.stringify({message:error}))
    }
}


export const DELETE = async (request:Request)=> {
    try {
        const {searchParams} = new URL(request.url);
        const userId = searchParams.get("userId");
        if(!userId){
            return new NextResponse(JSON.stringify({message:"User not found"}),{status: 400});
        }
        if(!Types.ObjectId.isValid(userId)){
            return new NextResponse(JSON.stringify({message:"Invalid user"}),{status: 400});
        }
        await connect();
        const deleteUser = await User.findByIdAndDelete({_id: new Types.ObjectId(userId)});

        if(!deleteUser){
            return new NextResponse(JSON.stringify({message:"Error deleting user"}),{status: 400});
        }
        return new NextResponse(JSON.stringify({message:"User deleted"}),{status: 200});
    } catch (error) {
        return new NextResponse(JSON.stringify({messsage:error}))
    }
}