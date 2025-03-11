import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateAssetRequest {
    name: string;
    description: string;
    color: string;
    value: number;
    user_id: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: CreateAssetRequest = await request.json();
        const { name, description, color, value, user_id } = body;

        // Create asset
        const asset = await prisma.asset.create({
            data: {
                name: name,
                user_id: user_id,
                description: description,
                color: color,
                value: value,
            },
        });

        //  Get asset id
        const asset_id = asset.id;

        // Create transaction with starting value
        await prisma.transaction.create({
            data: {
                asset_id: asset_id,
                user_id: user_id,
                value: value,
                name: 'Initial value',
            },
        });


        return NextResponse.json({ message: 'Asset created' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}