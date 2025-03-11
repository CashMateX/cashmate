import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';

const prisma = new PrismaClient();

const RegisterSchema = z.object({
    email: z.string().email("Invalid email format"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});

interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: RegisterRequest = await request.json();

        const result = RegisterSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: result.error.errors }, { status: 400 });
        }

        const { email, username, password } = result.data;

        // Check if email is already in use
        const emailCheck = await prisma.user.findUnique({
            where: { email },
        });
        if (emailCheck) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        // Check if username is already in use
        const usernameCheck = await prisma.user.findUnique({
            where: { username },
        });
        if (usernameCheck) {
            return NextResponse.json({ error: 'Username already in use' }, { status: 400 });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Check if users exist, else give admin role
        const users = await prisma.user.findMany();
        const role = users.length === 0 ? 'admin' : 'user';

        // Create user
        await prisma.user.create({
            data: {
                email,
                username,
                password_hash: passwordHash,
                role,
            },
        });

        return NextResponse.json({ message: 'User created' }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}