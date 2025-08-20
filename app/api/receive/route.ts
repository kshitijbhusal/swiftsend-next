import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code")

    const prisma = new PrismaClient()

    console.log(req)

    const row = await
        prisma.message.findFirst({
            where: {
                //@ts-expect-error: Fix it later
                messageCode: code
            }
        })

    // check the message in the DB if it exist with the crossponding messageCode
    if (!row) {
        return NextResponse.json({
            success: false,
            error: "Message code expired"
        });
    }
    return NextResponse.json({
        success: true,
        message: row.message,
        type: row.type
    })

}