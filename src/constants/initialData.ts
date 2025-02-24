// constants/initialData.ts

import { Vector3, Euler } from 'three';
import { TextOverlay } from '../types/types';

export const INITIAL_OVERLAY: TextOverlay = {
  id: 'main-text',
  position: new Vector3(0, 0.5, 0), // Adjusted Y position for vertical centering
  text: 'Groom\nweds\nBride', // Example with line breaks
  is3D: true,
  fontSize: 1,
  fontFamily: 'Helvetiker Regular',
  color: '#FFFC00',
  rotation: new Euler(0, 0, 0),
  depth: 0.2,
  opacity: 1,
  outlineWidth: 0 // Default to no outline
};