'use client'
import { toRem } from "../../game/game"
import { useState } from "react"

export type Pixel = {
    isPainted?: boolean
    color: string
    // points?: { x: number, y: number }
}

interface PixelGridProps {
    gridData: Pixel[][]
    onPixelClick: (rowIndex: number, colIndex: number) => void
    onGridResize?: (height: number, width: number) => void
    onExportImage?: (gridData: Pixel[][], filename?: string) => Promise<void>
}

export function PixelGrid({ gridData, onPixelClick, onGridResize, onExportImage }: PixelGridProps) {
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
                </form>
            </div>
            {gridData.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {row.map((cell, colIndex) => (
                        <div
                            key={colIndex}
                            style={{
                                border: 'solid 0.0625rem black',
                                backgroundColor: cell.color,
                                width: toRem(25),
                                height: toRem(25),
                                cursor: 'pointer'
                            }}
                            onClick={() => onPixelClick(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}