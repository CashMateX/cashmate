import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";

const prisma = new PrismaClient();

const ChangePasswordSchema = z.object({
    email: z.string().email("Invalid email format"),
    old_password: z.string().min(8, "Password must be at least 8 characters long"),
    new_password: z.string().min(8, "Password must be at least 8 characters long"),
});

interface ChangePasswordRequest {
    email: string;
    old_password: string;
    new_password: string;
}

export async function POST(request: NextRequest) {
    try{
        const body: ChangePasswordRequest = await request.json();
        const { email, old_password, new_password } = body;

        const result = ChangePasswordSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: result.error.errors }, { status: 400 });
        }

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
        }

        // Check if old password is correct
        const passwordCheck = await bcrypt.compare(old_password, user.password_hash);
        if (!passwordCheck) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        // Hash new password
        const newPasswordHash = await bcrypt.hash(new_password, 10);

        // Update password
        await prisma.user.update({
            where: { email },
            data: {
                password_hash: newPasswordHash,
            },
        });

        return NextResponse.json({ message: 'Password changed'});
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}