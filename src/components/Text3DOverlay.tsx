import React from 'react';
import { Text3D, Html } from '@react-three/drei';
import { TextOverlay } from '../types/types';
import * as THREE from 'three';

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
        <group position={overlay.position} rotation={overlay.rotation} onClick={onClick}>
            {/* Main Text */}
            <Text3D
                font="/fonts/helvetiker_regular.typeface.json"
                size={overlay.fontSize}
                height={overlay.depth}
                curveSegments={32}
                bevelEnabled={overlay.depth > 0.1}
                bevelThickness={overlay.depth * 0.1}
                bevelSize={overlay.depth * 0.05}
                bevelOffset={0}
                bevelSegments={5}
            >
                {overlay.text}
                <meshPhongMaterial 
                    color={overlay.color}
                    emissive={new THREE.Color(overlay.color).multiplyScalar(0.2)}
                    shininess={30}
                    transparent={overlay.opacity < 1} 
                    opacity={overlay.opacity}
                    specular={new THREE.Color(0xffffff)}
                />
            </Text3D>

            {/* Outline version (slightly larger) */}
            {overlay.outlineWidth > 0 && (
                <Text3D
                    font="/fonts/helvetiker_regular.typeface.json"
                    size={overlay.fontSize + overlay.outlineWidth * 0.05}
                    height={overlay.depth}
                    curveSegments={32}
                    bevelEnabled={overlay.depth > 0.1}
                    bevelThickness={overlay.depth * 0.1}
                    bevelSize={overlay.depth * 0.05}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    {overlay.text}
                    <meshBasicMaterial 
                        color="#000000"
                        transparent={overlay.opacity < 1} 
                        opacity={overlay.opacity}
                        side={THREE.BackSide}
                    />
                </Text3D>
            )}
        </group>
    );
};