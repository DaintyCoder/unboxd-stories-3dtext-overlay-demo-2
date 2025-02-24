import { Euler, Vector3 } from 'three';

export interface TextOverlay {
    id: string;
    text: string;
    position: Vector3;
    is3D: boolean;
    fontSize: number;
    fontFamily: string;
    color: string;
    rotation: Euler;
    depth: number;
    opacity: number;
}