import { addAthlete } from "@/lib/firebase/service";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const athleteData = {
      fullname: data.fullname,
      placeOfBirth: data.placeOfBirth,
      dob: data.dob,
      gender: data.gender,
      group: data.group,
    };

    const status = await addAthlete(data.id, athleteData);
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
