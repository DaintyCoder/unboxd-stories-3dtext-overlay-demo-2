import React from 'react';
import { Text, Html } from '@react-three/drei';
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
                    }}
                    onClick={onClick}
                >
                    {overlay.text}
                </div>
            </Html>
        );
    }

    return (
        <Text
            position={overlay.position}
            rotation={overlay.rotation}
            onClick={onClick}
            fontSize={overlay.fontSize}
            color={overlay.color}
            anchorX="center"
            anchorY="middle"
            characters="abcdefghijklmnopqrstuvwxyz"
        >
            {overlay.text}
        </Text>
    );
};