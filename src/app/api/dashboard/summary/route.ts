import { NextResponse } from "next/server"; import { dashboardData } from "@/lib/intelligence";
export async function GET(){ return NextResponse.json(dashboardData()); }
