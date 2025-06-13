import { redis } from "@/app/lib/redis";
import { NextResponse } from "next/server";

export async function GET() {
    await redis.set('hello', 'world');
    const value = await redis.get('hello');
    return NextResponse.json({ value });
 }