import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'lib', 'data', 'testimonials.json');

// Helper function to read data
function readData() {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
}

// Helper function to write data
function writeData(data: any) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// GET - Fetch all testimonials
export async function GET() {
    try {
        const data = readData();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch testimonials' },
            { status: 500 }
        );
    }
}

// POST - Create a new testimonial
export async function POST(request: NextRequest) {
    try {
        const testimonial = await request.json();

        const data = readData();

        // Generate new ID
        const newId = `${data.length + 1}`;
        const newTestimonial = {
            ...testimonial,
            id: newId,
        };

        data.push(newTestimonial);
        writeData(data);

        return NextResponse.json(newTestimonial, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create testimonial' },
            { status: 500 }
        );
    }
}

// PUT - Update a testimonial
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, testimonial } = body;

        if (!id || !testimonial) {
            return NextResponse.json(
                { error: 'ID and testimonial data are required' },
                { status: 400 }
            );
        }

        const data = readData();
        const index = data.findIndex((t: any) => t.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Testimonial not found' },
                { status: 404 }
            );
        }

        data[index] = { ...data[index], ...testimonial };
        writeData(data);

        return NextResponse.json(data[index]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update testimonial' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a testimonial
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
        const index = data.findIndex((t: any) => t.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Testimonial not found' },
                { status: 404 }
            );
        }

        data.splice(index, 1);
        writeData(data);

        return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete testimonial' },
            { status: 500 }
        );
    }
}
