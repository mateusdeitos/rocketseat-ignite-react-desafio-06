import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const modal = useDisclosure();
  const [image, setImage] = useState<string | undefined>();

  const handleViewImage = (url: string): void => {
    setImage(url);
    modal.onOpen();
  };

  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} spacing="40px">
        {cards &&
          cards.length &&
          cards.map(card => {
            return (
              <Card key={card.id} data={card} viewImage={handleViewImage} />
            );
          })}
      </SimpleGrid>
      <ModalViewImage
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        imgUrl={image}
      />
    </>
  );
}
