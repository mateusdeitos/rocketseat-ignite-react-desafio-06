import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        mx="auto"
        mb="2.5rem"
        mt="2.5rem"
        w="auto"
        h="auto"
        maxW={['320px', '540px', '900px']}
        maxH={['360px', '440px', '600px']}
        bg="transparent"
      >
        <ModalBody p={0} bg="pGray.800">
          <Image
            src={imgUrl}
            alt="image"
            maxW={['320px', '540px', '900px']}
            maxH={['360px', '440px', '600px']}
          />
        </ModalBody>
        <ModalFooter
          py={2}
          px={3}
          bg="pGray.800"
          justifyContent="flex-start"
          borderBottomRadius="6px"
        >
          <Link href={imgUrl} isExternal fontSize={14}>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
