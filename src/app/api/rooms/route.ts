import { originalDB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const rooms = originalDB.rooms;
  const totalRooms = rooms.length;
  readDB();
  return NextResponse.json({
    ok: true,
    rooms: rooms, 
    totalRooms: totalRooms,
  });
};


export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if(!payload) {
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
  const { roomName: newRoomName } = body;
  const foundRoom = originalDB.rooms.find((x)=>x.roomName === roomName);
    if(foundRoom){
    return NextResponse.json({
      ok: false,
      message: `Room ${foundRoom.roomName} already exists`,
      },{status:400})
    }

  const roomId = nanoid();
  const roomName = nanoid();
  originalDB.rooms.push({
    roomId,
    roomName
  });
 
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json(
    {
      ok: true,
      roomId,
      message: `Room ${roomName} has been created`,
    }
  );
};

