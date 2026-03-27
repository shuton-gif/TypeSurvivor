import { Pixel } from "./PixelGrid";

export interface ConversionOptions {
    scale?: number;
    quality?: number;
    format?: 'webp' | 'png';
}

export interface ConversionResult {
    blob: Blob;
    dataURL: string;
    width: number;
    height: number;
}

/**
 * Converts a Pixel[][] grid to WebP/PNG format using Canvas API
 */
export class WebPConverter {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    constructor() {
        this.canvas = document.createElement('canvas');
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Canvas 2D context not supported');
        }
        this.ctx = context;
        // Disable image smoothing for pixel-perfect scaling
        this.ctx.imageSmoothingEnabled = false;
    }

    /**
     * Converts a pixel grid to image blob
     */
    async convertToBlob(
        gridData: Pixel[][],
        options: ConversionOptions = {}
    ): Promise<ConversionResult> {
        const {
            scale = 10,
            quality = 0.9,
            format = 'webp'
        } = options;

        if (!gridData || gridData.length === 0 || gridData[0].length === 0) {
            throw new Error('Grid data is empty or invalid');
        }

        const gridHeight = gridData.length;
        const gridWidth = gridData[0].length;
        const canvasWidth = gridWidth * scale;
        const canvasHeight = gridHeight * scale;

        // Set canvas dimensions
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;

        // Clear canvas with transparent background
        this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw each pixel
        gridData.forEach((row, rowIndex) => {
            row.forEach((pixel, colIndex) => {
                if (pixel.color && pixel.color !== 'transparent') {
                    this.ctx.fillStyle = pixel.color;
                    this.ctx.fillRect(
                        colIndex * scale,
                        rowIndex * scale,
                        scale,
                        scale
                    );
                }
            });
        });

        // Convert to blob
        const mimeType = format === 'webp' ? 'image/webp' : 'image/png';
        
        return new Promise((resolve, reject) => {
            this.canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const dataURL = this.canvas.toDataURL(mimeType, quality);
                        resolve({
                            blob,
                            dataURL,
                            width: canvasWidth,
                            height: canvasHeight
                        });
                    } else {
                        reject(new Error(`Failed to convert to ${format}`));
                    }
                },
                mimeType,
                quality
            );
        });
    }

    /**
     * Downloads the converted image directly
     */
    async downloadImage(
        gridData: Pixel[][],
        filename: string = 'pixel-art',
        options: ConversionOptions = {}
    ): Promise<void> {
        try {
            const result = await this.convertToBlob(gridData, options);
            const format = options.format || 'webp';
            
            // Create download link
            const url = URL.createObjectURL(result.blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${filename}.${format}`;
            
            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Cleanup
            URL.revokeObjectURL(url);
        } catch (error) {
            throw new Error(`Download failed: ${error}`);
        }
    }

    /**
     * Saves image to server directory (/public/assets)
     */
    async saveToAssets(
        gridData: Pixel[][],
        filename: string = 'pixel-art',
        options: ConversionOptions = {}
    ): Promise<{ path: string; url: string }> {
        try {
            const result = await this.convertToBlob(gridData, options);
            
            // Create form data
            const formData = new FormData();
            formData.append('file', result.blob, `${filename}.webp`);
            formData.append('filename', filename);
            
            // Send to server API
            const response = await fetch('/api/save-image', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            return {
                path: data.path,
                url: data.url
            };
        } catch (error) {
            throw new Error(`Save to assets failed: ${error}`);
        }
    }

    /**
     * Gets a data URL for image preview
     */
    async getDataURL(
        gridData: Pixel[][],
        options: ConversionOptions = {}
    ): Promise<string> {
        const result = await this.convertToBlob(gridData, options);
        return result.dataURL;
    }

    /**
     * Converts multiple layers to separate images
     */
    async convertLayers(
        layers: { name: string; gridData: Pixel[][] }[],
        options: ConversionOptions = {}
    ): Promise<{ name: string; result: ConversionResult }[]> {
        const results = [];
        
        for (const layer of layers) {
            try {
                const result = await this.convertToBlob(layer.gridData, options);
                results.push({
                    name: layer.name,
                    result
                });
            } catch (error) {
                console.error(`Failed to convert layer ${layer.name}:`, error);
            }
        }
        
        return results;
    }

    /**
     * Batch download multiple layers
     */
    async downloadLayers(
        layers: { name: string; gridData: Pixel[][] }[],
        baseFilename: string = 'pixel-art',
        options: ConversionOptions = {}
    ): Promise<void> {
        const layerResults = await this.convertLayers(layers, options);
        const format = options.format || 'webp';
        
        for (const { name, result } of layerResults) {
            const url = URL.createObjectURL(result.blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${baseFilename}-${name}.${format}`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);
            
            // Small delay between downloads
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    /**
     * Creates a preview image element
     */
    async createPreviewImage(
        gridData: Pixel[][],
        options: ConversionOptions = {}
    ): Promise<HTMLImageElement> {
        const dataURL = await this.getDataURL(gridData, options);
        const img = new Image();
        
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error('Failed to create preview image'));
            img.src = dataURL;
        });
    }

    /**
     * Cleanup canvas resources
     */
    dispose(): void {
        this.canvas.remove();
    }
}

// Utility function for quick conversions
export async function convertPixelGridToWebP(
    gridData: Pixel[][],
    options: ConversionOptions = {}
): Promise<ConversionResult> {
    const converter = new WebPConverter();
    try {
        return await converter.convertToBlob(gridData, options);
    } finally {
        converter.dispose();
    }
}

// Utility function for quick downloads
export async function downloadPixelArt(
    gridData: Pixel[][],
    filename: string = 'pixel-art',
    options: ConversionOptions = {}
): Promise<void> {
    const converter = new WebPConverter();
    try {
        await converter.downloadImage(gridData, filename, options);
    } finally {
        converter.dispose();
    }
}

// Utility function for saving to assets directory
export async function savePixelArtToAssets(
    gridData: Pixel[][],
    filename: string = 'pixel-art',
    options: ConversionOptions = {}
): Promise<{ path: string; url: string }> {
    const converter = new WebPConverter();
    try {
        return await converter.saveToAssets(gridData, filename, options);
    } finally {
        converter.dispose();
    }
}