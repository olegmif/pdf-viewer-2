import React, {FC} from 'react';
import {EMoveToNear, EScale, PanelComponentProps} from "./panel.types";


const PanelComponent: FC<PanelComponentProps> = ({scale, onScale, onMoveToNear}) => {


    const handleScale: (action: EScale) => void = (action) => {
        switch (action) {
            case EScale.up: onScale(scale - .2); break;
            case EScale.down: onScale(scale + .2); break;
            case EScale.normal: onScale(1); break;
            default: onScale(1);
        }
    }

    return (
        <div>
            <button onClick={()=>handleScale(EScale.up)}>Scale Down</button>
            <button onClick={()=>handleScale(EScale.normal)}>Scale 100%</button>
            <button onClick={()=>handleScale(EScale.down)}>Scale Up</button>
            <button onClick={()=>onMoveToNear(EMoveToNear.prev)}>Prev Page</button>
            <button onClick={()=>onMoveToNear(EMoveToNear.next)}>Next Page</button>
        </div>
    );
};

export default PanelComponent;