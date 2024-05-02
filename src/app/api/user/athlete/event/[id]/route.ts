import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { addAthlete, getDataById, updateAthleteWithEvent } from "@/lib/firebase/service";

export async function POST(request: NextRequest) {
  try {
    const athlete = await request.json();
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const eventId: any = request.url.split("/").pop();

    if (decoded && decoded.role === "user") {
      const eventData: any = await getDataById("events", eventId);
      delete eventData.athletes;
      eventData._id = eventId;

      const statusAdd = await addAthlete("events", eventId, athlete);
      const statusUpdate = await updateAthleteWithEvent(decoded.id, athlete._id, eventData);

      if (statusAdd && statusUpdate) {
        return NextResponse.json(
          {
            success: true,
            message: `Add athlete to event successfully`,
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
