import React from 'react';
import classNames from 'classnames';
import './GoodsItem.scss';

type Props = {
  good: Goods;
  twoInRow: boolean;
  selected: (good: Goods) => void
  selectedGoods: Goods[]
};

export const GoodsItem: React.FC<Props> = ({
  good,
  twoInRow,
  selected,
  selectedGoods,
}) => {
  return (
    <div className="card">
      <div>
        <img
          src={twoInRow ? good.urlBig : good.url}
          alt="goods"
          className="card__image"
        />
      </div>
      <div className="card__title">
        <p>{good.title}</p>
        <button
          type="button"
          className="card__button"
          onClick={() => selected(good)}
        >
          <img
            src="../images/heart.svg"
            alt="heart"
            className={classNames({
              diseibled: selectedGoods.some(product => product.id === good.id),
            })}
          />
          <img
            src="../images/black.png"
            alt="heart"
            className={classNames({
              diseibled: selectedGoods.every(product => product.id !== good.id),
            })}
          />
        </button>
      </div>
      <p>{good.price}</p>

    </div>
  );
};
