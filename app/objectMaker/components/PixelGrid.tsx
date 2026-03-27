'use client'
import { toRem } from "../../game/game"
import { useState } from "react"
import { Layer } from "./LayerPanel"

export type Pixel = {
    isPainted: boolean
    color: string
    layer: Layer
}

interface PixelGridProps {
    gridData: Pixel[][][]
    onPixelClick: (rowIndex: number, colIndex: number) => void
    onGridResize?: (height: number, width: number) => void
    onExportImage?: (gridData: Pixel[][][], filename?: string) => Promise<void>
    onClearGrid?: () => void
    layerSeparation?: boolean
    activeLayerId?: number
    layers?: Layer[]
}

export function PixelGrid({ gridData, onPixelClick, onGridResize, onExportImage, onClearGrid, layerSeparation, activeLayerId, layers }: PixelGridProps) {
    const [gridHeight, setGridHeight] = useState<number>(16)
    const [gridWidth, setGridWidth] = useState<number>(16)
    const [filename, setFilename] = useState<string>('my-pixel-art')

    const handleResize = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (onGridResize) {
            onGridResize(gridHeight, gridWidth)
        }
    }

    const handleExport = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!filename.trim()) {
            alert('Please enter a filename')
            return
        }
        if (onExportImage) {
            await onExportImage(gridData, filename.trim())
        }
    }

    const handleClearGrid = () => {
        if (onClearGrid) {
            onClearGrid()
        }
    }

    const handlePixelClick = (rowIndex: number, colIndex: number) => {
        if (layerSeparation && activeLayerId !== undefined) {
            const cellLayers = gridData[rowIndex][colIndex]
            const activePixel = cellLayers.find(p => p.layer.layerId === activeLayerId)
            if (activePixel) {
                onPixelClick(rowIndex, colIndex)
            }
        } else {
            onPixelClick(rowIndex, colIndex)
        }
    }

    const renderCell = (rowIndex: number, colIndex: number) => {
        const cellLayers = gridData[rowIndex][colIndex]

        if (!layerSeparation || activeLayerId === undefined) {
            // Normal compositing: topmost painted layer wins
            for (let i = cellLayers.length - 1; i >= 0; i--) {
                if (cellLayers[i].isPainted) {
                    return (
                        <div
                            key={colIndex}
                            style={{
                                border: 'solid 0.0625rem black',
                                backgroundColor: cellLayers[i].color,
                                width: toRem(25),
                                height: toRem(25),
                                cursor: 'pointer',
                                position: 'relative',
                            }}
                            onClick={() => handlePixelClick(rowIndex, colIndex)}
                        />
                    )
                }
            }
            return (
                <div
                    key={colIndex}
                    style={{
                        border: 'solid 0.0625rem black',
                        backgroundColor: 'transparent',
                        width: toRem(25),
                        height: toRem(25),
                        cursor: 'pointer',
                        position: 'relative',
                    }}
                    onClick={() => handlePixelClick(rowIndex, colIndex)}
                />
            )
        }

        // Layer separation mode
        const activePixel = cellLayers.find(p => p.layer.layerId === activeLayerId)
        const otherPaintedPixels = cellLayers.filter(
            p => p.layer.layerId !== activeLayerId && p.isPainted
        )
        const activeColor = activePixel?.isPainted ? activePixel.color : 'transparent'

        return (
            <div
                key={colIndex}
                style={{
                    border: 'solid 0.0625rem black',
                    backgroundColor: activeColor,
                    width: toRem(25),
                    height: toRem(25),
                    cursor: 'pointer',
                    position: 'relative',
                }}
                onClick={() => handlePixelClick(rowIndex, colIndex)}
            >
                {otherPaintedPixels.map((pixel, i) => (
                    <div
                        key={`overlay-${i}`}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: pixel.layer.identifierColor || '#888',
                            opacity: 0.1,
                            pointerEvents: 'none',
                        }}
                    />
                ))}
            </div>
        )
    }

    return (
        <div>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <form onSubmit={handleResize} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label>
                        Height:
                        <input
                            type="number"
                            value={gridHeight}
                            onChange={(e) => setGridHeight(parseInt(e.target.value) || 16)}
                            min="1"
                            max="64"
                            style={{ margin: '0 0.5rem', width: '60px' }}
                        />
                    </label>
                    <label>
                        Width:
                        <input
                            type="number"
                            value={gridWidth}
                            onChange={(e) => setGridWidth(parseInt(e.target.value) || 16)}
                            min="1"
                            max="64"
                            style={{ margin: '0 0.5rem', width: '60px' }}
                        />
                    </label>
                    <button type="submit">Resize</button>
                </form>
                <form onSubmit={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label>
                        Filename:
                        <input
                            type="text"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            style={{ margin: '0 0.5rem', width: '120px' }}
                        />
                    </label>
                    <button type="submit">Export WebP</button>
                </form>
                <button
                    onClick={handleClearGrid}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Clear Canvas
                </button>
            </div>
            <div style={{ position: 'relative' }}>
                {gridData.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
                    </div>
                ))}
            </div>
        </div>
    )
}