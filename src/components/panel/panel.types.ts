export enum EScale {
    up,
    normal,
    down
}

export enum EMoveToNear {
    prev,
    next
}

export interface PanelComponentProps {
    scale: number;
    onScale: (newScale: number) => void;
    onMoveToNear: (to: EMoveToNear) => void;
}