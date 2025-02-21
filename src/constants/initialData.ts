import { Vector3, Euler } from 'three';
import { TextOverlay } from '../types/types';

export const INITIAL_OVERLAYS: TextOverlay[] = [
    {
        id: 'bride',
        text: 'bride',
        position: new Vector3(0, 1, 0),
        is3D: true,
        fontSize: 1,
        fontFamily: 'Helvetiker Regular',
        color: '#FFFC00',
        rotation: new Euler(0, 0, 0)
    },
    {
        id: 'groom',
        text: 'groom',
        position: new Vector3(0, -1, 0),
        is3D: true,
        fontSize: 1,
        fontFamily: 'Helvetiker Regular',
        color: '#FFFC00',
        rotation: new Euler(0, 0, 0)
    }
];