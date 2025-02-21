import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Text3DOverlay } from './components/Text3DOverlay';
import { Controls } from './components/Controls';
import { MediaUpload } from './components/MediaUpload';
import { INITIAL_OVERLAYS } from './constants/initialData';
import { TextOverlay } from './types/types';
import './App.css';

const App: React.FC = () => {
    const [mediaUrl, setMediaUrl] = useState<string>('');
    const [overlays, setOverlays] = useState<TextOverlay[]>(INITIAL_OVERLAYS);
    const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);

    const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setMediaUrl(url);
        }
    }, []);

    const updateOverlay = useCallback((id: string, updates: Partial<TextOverlay>) => {
        setOverlays(prevOverlays =>
            prevOverlays.map(overlay =>
                overlay.id === id ? { ...overlay, ...updates } : overlay
            )
        );
    }, []);

    const selectedOverlay = overlays.find(o => o.id === selectedOverlayId);

    return (
        <div className="app">
            <div className="media-container">
                {!mediaUrl ? (
                    <MediaUpload onFileUpload={handleFileUpload} />
                ) : (
                    <>
                        <img src={mediaUrl} alt="uploaded media" className="media" />
                        <Canvas className="canvas-overlay">
                            <Suspense fallback={null}>
                                <ambientLight intensity={0.5} />
                                <pointLight position={[10, 10, 10]} />
                                <OrbitControls enabled={!!selectedOverlayId} />
                                {overlays.map(overlay => (
                                    <Text3DOverlay
                                        key={overlay.id}
                                        overlay={overlay}
                                        selected={selectedOverlayId === overlay.id}
                                        onClick={() => setSelectedOverlayId(overlay.id)}
                                    />
                                ))}
                            </Suspense>
                        </Canvas>
                    </>
                )}
            </div>
            <Controls
                selectedOverlay={selectedOverlay}
                onUpdate={updateOverlay}
            />
        </div>
    );
};

export default App;