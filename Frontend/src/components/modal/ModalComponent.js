import { Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, FormLabel, Box, Input, InputGroup, DrawerFooter } from "@chakra-ui/react"

const ModalComponent = ({ title, children, modalOpen, modalClose }) => {
  // const firstField = useRef()
  return (
    <Drawer
      isOpen={modalOpen}
      placement='right'
      onClose={modalClose}
      size='md'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {title}
        </DrawerHeader>

        <DrawerBody>
          {children}
        </DrawerBody>

        <DrawerFooter>
          <Button
            variant='outline'
            mr={3}
            onClick={modalClose}
            _hover={{
              bg: 'red.300',
              color: 'gray.600',
            }}
            bg='red.100'
          >
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ModalComponent