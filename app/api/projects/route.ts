import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'lib', 'data', 'projects.json');

// Helper function to read data
function readData() {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
}

// Helper function to write data
function writeData(data: any) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// GET - Fetch all projects
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const mode = searchParams.get('mode'); // 'developer' or 'designer'

        const data = readData();

        if (mode && (mode === 'developer' || mode === 'designer')) {
            return NextResponse.json(data[mode]);
        }

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mode, project } = body;

        if (!mode || !project) {
            return NextResponse.json(
                { error: 'Mode and project data are required' },
                { status: 400 }
            );
        }

        const data = readData();

        // Generate new ID
        const newId = mode === 'developer'
            ? `d${data.developer.length + 1}`
            : `${data.designer.length + 1}`;

        const newProject = {
            ...project,
            id: newId,
        };

        data[mode].push(newProject);
        writeData(data);

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}

// PUT - Update a project
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { mode, id, project } = body;

        if (!mode || !id || !project) {
            return NextResponse.json(
                { error: 'Mode, ID, and project data are required' },
                { status: 400 }
            );
        }

        const data = readData();
        const index = data[mode].findIndex((p: any) => p.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        data[mode][index] = { ...data[mode][index], ...project };
        writeData(data);

        return NextResponse.json(data[mode][index]);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        );
    }
}

// DELETE - Delete a project
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const mode = searchParams.get('mode');
        const id = searchParams.get('id');

        if (!mode || !id) {
            return NextResponse.json(
                { error: 'Mode and ID are required' },
                { status: 400 }
            );
        }

        const data = readData();
        const index = data[mode].findIndex((p: any) => p.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            );
        }

        data[mode].splice(index, 1);
        writeData(data);

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        );
    }
}
