'use client'
import { useState } from 'react'

interface ColorAdderProps {
    onAdd: (color: string) => void
}

export function ColorAdder({ onAdd }: ColorAdderProps) {
    const [newColor, setNewColor] = useState<string>('#000000')

    const addColor = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (newColor.trim() && onAdd) {
            onAdd(newColor.trim())
            setNewColor('#000000') // Reset to default
        }
    }

    return (
        <form onSubmit={addColor} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label>
                New Color:
                <input 
                    type="color" 
                    value={newColor} 
                    onChange={(e) => setNewColor(e.target.value)}
                    style={{ margin: '0 0.5rem', width: '40px', height: '30px', cursor: 'pointer' }}
                />
            </label>
            <input 
                type="text" 
                value={newColor} 
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="#000000"
                style={{ 
                    width: '80px', 
                    padding: '4px 8px',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                }}
            />
            <button 
                type="submit"
                style={{
                    padding: '6px 12px',
                    backgroundColor: '#007acc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
            >
                Add Color
            </button>
        </form>
    )
}