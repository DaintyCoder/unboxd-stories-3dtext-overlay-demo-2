import React from 'react';
import { TextOverlay } from '../types/types';
import { Euler, Vector3 } from 'three';

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
      
      {/* Color Selector */}
      <div className="control-group">
        <label>
          Text Color:
          <input
            type="color"
            value={overlay.color}
            onChange={e => onUpdate({ color: e.target.value })}
            className="color-input"
          />
        </label>
      </div>
      
      {/* Opacity Control */}
      <div className="control-group">
        <label>
          Opacity:
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={overlay.opacity}
            onChange={e => onUpdate({ opacity: parseFloat(e.target.value) })}
          />
          <span>{overlay.opacity.toFixed(1)}</span>
        </label>
      </div>
      
      {/* Text Depth Control (only for 3D text) */}
      {overlay.is3D && (
        <div className="control-group">
          <label>
            Text Depth:
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={overlay.depth}
              onChange={e => onUpdate({ depth: parseFloat(e.target.value) })}
            />
            <span>{overlay.depth.toFixed(1)}</span>
          </label>
        </div>
      )}
      
      {/* Position Controls */}
      <div className="control-section">
        <h4>Position</h4>
        <div className="control-group">
          <label>
            X:
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={overlay.position.x}
              onChange={e => onUpdate({
                position: new Vector3(
                  parseFloat(e.target.value),
                  overlay.position.y,
                  overlay.position.z
                )
              })}
            />
            <span>{overlay.position.x.toFixed(1)}</span>
          </label>
        </div>
        <div className="control-group">
          <label>
            Y:
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={overlay.position.y}
              onChange={e => onUpdate({
                position: new Vector3(
                  overlay.position.x,
                  parseFloat(e.target.value),
                  overlay.position.z
                )
              })}
            />
            <span>{overlay.position.y.toFixed(1)}</span>
          </label>
        </div>
        <div className="control-group">
          <label>
            Z:
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={overlay.position.z}
              onChange={e => onUpdate({
                position: new Vector3(
                  overlay.position.x,
                  overlay.position.y,
                  parseFloat(e.target.value)
                )
              })}
            />
            <span>{overlay.position.z.toFixed(1)}</span>
          </label>
        </div>
      </div>

      {/* Rotation Controls */}
      <div className="control-section">
        <h4>Rotation</h4>
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
            <span>{overlay.rotation.x.toFixed(1)}</span>
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
            <span>{overlay.rotation.y.toFixed(1)}</span>
          </label>
        </div>
        <div className="control-group">
          <label>
            Rotate Z:
            <input
              type="range"
              min="-3.14"
              max="3.14"
              step="0.1"
              value={overlay.rotation.z}
              onChange={e => onUpdate({
                rotation: new Euler(
                  overlay.rotation.x,
                  overlay.rotation.y,
                  parseFloat(e.target.value)
                )
              })}
            />
            <span>{overlay.rotation.z.toFixed(1)}</span>
          </label>
        </div>
      </div>
    </div>
  );
};