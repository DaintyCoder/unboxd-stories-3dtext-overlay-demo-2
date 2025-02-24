import React from 'react';
import { Text3D, Html } from '@react-three/drei';
import { TextOverlay } from '../types/types';

interface Text3DOverlayProps {
    overlay: TextOverlay;
    selected: boolean;
    onClick: () => void;
}

export const Text3DOverlay: React.FC<Text3DOverlayProps> = ({ overlay, selected, onClick }) => {
    if (!overlay.is3D) {
        return (
            <Html position={overlay.position}>
                <div
                    style={{
                        color: overlay.color,
                        fontSize: `${overlay.fontSize}em`,
                        cursor: 'pointer',
                        border: selected ? '2px solid #FFFC00' : 'none',
                        padding: '4px',
                        backgroundColor: selected ? 'rgba(0,0,0,0.5)' : 'transparent',
                        opacity: overlay.opacity,
                    }}
                    onClick={onClick}
                >
                    {overlay.text}
                </div>
            </Html>
        );
    }

    return (
        <Text3D
            position={overlay.position}
            rotation={overlay.rotation}
            onClick={onClick}
            font="/fonts/helvetiker_regular.typeface.json"
            size={overlay.fontSize}
            height={overlay.depth}
            curveSegments={12}
            bevelEnabled={overlay.depth > 0.1}
            bevelThickness={overlay.depth * 0.1}
            bevelSize={overlay.depth * 0.05}
            bevelOffset={0}
            bevelSegments={3}
        >
            {overlay.text}
            <meshStandardMaterial 
                color={overlay.color} 
                transparent={overlay.opacity < 1} 
                opacity={overlay.opacity} 
            />
        </Text3D>
    );
};