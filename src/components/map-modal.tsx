import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Heading,
    Stack,
    StackItem,
    Text,
    StackDivider,
    Flex,
  } from '@chakra-ui/react'
import { useEffect } from 'react'
import { FaGithub, FaHome, FaYoutube } from 'react-icons/fa'
  
export function VerticallyCenter() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    useEffect(()=>{onOpen()},[])
    const icon_size = "22px"
    return (
      <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontWeight={800}>Welcome to CombatMaps</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Stack>
                    <Text fontSize={14}>Explore and visualize the geography of historical and ongoing conflict</Text>
                    <StackDivider></StackDivider>
                </Stack>
            </ModalBody>
            <ModalFooter justifyContent={"space-between"} fontSize={14} w={"100%"} mx={'auto'}>
                
                <Flex gap={"16px"} alignItems={"center"}>
                    <FaHome size={icon_size} />
                    <Text>Home Page</Text>
                </Flex>
                <Flex gap={"16px"} alignItems={"center"}>
                    <FaYoutube size={icon_size} />
                    <Text>Youtube</Text>
                </Flex>
                <Flex gap={"16px"} alignItems={"center"}>
                    <FaGithub size={icon_size} />
                    <Text>Github Repo</Text>
                </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }