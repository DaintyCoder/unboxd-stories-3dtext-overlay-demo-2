import React, { useRef, useEffect } from 'react';
import { Text3D, Html, /* useLoader */ } from '@react-three/drei';
import { TextOverlay } from '../types/types';
import * as THREE from 'three';
import { AVAILABLE_FONTS } from '../constants/fonts';

interface Text3DOverlayProps {
    overlay: TextOverlay;
    selected: boolean;
    onClick: () => void;
}

export const Text3DOverlay: React.FC<Text3DOverlayProps> = ({ overlay, selected, onClick }) => {
    const groupRef = useRef<THREE.Group>(null);

    // Effect to center the text vertically in the frame
    useEffect(() => {
        if (groupRef.current) {
            const box = new THREE.Box3().setFromObject(groupRef.current);
            const height = box.max.y - box.min.y;
            groupRef.current.position.y = -height / 2;
        }
    }, [overlay.text, overlay.fontSize, overlay.fontFamily]);

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

    // Get the correct font URL
    const fontUrl = AVAILABLE_FONTS.find(f => f.name === overlay.fontFamily)?.url || '/fonts/helvetiker_regular.typeface.json';

    // Split text into lines
    const lines = overlay.text.split('\n');
    const lineHeight = overlay.fontSize * 1.2;

    return (
        <group position={overlay.position} rotation={overlay.rotation} onClick={onClick}>
            <group ref={groupRef}>
                {/* Main text group */}
                <group position={[0, (lines.length - 1) * lineHeight / 2, 0]}>
                    {lines.map((line, index) => (
                        <React.Fragment key={`text-${index}`}>
                            {/* Outline/stroke layer - render first (behind main text) */}
                            {overlay.outlineWidth > 0 && (
                                <Text3D
                                    font={fontUrl}
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
                                    <meshStandardMaterial
                                        color="#000000"
                                        transparent={true}
                                        opacity={overlay.opacity}
                                        metalness={0.1}
                                        roughness={0.5}
                                        polygonOffset={true}
                                        polygonOffsetFactor={-1}
                                        side={THREE.FrontSide}
                                    />
                                </Text3D>
                            )}

                            {/* Main text layer */}
                            <Text3D
                                font={fontUrl}
                                size={overlay.fontSize - (overlay.outlineWidth > 0 ? overlay.outlineWidth * 0.05 : 0)}
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
                        </React.Fragment>
                    ))}
                </group>
            </group>
        </group>
    );
};