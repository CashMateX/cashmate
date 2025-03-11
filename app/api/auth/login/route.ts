import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface LoginRequest {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: LoginRequest = await request.json();
        const { email, password } = body;

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
        }

        // Check if password is correct
        const password_check = await bcrypt.compare(password, user.password_hash);
        if (!password_check) {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 });
        }

        // Create JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({ token });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}