import { getData } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getData("teams");
    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
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
