import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { addAthlete, getDataById, updateAthleteWithEvent } from "@/lib/firebase/service";

export async function POST(request: NextRequest) {
  try {
    const dataUser = await request.json();
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const partnames = request.url.split("/");
    const eventId = partnames[partnames.length - 1];
    const index: any = partnames[partnames.length - 2];

    if (decoded && decoded.role === "user") {
      const dataEvent: any = await getDataById("events", eventId);
      delete dataEvent.athletes;

      const statusAdd = await addAthlete("events", eventId, dataUser);
      const statusUpdate = await updateAthleteWithEvent(decoded.id, index, dataEvent);
      if (statusAdd && statusUpdate) {
        return NextResponse.json(
          {
            success: true,
            message: `Add athlete to event successfully`,
            data: dataEvent,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: `Add athlete to event failed`,
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
