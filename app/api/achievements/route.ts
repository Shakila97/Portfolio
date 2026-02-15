import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'lib', 'data', 'achievements.json');

// Helper function to read data
function readData() {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
}

// Helper function to write data
function writeData(data: any) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// GET - Fetch all achievements
export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch achievements' },
            { status: 500 }
        );
    }
}

// POST - Create a new achievement
export async function POST(request: NextRequest) {
    try {
        const achievement = await request.json();

        const data = readData();

        // Generate new ID
        const newId = `${data.length + 1}`;
        const newAchievement = {
            ...achievement,
            id: newId,
        };

        data.push(newAchievement);
        writeData(data);

        return NextResponse.json(newAchievement, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create achievement' },
            { status: 500 }
        );
    }
}

// PUT - Update an achievement
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, achievement } = body;

        if (!id || !achievement) {
            return NextResponse.json(
                { error: 'ID and achievement data are required' },
                { status: 400 }
            );
        }

        const data = readData();
        const index = data.findIndex((a: any) => a.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Achievement not found' },
                { status: 404 }
            );
        }

        data[index] = { ...data[index], ...achievement };
        writeData(data);

        return NextResponse.json(data[index]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update achievement' },
            { status: 500 }
        );
    }
}

// DELETE - Delete an achievement
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        const data = readData();
        const index = data.findIndex((a: any) => a.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Achievement not found' },
                { status: 404 }
            );
        }

        data.splice(index, 1);
        writeData(data);

        return NextResponse.json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete achievement' },
            { status: 500 }
        );
    }
}
