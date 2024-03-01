import {
  useDisclosure,
  Button,
  Heading,
  Stack,
  Text,
  Flex,
  Box,
  Card,
  Image,
  CardBody,
  CardFooter,
  ButtonGroup,
  Divider,
  Tag,
  Wrap,
  WrapItem,
  Kbd,
} from '@chakra-ui/react'
import React from 'react'

export function CardView(props: { posts: {key: any, id: any; title: string; selftext: string; event_date: { month: any; day: any; year: any; }; source: string; }[]; }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      
      <Box gap="1rem" p="0 1rem 1rem 1rem" mr="auto" my={'auto'} h="90vh" backgroundColor={"rgba(0,0,0,0)"} display={"flex"} flexDirection={"column"} pointerEvents={"all"} className={"hide-scroll"}>
        {props.posts.map((item: { key: any; id: any; title: string; selftext: string; event_date: { month: any; day: any; year: any; }; source: string; }) =>
        {
          return (
            
        <Card w="25vw" className='soft-shadow' p={0} key={item.key}>
        <CardBody>
          <Stack display={"flex"} justifyContent={"center"}>
            
          <Image
            src={`https://cf-app-tools.s3.us-east-2.amazonaws.com/public/previews/${item.id}.png`}
            alt=''
            borderRadius='lg'
            maxH={200}
            aspectRatio={"2/1"}
            />

          </Stack>
          <Heading mt='3' fontSize={16} whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"}>{item.title}</Heading>
          <Stack mt='3' spacing='3'>
            <Text overflow={"hidden"} textOverflow={"ellipsis"} fontSize={14}>
              {item.selftext.substring(0, item.selftext.indexOf('.') ) + '...'}
            </Text>
            <Wrap spacing={4} mt='4'>
            <WrapItem><Tag size={"sm"}>{`${item.event_date.month?item.event_date.month:'??'}-${item.event_date.day?item.event_date.day:'??'}-${item.event_date.year?item.event_date.year:'??'}`}</Tag></WrapItem>
            <WrapItem><Tag size={"sm"}>{item.source}</Tag></WrapItem>
          </Wrap>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              View Video
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Visit source
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
          )
        })}
      </Box>
      <Flex pos={"fixed"} fontSize={20} left={8}>
        <span>
        <Kbd size={'md'}>Press Escape To Close</Kbd>
        </span>
      </Flex>
    </>
  )
}