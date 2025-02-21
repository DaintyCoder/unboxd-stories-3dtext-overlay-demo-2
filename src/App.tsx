// App.tsx

import React, { useState, useCallback, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Text3DOverlay } from './components/Text3DOverlay';
import { Controls } from './components/Controls';
import { MediaUpload } from './components/MediaUpload';
import { INITIAL_OVERLAY } from './constants/initialData';
import { TextOverlay } from './types/types';
import './App.css';

const App: React.FC = () => {
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const [overlay, setOverlay] = useState<TextOverlay>(INITIAL_OVERLAY);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaUrl(url);
    }
  }, []);

  const updateOverlay = useCallback((updates: Partial<TextOverlay>) => {
    setOverlay(prevOverlay => ({ ...prevOverlay, ...updates }));
  }, []);

  return (
    <div className="app">
      <div className="story-container">
        {!mediaUrl ? (
          <MediaUpload onFileUpload={handleFileUpload} />
        ) : (
          <>
            <div className="media-frame">
              <img src={mediaUrl} alt="uploaded media" className="media" />
              <Canvas className="canvas-overlay">
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <OrbitControls enabled={isEditing} />
                  <Text3DOverlay
                    overlay={overlay}
                    selected={isEditing}
                    onClick={() => setIsEditing(true)}
                  />
                </Suspense>
              </Canvas>
            </div>
          </>
        )}
      </div>
      {isEditing && (
        <Controls
          overlay={overlay}
          onUpdate={updateOverlay}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default App;