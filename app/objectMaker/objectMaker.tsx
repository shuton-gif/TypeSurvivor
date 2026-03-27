'use client'
import { useState } from "react"
import { ColorSetter } from "./components/ColorSetter"
import { ColorAdder } from "./components/ColorAdder"
import { LayerPanel } from "./components/LayerPanel"
import { PixelGrid } from "./components/PixelGrid"
import { WebPConverter, downloadPixelArt, convertPixelGridToWebP, savePixelArtToAssets, ConversionOptions } from "./components/WebPConverter"

type Pixel = {
    isPainted: boolean
    color: string
    layer: Layer
    points?: { x: number, y: number }
}

type Layer = {
    name: string
    layerId: number
    identifierColor?: string
}

type Editor = {
    gridX: number
    gridY: number
    onGoing: Pixel[][][]  // 3D array: [row][col][layer]
    final?: Pixel[]

    brushColor: string
    layer: Layer[]
    currentLayer: number
    layerSeparation: boolean
}

export function ObjectMaker() {
    const createGrid = (height: number, width: number): Pixel[][][] => {
        const baseLayer: Layer = { name: 'base', layerId: 0, identifierColor: '#4CAF50' }
        return Array.from({ length: height }, () =>
            Array.from({ length: width }, () => [
                {
                    isPainted: false,
                    color: 'transparent',
                    layer: baseLayer
                }
            ])
        )
    }

    const [editor, setEditor] = useState<Editor>({
        gridX: 16,
        gridY: 16,
        onGoing: createGrid(16, 16),
        brushColor: 'white',
        layer: [{ name: 'base', layerId: 0, identifierColor: '#4CAF50' }],
        currentLayer: 0,
        layerSeparation: false
    })

    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [availableColors, setAvailableColors] = useState<string[]>(['red', 'blue', 'yellow', 'transparent'])

    const handleColorSelect = (color: string) => {
        setEditor({ ...editor, brushColor: color })
    }

    const handleAddLayer = (layer: Layer) => {
        const newLayer = { ...layer, layerId: editor.layer.length }
        setEditor(prev => ({
            ...prev,
            layer: [...prev.layer, newLayer]
        }))
    }

    const handleSelectLayer = (layerId: number, handleLayerSeparation?: (content: Layer[], layerColor: string) => void) => {
        setEditor(prev => ({
            ...prev,
            currentLayer: layerId,
            layerSeparation: true
        }))
        if (handleLayerSeparation) {
            handleLayerSeparation(editor.layer, editor.layer[layerId]?.identifierColor || '#ccc')
        }
    }

    const handleDeleteLayer = (layerId: number) => {
        setEditor(prev => {
            const deletedLayer = prev.layer[layerId]
            const newLayers = prev.layer.filter((_, index) => index !== layerId)

            let newCurrentLayer = prev.currentLayer
            if (prev.currentLayer >= layerId && prev.currentLayer > 0) {
                newCurrentLayer = prev.currentLayer - 1
            } else if (prev.currentLayer >= newLayers.length) {
                newCurrentLayer = Math.max(0, newLayers.length - 1)
            }

            // Remove deleted layer's pixels from grid
            const newGrid = prev.onGoing.map(row =>
                row.map(cellLayers =>
                    cellLayers.filter(p => p.layer.layerId !== deletedLayer.layerId)
                )
            )

            return {
                ...prev,
                layer: newLayers,
                currentLayer: newCurrentLayer,
                onGoing: newGrid
            }
        })
    }

    const handleReorderLayers = (fromIndex: number, toIndex: number) => {
        setEditor(prev => {
            const newLayers = [...prev.layer]
            const [movedLayer] = newLayers.splice(fromIndex, 1)
            newLayers.splice(toIndex, 0, movedLayer)

            // Update currentLayer to follow the active layer
            let newCurrentLayer = prev.currentLayer
            if (prev.currentLayer === fromIndex) {
                newCurrentLayer = toIndex
            } else if (fromIndex < prev.currentLayer && toIndex >= prev.currentLayer) {
                newCurrentLayer = prev.currentLayer - 1
            } else if (fromIndex > prev.currentLayer && toIndex <= prev.currentLayer) {
                newCurrentLayer = prev.currentLayer + 1
            }

            return {
                ...prev,
                layer: newLayers,
                currentLayer: newCurrentLayer
            }
        })
    }

    const handleSeparateLayer = (layerId: number, content: Layer[], layerColor: string) => {
        setEditor(prev => ({
            ...prev,
            layerSeparation: !prev.layerSeparation
        }))
    }

    const handlePixelClick = (rowIndex: number, colIndex: number) => {
        setEditor(prev => {
            const newGrid = prev.onGoing.map(row => row.map(cell => [...cell]))
            const cellLayers = newGrid[rowIndex][colIndex]
            const currentLayer = prev.layer[prev.currentLayer]
            const existingPixelIndex = cellLayers.findIndex(p => p.layer.layerId === currentLayer.layerId)

            if (existingPixelIndex >= 0) {
                cellLayers[existingPixelIndex] = {
                    ...cellLayers[existingPixelIndex],
                    color: prev.brushColor,
                    isPainted: prev.brushColor !== 'transparent'
                }
            } else {
                cellLayers.push({
                    isPainted: prev.brushColor !== 'transparent',
                    color: prev.brushColor,
                    layer: currentLayer
                })
            }

            newGrid[rowIndex][colIndex] = cellLayers
            return { ...prev, onGoing: newGrid }
        })
    }

    const handleGridResize = (height: number, width: number) => {
        setEditor(prev => ({
            ...prev,
            gridX: height,
            gridY: width,
            onGoing: createGrid(height, width)
        }))
        setPreviewImage(null)
    }

    const handleClearGrid = () => {
        setEditor(prev => ({
            ...prev,
            onGoing: prev.onGoing.map(row =>
                row.map(cellLayers =>
                    cellLayers.map(pixel => ({
                        ...pixel,
                        color: 'transparent',
                        isPainted: false
                    }))
                )
            )
        }))
        setPreviewImage(null)
    }

    const handleColorAdder = (newColor: string) => {
        if (!availableColors.includes(newColor)) {
            setAvailableColors(prev => [...prev, newColor])
        } else {
            alert('Color already exists in the palette!')
        }
    }

    // Helper: flatten a specific layer from 3D grid to 2D for WebP conversion
    const flattenLayerGrid = (targetLayer: Layer): { isPainted: boolean; color: string; layer: Layer }[][] => {
        return editor.onGoing.map(row =>
            row.map(cellLayers => {
                const layerPixel = cellLayers.find(p => p.layer.layerId === targetLayer.layerId)
                return {
                    isPainted: layerPixel?.isPainted ?? false,
                    color: layerPixel?.color ?? 'transparent',
                    layer: layerPixel?.layer ?? targetLayer
                }
            })
        )
    }

    // Helper: flatten all layers composited (topmost painted wins) for preview/single export
    const flattenCompositedGrid = (): { isPainted: boolean; color: string; layer: Layer }[][] => {
        return editor.onGoing.map(row =>
            row.map(cellLayers => {
                // Use layer order from editor.layer (last = highest z-index = front)
                for (let i = editor.layer.length - 1; i >= 0; i--) {
                    const layer = editor.layer[i]
                    const pixel = cellLayers.find(p => p.layer.layerId === layer.layerId)
                    if (pixel?.isPainted) {
                        return { isPainted: true, color: pixel.color, layer: pixel.layer }
                    }
                }
                return {
                    isPainted: false,
                    color: 'transparent',
                    layer: cellLayers[0]?.layer || { name: 'base', layerId: 0, identifierColor: '#4CAF50' }
                }
            })
        )
    }

    // Single composited WebP download
    const handleExportImage = async (gridData: Pixel[][][], filename = 'pixel-art') => {
        try {
            const convertedGrid = flattenCompositedGrid()
            const options: ConversionOptions = { scale: 10, quality: 0.9, format: 'webp' }
            await downloadPixelArt(convertedGrid, filename, options)
        } catch (error) {
            console.error('Export failed:', error)
            alert('Failed to export image. Please try again.')
        }
    }

    // Save all layers to assets with construction_manual.json
    const handleSaveToAssets = async (filename = 'pixel-art') => {
        try {
            const safeFilename = filename.replace(/[^a-zA-Z0-9-_]/g, '-')
            const options: ConversionOptions = { scale: 10, quality: 0.9, format: 'webp' }

            const formData = new FormData()
            formData.append('filename', safeFilename)

            // Build construction manual with CSS z-index ordering:
            // Last in the layer array = highest z-index = rendered on top
            const constructionManual = {
                name: safeFilename,
                gridSize: { width: editor.gridY, height: editor.gridX },
                layers: editor.layer.map((layer, index) => ({
                    name: layer.name,
                    layerId: layer.layerId,
                    identifierColor: layer.identifierColor,
                    file: `${safeFilename}_${layer.name.replace(/[^a-zA-Z0-9-_]/g, '-')}.webp`,
                    zIndex: editor.layer.length - 1 - index  // CSS z-index: top of list = highest z
                }))
            }

            formData.append('construction_manual', JSON.stringify(constructionManual, null, 2))

            // Convert each layer to a WebP blob and append to form
            for (const layer of editor.layer) {
                const layerGrid = flattenLayerGrid(layer)
                const result = await convertPixelGridToWebP(layerGrid, options)

                // Convert dataURL to Blob
                const response = await fetch(result.dataURL)
                const blob = await response.blob()

                const layerFilename = `${safeFilename}_${layer.name.replace(/[^a-zA-Z0-9-_]/g, '-')}.webp`
                formData.append(`layer_${layer.name}`, new File([blob], layerFilename, { type: 'image/webp' }))
            }

            const res = await fetch('/api/save-image', {
                method: 'POST',
                body: formData
            })

            const result = await res.json()

            if (res.ok) {
                console.log('Saved successfully:', result)
                alert(`Layers saved to ${result.folder}\nManual: ${result.manual}\nLayers: ${result.layers?.length || 0} files`)
            } else {
                throw new Error(result.error || 'Save failed')
            }
        } catch (error) {
            console.error('Save to assets failed:', error)
            alert('Failed to save to assets directory. Please try again.')
        }
    }

    // Generate composited preview
    const generatePreview = async () => {
        try {
            const convertedGrid = flattenCompositedGrid()
            const options: ConversionOptions = { scale: 5, quality: 0.8, format: 'webp' }
            const result = await convertPixelGridToWebP(convertedGrid, options)
            setPreviewImage(result.dataURL)
        } catch (error) {
            console.error('Preview generation failed:', error)
        }
    }

    // Export all layers as separate downloads
    const exportAllLayers = async () => {
        try {
            const converter = new WebPConverter()
            const layerData = editor.layer.map(exportLayer => ({
                name: exportLayer.name,
                gridData: flattenLayerGrid(exportLayer)
            }))

            const options: ConversionOptions = { scale: 10, quality: 0.9, format: 'webp' }
            await converter.downloadLayers(layerData, 'pixel-art-layers', options)
            converter.dispose()
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
                    onDeleteLayer={handleDeleteLayer}
                    onReorderLayers={handleReorderLayers}
                    separeteLayer={handleSeparateLayer}
                />
                <PixelGrid
                    gridData={editor.onGoing}
                    onPixelClick={handlePixelClick}
                    onGridResize={handleGridResize}
                    onExportImage={handleExportImage}
                    onClearGrid={handleClearGrid}
                    layerSeparation={editor.layerSeparation}
                    activeLayerId={editor.currentLayer}
                    layers={editor.layer}
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
                                const name = prompt('Enter filename for assets:')
                                if (name && name.trim()) {
                                    handleSaveToAssets(name.trim())
                                } else if (name === '') {
                                    alert('Please enter a filename')
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