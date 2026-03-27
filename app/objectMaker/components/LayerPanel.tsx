'use client'
import { useState, useRef } from "react"

export type Layer = {
    name: string
    layerId: number
    identifierColor?: string
}

interface LayerPanelProps {
    layers: Layer[]
    activeLayerId: number
    separeteLayer: (layerId: number, content: Layer[], layerColor: string) => void

    onAddLayer: (layer: Layer) => void
    onSelectLayer: (layerId: number, handleLayerSeparation: (content: Layer[], layerColor: string) => void) => void
    onDeleteLayer: (layerId: number) => void
    onReorderLayers: (fromIndex: number, toIndex: number) => void
}

export function LayerPanel({ layers, activeLayerId, onAddLayer, onSelectLayer, onDeleteLayer, separeteLayer, onReorderLayers }: LayerPanelProps) {
    const [layer, setLayer] = useState<Layer>({
        name: '',
        layerId: 0,
        identifierColor: 'white'
    })

    const dragItem = useRef<number | null>(null)
    const dragOverItem = useRef<number | null>(null)

    const generateRandomColor = (): string => {
        const letters = '0123456789ABCDEF'
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    const handleAddLayer = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (layer.name.trim()) {
            const newLayer: Layer = {
                name: layer.name.trim(),
                layerId: layers.length,
                identifierColor: generateRandomColor()
            }
            onAddLayer(newLayer)
            setLayer({
                name: '',
                layerId: 0,
                identifierColor: generateRandomColor()
            })
        }
    }

    const handleDeleteLayer = (layerId: number) => {
        if (layers.length <= 1) {
            alert('Cannot delete the last layer!')
            return
        }
        const layerName = layers[layerId]?.name || `Layer ${layerId}`
        if (confirm(`Are you sure you want to delete "${layerName}"?`)) {
            onDeleteLayer(layerId)
        }
    }

    const separateLayer = (layerId: number, content: Layer[], layerColor: string) => {
        separeteLayer(layerId, content, layerColor)
    }

    // Drag handlers
    const handleDragStart = (index: number) => {
        dragItem.current = index
    }

    const handleDragEnter = (index: number) => {
        dragOverItem.current = index
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault() // Required to allow drop
    }

    const handleDrop = () => {
        if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
            onReorderLayers(dragItem.current, dragOverItem.current)
        }
        dragItem.current = null
        dragOverItem.current = null
    }

    const handleDragEnd = () => {
        dragItem.current = null
        dragOverItem.current = null
    }

    return (
        <div>
            <div>
                ADD Layer
                <form onSubmit={handleAddLayer}>
                    <input
                        type="text"
                        value={layer.name}
                        onChange={(e) => setLayer({ ...layer, name: e.target.value })}
                        placeholder="Layer name"
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div>
                SET Layer
                <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>
                    ↑ front (top) — drag to reorder — ↓ back (bottom)
                </div>
                <div>
                    {layers.map((layerItem, index) =>
                        <li
                            key={layerItem.layerId}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDragEnd={handleDragEnd}
                            onClick={() => onSelectLayer(index, (content: Layer[], layerColor: string) =>
                                separateLayer(index, content, layerColor)
                            )}
                            style={{
                                cursor: 'grab',
                                listStyleType: 'none',
                                padding: '5px',
                                margin: '2px 0',
                                backgroundColor: index === activeLayerId ? '#e0e0e0' : 'transparent',
                                borderRadius: '3px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                userSelect: 'none',
                                border: '1px solid transparent',
                                transition: 'border-color 0.15s',
                            }}
                        >
                            <span style={{ cursor: 'grab', fontSize: '12px', color: '#999' }}>⠿</span>
                            <div
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: layerItem.identifierColor || '#ccc',
                                    border: '1px solid #000',
                                    borderRadius: '2px',
                                    flexShrink: 0,
                                }}
                            />
                            <span>{layerItem.name}</span>
                            <span style={{ fontSize: '10px', color: '#aaa' }}>z:{layers.length - 1 - index}</span>
                            {index === activeLayerId ? ' (active)' : ''}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteLayer(index)
                                }}
                                style={{
                                    marginLeft: 'auto',
                                    padding: '2px 6px',
                                    backgroundColor: '#ff4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '3px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                ×
                            </button>
                        </li>
                    )}
                </div>
            </div>
        </div>
    )
}