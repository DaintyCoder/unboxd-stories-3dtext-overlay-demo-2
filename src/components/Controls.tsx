import React from 'react';
import { TextOverlay } from '../types/types';
import { Euler } from 'three';

interface ControlsProps {
    selectedOverlay: TextOverlay | undefined;
    onUpdate: (id: string, updates: Partial<TextOverlay>) => void;
}

export const Controls: React.FC<ControlsProps> = ({ selectedOverlay, onUpdate }) => {
    if (!selectedOverlay) return null;

    return (
        <div className="controls">
            <h3>Edit Text Overlay</h3>
            <div className="control-group">
                <label>
                    Font Size:
                    <input
                        type="range"
                        min="0.5"
                        max="2"
                        step="0.1"
                        value={selectedOverlay.fontSize}
                        onChange={e => onUpdate(selectedOverlay.id, { fontSize: parseFloat(e.target.value) })}
                    />
                </label>
            </div>
            <div className="control-group">
                <label>
                    3D Text:
                    <input
                        type="checkbox"
                        checked={selectedOverlay.is3D}
                        onChange={e => onUpdate(selectedOverlay.id, { is3D: e.target.checked })}
                    />
                </label>
            </div>
            {selectedOverlay.is3D && (
                <>
                    <div className="control-group">
                        <label>
                            Rotate X:
                            <input
                                type="range"
                                min="-3.14"
                                max="3.14"
                                step="0.1"
                                value={selectedOverlay.rotation.x}
                                onChange={e => onUpdate(selectedOverlay.id, {
                                    rotation: new Euler(
                                        parseFloat(e.target.value),
                                        selectedOverlay.rotation.y,
                                        selectedOverlay.rotation.z
                                    )
                                })}
                            />
                        </label>
                    </div>
                    <div className="control-group">
                        <label>
                            Rotate Y:
                            <input
                                type="range"
                                min="-3.14"
                                max="3.14"
                                step="0.1"
                                value={selectedOverlay.rotation.y}
                                onChange={e => onUpdate(selectedOverlay.id, {
                                    rotation: new Euler(
                                        selectedOverlay.rotation.x,
                                        parseFloat(e.target.value),
                                        selectedOverlay.rotation.z
                                    )
                                })}
                            />
                        </label>
                    </div>
                </>
            )}
        </div>
    );
};