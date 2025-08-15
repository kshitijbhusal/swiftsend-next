import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(req: NextRequest) {
    const prisma = new PrismaClient()

    const body = await req.json();
    const message = body.message



    let messageCode = ""
    const char = "A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6"

    for (let i = 0; i < 4; i++) {
        messageCode = messageCode + char[Math.floor(Math.random() * 9)]

    }

    await prisma.message.create({
        data: {
            messageCode: messageCode,
            message: message
        }
    })




    return NextResponse.json({
        success: true,
        messageCode
    })

}