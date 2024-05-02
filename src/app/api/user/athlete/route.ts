import { addAthlete, deleteAthleteById, deleteEventAthleteById } from "@/lib/firebase/service";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    data._id = uuidv4();
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded && decoded.role === "user") {
      const status = await addAthlete("users", decoded.id, data);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Add athlete successfully",
            data,
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Add athlete failed",
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

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded && decoded.role === "user") {
      const statusAthlete = await deleteAthleteById(decoded.id, data.athleteId);
      const statusEventAthlete = await deleteEventAthleteById(data.eventId, data.athleteId);

      if (statusAthlete && statusEventAthlete) {
        return NextResponse.json(
          {
            success: true,
            message: "Delete athlete successfully",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Delete athlete failed",
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
