import { originalDB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  readDB();
  const body = await request.json();
  const { roomId } = body;
  const foundRoom = originalDB.rooms.find((r) => r.roomId === roomId);
  if(!foundRoom){
    return NextResponse.json(
        {
          ok: false,
          message: `Room is not found`,
        },
        { status: 404 }
      );
    };
  return NextResponse.json({
    ok: true,
    onmessage,
  })
}
export const POST = async (request: NextRequest) => {
  readDB();
  const body = await request.json();
  const { roomId } = body;
  const foundRoomID = originalDB.rooms.find(
    (r)=> r.roomId===roomId
  );
  if(!foundRoomID){
    return NextResponse.json(
     {
       ok: false,
       message: `Room is not found`,
     },
     { status: 404 }
   );
  }
 

  const messageId = nanoid();
    originalDB.messages.push({
      messageId,
      messageText: body.messageText, 
      roomId: ""
    });

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request: NextRequest) => {
  const payload = checkToken();
  if(!payload){
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );
  }


  readDB();
  const body = await request.json();
  const message = body;
  const foundMessage = originalDB.messages.find(
    (m) => m.messageId === message.messageId);
  if(!foundMessage){
    return NextResponse.json(
      {
        ok: false,
        message: "Message is not found",
      },
      { status: 404 }
    );
  }
 

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
