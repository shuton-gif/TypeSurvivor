import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
    try {
        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File
        const filename: string = data.get('filename') as string || 'pixel-art'
        
        if (!file) {
            return NextResponse.json({ error: 'No file received' }, { status: 400 })
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Define the target directory
        const assetsDir = path.join(process.cwd(), 'public', 'assets')

        // Ensure the filename is safe
        const safeFilename = filename.replace(/[^a-zA-Z0-9-_]/g, '-')
        const safeFilePath = path.join(assetsDir, `${safeFilename}.webp`)

        // Write the file
        await writeFile(safeFilePath, buffer)
        
        // Return the public URL path
        const publicPath = `/assets/${safeFilename}.webp`

        return NextResponse.json({ 
            message: 'File saved successfully',
            path: safeFilePath,
            url: publicPath
        })

    } catch (error) {
        console.error('Error saving file:', error)
        return NextResponse.json(
            { error: 'Failed to save file' },
            { status: 500 }
        )
    }
}