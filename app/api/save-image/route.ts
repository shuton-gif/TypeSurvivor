import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get('content-type') || ''

        // Handle multipart form data (layered export)
        if (contentType.includes('multipart/form-data')) {
            const data = await request.formData()
            const filename: string = data.get('filename') as string || 'pixel-art'
            const constructionManual: string = data.get('construction_manual') as string || ''

            // Safe folder name
            const safeFolderName = filename.replace(/[^a-zA-Z0-9-_]/g, '-')
            const assetsDir = path.join(process.cwd(), 'public', 'assets', safeFolderName)

            // Create the subfolder
            await mkdir(assetsDir, { recursive: true })

            // Save the construction manual
            if (constructionManual) {
                const manualPath = path.join(assetsDir, 'construction_manual.json')
                await writeFile(manualPath, constructionManual, 'utf-8')
            }

            // Save each layer file using layer names from the construction manual
            const savedLayers: { name: string; path: string; url: string }[] = []

            // Parse the manual to get layer names for FormData keys
            const parsedManual = constructionManual ? JSON.parse(constructionManual) : { layers: [] }
            for (const layerInfo of parsedManual.layers) {
                const key = `layer_${layerInfo.name}`
                const layerFile = data.get(key) as File | null
                if (!layerFile) continue

                const bytes = await layerFile.arrayBuffer()
                const buffer = Buffer.from(bytes)

                const layerFilename = layerFile.name || `${key}.webp`
                const safeLayerFilename = layerFilename.replace(/[^a-zA-Z0-9-_.]/g, '-')
                const layerPath = path.join(assetsDir, safeLayerFilename)

                await writeFile(layerPath, buffer)

                const publicUrl = `/assets/${safeFolderName}/${safeLayerFilename}`
                savedLayers.push({
                    name: key,
                    path: layerPath,
                    url: publicUrl,
                })
            }

            return NextResponse.json({
                message: 'Layers saved successfully',
                folder: `/assets/${safeFolderName}/`,
                manual: `/assets/${safeFolderName}/construction_manual.json`,
                layers: savedLayers,
            })
        }

        // Fallback: single file upload (legacy support)
        const data = await request.formData()
        const file: File | null = data.get('file') as unknown as File
        const filename: string = data.get('filename') as string || 'pixel-art'

        if (!file) {
            return NextResponse.json({ error: 'No file received' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const assetsDir = path.join(process.cwd(), 'public', 'assets')
        await mkdir(assetsDir, { recursive: true })

        const safeFilename = filename.replace(/[^a-zA-Z0-9-_]/g, '-')
        const safeFilePath = path.join(assetsDir, `${safeFilename}.webp`)

        await writeFile(safeFilePath, buffer)

        const publicPath = `/assets/${safeFilename}.webp`

        return NextResponse.json({
            message: 'File saved successfully',
            path: safeFilePath,
            url: publicPath,
        })
    } catch (error) {
        console.error('Error saving file:', error)
        return NextResponse.json(
            { error: 'Failed to save file' },
            { status: 500 }
        )
    }
}