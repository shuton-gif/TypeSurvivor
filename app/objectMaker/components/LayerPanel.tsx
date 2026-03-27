'use client'
import { useState } from "react"

interface LayerPanelProps {
    layers: string[]
    activeLayerId: number
    onAddLayer: (layerName: string) => void
    onSelectLayer: (layerId: number) => void
}

export function LayerPanel({ layers, activeLayerId, onAddLayer, onSelectLayer }: LayerPanelProps) {
    const [newLayerName, setNewLayerName] = useState('')

    const handleAddLayer = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (newLayerName.trim()) {
            onAddLayer(newLayerName.trim())
            setNewLayerName('')
        }
    }

    return (
        <div>
            <div>
                ADD Layer
                <form onSubmit={handleAddLayer}>
                    <input
                        type="text"
                        value={newLayerName}
                        onChange={(e) => setNewLayerName(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div>
                SET Layer
                <div>
                    {layers.map((layer, index) => 
                        <li 
                            key={index} 
                            onClick={() => onSelectLayer(index)}
                            style={{ cursor: 'pointer' }}
                        >
                            {layer} {index === activeLayerId ? '(active)' : ''}
                        </li>
                    )}
                </div>
            </div>
        </div>
    )
}