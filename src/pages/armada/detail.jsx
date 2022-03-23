import React, { useEffect, useState } from 'react';
import { CardGroup, CardImg, CardSubtitle, CardText } from 'reactstrap';

export default function FormDetail({ data, detailId }) {
  const initialCardValue = {
    picture: '',
    name: '',
    stock: 0,
    price: 0,
  };

  const [card, setCard] = useState(initialCardValue);

  useEffect(() => {
    const detailData = Object.assign(data.find((v) => v.id === detailId));
    setCard(detailData);
  }, [data, detailId]);

  return (
    <div>
      {Object.keys(card).map((key, idx) => (
        <div key={idx}>
          <CardGroup>
            {key === 'picture' ? (
              <CardImg src={card[key]} />
            ) : key === 'id' || key === 'bookedBy' || key === 'date' || key === 'book' ? (
              ''
            ) : (
              <CardSubtitle>
                {key}
                <CardText> {card[key]} </CardText>
              </CardSubtitle>
            )}
          </CardGroup>
        </div>
      ))}
    </div>
  );
}
