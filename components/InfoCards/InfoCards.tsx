import React from "react";
import s from './InfoCards.module.scss'


type CardsPropsType = {
  cards: any,
};

export const InfoCards = (props: CardsPropsType):JSX.Element => {
  const {
    cards,
  } = props;

  return (
    <ul className={s.cardsContainer}>
      {cards.map((item) => (
        <li className={s.cardItem}>
          <p className={s.text}>{item.body}</p>
        </li>
        ))}
    </ul>
  );
};