import {
    IconButton,
    PlacementWithLogical,
    Tooltip,
} from '@chakra-ui/react'
import React from 'react'

export function MapButtonSquare(props: {
    placement: PlacementWithLogical | undefined; onOpen: React.MouseEventHandler<HTMLButtonElement> | undefined; label: string; icon: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined 
}) {
    return (
        <Tooltip label={props.label} hasArrow arrowSize={15} placement={props.placement} openDelay={500}>
            <IconButton onClick={props.onOpen} aria-label={props.label} icon={props.icon} color={"#444"} width={'40px'} borderRadius="2px" marginRight={"10px"} boxShadow={"rgba(0, 0, 0, 0.3) 0px 1px 4px -1px"} backgroundColor={"white"} />
        </Tooltip>
    )
}