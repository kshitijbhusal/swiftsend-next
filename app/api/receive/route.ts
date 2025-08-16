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
                messageCode: code
            }
        })

    // check the message in the DB if it exist with the crossponding messageCode

    return NextResponse.json({
        success: true,
        message: row?.message
    })

}