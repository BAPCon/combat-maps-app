import { PhoneIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  Icon,
  IconButton,
  Tooltip,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import React from 'react'
import { MapButtonSquare } from './map-button-square'
import { FaSearchLocation } from 'react-icons/fa'

export function MapButtonModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const side = props.placement ? props.placement : 'right';
  return (
    <>
      {/*@ts-ignore*/}
      <MapButtonSquare label={props.label} placement={side} onOpen={onOpen} icon={props.icon} />
      <Drawer
        isOpen={isOpen}
        placement={side}
        onClose={onClose}
      >
        <DrawerOverlay
          bg='blackAlpha.400' />
        <DrawerContent>

          <DrawerCloseButton />
          <DrawerHeader>{props.header}</DrawerHeader>

          <DrawerBody>
            {props.body}
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}


export function MapButtonPopover(props) {
  return (
    <>
      {/*@ts-ignore*/}
      <Popover placement='left'>
        <PopoverTrigger>

          <IconButton aria-label='' icon={props.icon} color={"#444"} width={'40px'} borderRadius="2px" marginRight={"10px"} boxShadow={"rgba(0, 0, 0, 0.3) 0px 1px 4px -1px"} backgroundColor={"white"} >
            Actions
          </IconButton >

        </PopoverTrigger>
        <PopoverContent minW={"350px"}>
          <PopoverArrow />
          <PopoverBody>
            <InputGroup width={"90%"}>
                <InputLeftElement pointerEvents='none'>
                  <FaSearchLocation color='gray.300' />
                </InputLeftElement>
              <Input type='tel' placeholder='Separate keywords by space' />
            </InputGroup>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  )
}