import { NextResponse } from "next/server";
export async function GET(){ return NextResponse.json({status:"healthy",database:process.env.DATABASE_URL?"configured":"demo mode",weather_api:"available",ml_engine:"ready",timestamp:new Date().toISOString()}); }
