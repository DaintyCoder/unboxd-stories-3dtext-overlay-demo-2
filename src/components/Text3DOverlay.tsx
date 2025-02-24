import React from 'react';
import { Text3D, Html } from '@react-three/drei';
import { TextOverlay } from '../types/types';
import * as THREE from 'three';

interface Text3DOverlayProps {
    overlay: TextOverlay;
    selected: boolean;
    onClick: () => void;
}

// components/Text3DOverlay.tsx
export const Text3DOverlay: React.FC<Text3DOverlayProps> = ({ overlay, selected, onClick }) => {
    if (!overlay.is3D) {
        return (
            <Html position={overlay.position} center>
                <div
                    style={{
                        color: overlay.color,
                        fontSize: `${overlay.fontSize}em`,
                        cursor: 'pointer',
                        border: selected ? '2px solid #FFFC00' : 'none',
                        padding: '4px',
                        backgroundColor: selected ? 'rgba(0,0,0,0.5)' : 'transparent',
                        opacity: overlay.opacity,
                        textAlign: 'center',
                        whiteSpace: 'pre-line',
                        transform: 'translate(-50%, -50%)'
                    }}
                    onClick={onClick}
                >
                    {overlay.text}
                </div>
            </Html>
        );
    }

    // Split text into lines and calculate vertical offset
    const lines = overlay.text.split('\n');
    const lineHeight = overlay.fontSize * 1.2;

    return (
        <group position={overlay.position} rotation={overlay.rotation} onClick={onClick}>
            {/* Main Text */}
            <group position={[0, (lines.length - 1) * lineHeight / 2, 0]}>
                {lines.map((line, index) => (
                    <Text3D
                        key={index}
                        font="/fonts/helvetiker_regular.typeface.json"
                        size={overlay.fontSize}
                        height={overlay.depth}
                        curveSegments={32}
                        bevelEnabled={overlay.depth > 0.1}
                        bevelThickness={overlay.depth * 0.1}
                        bevelSize={overlay.depth * 0.05}
                        bevelOffset={0}
                        bevelSegments={5}
                        position={[0, -index * lineHeight, 0]}
                    >
                        {line}
                        <meshPhongMaterial 
                            color={overlay.color}
                            emissive={new THREE.Color(overlay.color).multiplyScalar(0.2)}
                            shininess={30}
                            transparent={overlay.opacity < 1} 
                            opacity={overlay.opacity}
                            specular={new THREE.Color(0xffffff)}
                        />
                    </Text3D>
                ))}
            </group>

            {/* Outline version (slightly larger) */}
            {overlay.outlineWidth > 0 && (
                <group position={[0, (lines.length - 1) * lineHeight / 2, 0]}>
                    {lines.map((line, index) => (
                        <Text3D
                            key={`outline-${index}`}
                            font="/fonts/helvetiker_regular.typeface.json"
                            size={overlay.fontSize + overlay.outlineWidth * 0.05}
                            height={overlay.depth}
                            curveSegments={32}
                            bevelEnabled={overlay.depth > 0.1}
                            bevelThickness={overlay.depth * 0.1}
                            bevelSize={overlay.depth * 0.05}
                            bevelOffset={0}
                            bevelSegments={5}
                            position={[0, -index * lineHeight, 0]}
                        >
                            {line}
                            <meshBasicMaterial 
                                color="#000000"
                                transparent={overlay.opacity < 1} 
                                opacity={overlay.opacity}
                                side={THREE.BackSide}
                            />
                        </Text3D>
                    ))}
                </group>
            )}
        </group>
    );
};