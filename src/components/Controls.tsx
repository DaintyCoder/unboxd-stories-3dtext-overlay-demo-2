// components/Controls.tsx

import React from 'react';
import { TextOverlay } from '../types/types';
import { Euler } from 'three';

interface ControlsProps {
  overlay: TextOverlay;
  onUpdate: (updates: Partial<TextOverlay>) => void;
  onClose: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ overlay, onUpdate, onClose }) => {
  return (
    <div className="controls">
      <div className="controls-header">
        <h3>Edit Text Overlay</h3>
        <button onClick={onClose}>Close</button>
      </div>
      <div className="control-group">
        <label>
          Text:
          <input
            type="text"
            value={overlay.text}
            onChange={e => onUpdate({ text: e.target.value })}
            className="text-input"
          />
        </label>
      </div>
      <div className="control-group">
        <label>
          Font Size:
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={overlay.fontSize}
            onChange={e => onUpdate({ fontSize: parseFloat(e.target.value) })}
          />
        </label>
      </div>
      <div className="control-group">
        <label>
          Rotate X:
          <input
            type="range"
            min="-3.14"
            max="3.14"
            step="0.1"
            value={overlay.rotation.x}
            onChange={e => onUpdate({
              rotation: new Euler(
                parseFloat(e.target.value),
                overlay.rotation.y,
                overlay.rotation.z
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
            value={overlay.rotation.y}
            onChange={e => onUpdate({
              rotation: new Euler(
                overlay.rotation.x,
                parseFloat(e.target.value),
                overlay.rotation.z
              )
            })}
          />
        </label>
      </div>
    </div>
  );
};