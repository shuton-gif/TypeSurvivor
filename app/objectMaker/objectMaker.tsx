'use client'
import { useState } from "react"
import { ColorSetter } from "./components/ColorSetter"
import { ColorAdder } from "./components/ColorAdder"
import { LayerPanel } from "./components/LayerPanel"
import { PixelGrid } from "./components/PixelGrid"
import { WebPConverter, downloadPixelArt, convertPixelGridToWebP, savePixelArtToAssets, ConversionOptions } from "./components/WebPConverter"

type Pixel = {
    isPainted?: boolean
    color: string,
    points?: { x: number, y: number }
}

type Editor = {
    gridX: number
    gridY: number
    onGoing: Pixel[][]
    final?: Pixel[]

    brushColor: string
    layer: string[]
    currentLayer: number
}

export function ObjectMaker() {
    const createGrid = (height: number, width: number): Pixel[][] => {
        return Array.from({ length: height }, () => Array(width).fill({
            isPainted: false,
            color: 'transparent',
        }))
    }

    const [editor, setEditor] = useState<Editor>({
        gridX: 16,
        gridY: 16,
        onGoing: createGrid(16, 16),

        brushColor: 'white',
        layer: ['base'],
        currentLayer: 0
    })

    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [availableColors, setAvailableColors] = useState<string[]>(['red', 'blue', 'yellow', 'transparent'])

    const handleColorSelect = (color: string) => {
        setEditor({
            ...editor,
            brushColor: color
        })
    }

    const handleAddLayer = (layerName: string) => {
        setEditor({
            ...editor,
            layer: [...editor.layer, layerName]
        })
    }

    const handleSelectLayer = (layerId: number) => {
        setEditor({
            ...editor,
            currentLayer: layerId
        })
    }

    const handlePixelClick = (rowIndex: number, colIndex: number) => {
        console.log(`Grid clicked - x: ${colIndex}, y: ${rowIndex}, color: ${editor.brushColor}`)
        setEditor(prev => ({
            ...prev,
            onGoing: prev.onGoing.map((row, r) =>
                row.map((cell, c) => (r == rowIndex && c == colIndex) ? {
                    ...cell,
                    color: editor.brushColor,
                    isPainted: true
                } : cell)
            )
        }))
    }

    const handleGridResize = (height: number, width: number) => {
        setEditor(prev => ({
            ...prev,
            gridX: height,
            gridY: width,
            onGoing: createGrid(height, width)
        }))
        // Clear preview when grid is resized
        setPreviewImage(null)
    }

    const handleClearGrid = () => {
        setEditor(prev => ({
            ...prev,
            onGoing: prev.onGoing.map(row => 
                row.map(pixel => ({
                    ...pixel,
                    color: 'transparent',
                    isPainted: false
                }))
            )
        }))
        // Clear preview when grid is cleared
        setPreviewImage(null)
    }

    const handleColorAdder = (newColor: string) => {
        // Check if color already exists
        if (!availableColors.includes(newColor)) {
            setAvailableColors(prev => [...prev, newColor])
            console.log(`Added new color: ${newColor}`)
        } else {
            alert('Color already exists in the palette!')
        }
    }

    // WebP Export Handler - Direct download
    const handleExportImage = async (gridData: Pixel[][], filename = 'pixel-art') => {
        try {
            // Convert ObjectMaker Pixel type to PixelGrid Pixel type
            const convertedGrid = gridData.map(row => 
                row.map(pixel => ({
                    isPainted: pixel.isPainted ?? false,
                    color: pixel.color
                }))
            )

            const options: ConversionOptions = {
                scale: 10,    // 10x upscale for crisp pixels
                quality: 0.9, // High quality
                format: 'webp'
            }

            await downloadPixelArt(convertedGrid, filename, options)
            console.log(`Successfully exported ${filename}.webp`)
        } catch (error) {
            console.error('Export failed:', error)
            alert('Failed to export image. Please try again.')
        }
    }

    // Save to assets directory handler
    const handleSaveToAssets = async (filename = 'pixel-art') => {
        try {
            const convertedGrid = editor.onGoing.map(row => 
                row.map(pixel => ({
                    isPainted: pixel.isPainted ?? false,
                    color: pixel.color
                }))
            )

            const options: ConversionOptions = {
                scale: 10,    // 10x upscale for crisp pixels
                quality: 0.9, // High quality
                format: 'webp'
            }

            const result = await savePixelArtToAssets(convertedGrid, filename, options)
            console.log(`Successfully saved to: ${result.path}`)
            console.log(`Available at URL: ${result.url}`)
            alert(`Image saved to assets directory!\nPath: ${result.path}\nURL: ${result.url}`)
        } catch (error) {
            console.error('Save to assets failed:', error)
            alert('Failed to save to assets directory. Please try again.')
        }
    }

    // Generate preview image
    const generatePreview = async () => {
        try {
            const convertedGrid = editor.onGoing.map(row => 
                row.map(pixel => ({
                    isPainted: pixel.isPainted ?? false,
                    color: pixel.color
                }))
            )

            const options: ConversionOptions = {
                scale: 5,     // Smaller scale for preview
                quality: 0.8,
                format: 'webp'
            }

            const result = await convertPixelGridToWebP(convertedGrid, options)
            setPreviewImage(result.dataURL)
        } catch (error) {
            console.error('Preview generation failed:', error)
        }
    }

    // Export all layers as separate images
    const exportAllLayers = async () => {
        try {
            const converter = new WebPConverter()
            const layerData = editor.layer.map(layerName => ({
                name: layerName,
                gridData: editor.onGoing.map(row => 
                    row.map(pixel => ({
                        isPainted: pixel.isPainted ?? false,
                        color: pixel.color
                    }))
                )
            }))

            const options: ConversionOptions = {
                scale: 10,
                quality: 0.9,
                format: 'webp'
            }

            await converter.downloadLayers(layerData, 'pixel-art-layers', options)
            converter.dispose()
            console.log('Successfully exported all layers')
        } catch (error) {
            console.error('Layer export failed:', error)
            alert('Failed to export layers. Please try again.')
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <LayerPanel
                    layers={editor.layer}
                    activeLayerId={editor.currentLayer}
                    onAddLayer={handleAddLayer}
                    onSelectLayer={handleSelectLayer}
                />
                <PixelGrid
                    gridData={editor.onGoing}
                    onPixelClick={handlePixelClick}
                    onGridResize={handleGridResize}
                    onExportImage={handleExportImage}
                    onClearGrid={handleClearGrid}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                        <h4 style={{ margin: '0 0 10px 0' }}>Tools</h4>
                        <ColorSetter
                            key="eraser"
                            color="transparent"
                            isActive={editor.brushColor === 'transparent'}
                            isEraser={true}
                            onSelect={handleColorSelect}
                        />
                        
                        <h4 style={{ margin: '10px 0 10px 0' }}>Colors</h4>
                        {availableColors.filter(color => color !== 'transparent').map((color) => (
                            <ColorSetter
                                key={color}
                                color={color}
                                isActive={editor.brushColor === color}
                                onSelect={handleColorSelect}
                            />
                        ))}
                        <div style={{ marginTop: '10px' }}>
                            <ColorAdder onAdd={handleColorAdder} />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <h4 style={{ margin: '0 0 10px 0' }}>Export Options</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button onClick={generatePreview} style={{ padding: '8px', fontSize: '12px' }}>
                                Generate Preview
                            </button>
                            <button onClick={() => {
                                // Get filename from the PixelGrid component's state
                                // For now, prompt user for filename when using this button
                                const name = prompt('Enter filename for assets:');
                                if (name && name.trim()) {
                                    handleSaveToAssets(name.trim());
                                } else if (name === '') {
                                    alert('Please enter a filename');
                                }
                            }} style={{ padding: '8px', fontSize: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
                                Save to Assets
                            </button>
                            <button onClick={exportAllLayers} style={{ padding: '8px', fontSize: '12px' }}>
                                Export All Layers
                            </button>
                        </div>
                    </div>

                    {previewImage && (
                        <div style={{ marginTop: '20px' }}>
                            <h4 style={{ margin: '0 0 10px 0' }}>Preview</h4>
                            <img 
                                src={previewImage} 
                                alt="Preview" 
                                style={{ 
                                    border: '1px solid #ccc', 
                                    maxWidth: '200px',
                                    imageRendering: 'pixelated'
                                }} 
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}