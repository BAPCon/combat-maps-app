import { ViewIcon } from '@chakra-ui/icons'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
} from '@chakra-ui/react'
import { Children, JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from 'react'

export function MapDropdownButton(props: { icon: ReactElement; children: Iterable<ReactNode>}) {
    return (
        <Menu placement='left' closeOnSelect={false} gutter={16}>
            <IconButton aria-label='' as={MenuButton} icon={props.icon} color={"#444"} width={'40px'} borderRadius="2px" marginRight={"10px"} boxShadow={"rgba(0, 0, 0, 0.3) 0px 1px 4px -1px"} backgroundColor={"white"} >
                Actions
            </IconButton >
            <MenuList minWidth='240px' mt="10">
                {Children.toArray(props.children)}
            </MenuList>
        </Menu >
    )
}