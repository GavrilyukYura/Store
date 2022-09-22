import React, { useState } from 'react';
import classNames from 'classnames';
import { GoodsItem } from '../GoodsItem';
import './GoodsList.scss';

type Props = {
  goods: Goods[];
  selected: (good: Goods) => void;
  selectedGoods: Goods[];
};

export const GoodsList: React.FC<Props> = ({ goods, selected, selectedGoods }) => {
  const [fourInRow, setFourInRow] = useState(true);
  const [twoInRow, setTwoInRow] = useState(false);

  const toggle = () => {
    setFourInRow(!fourInRow);
    setTwoInRow(!twoInRow);
  };

  return (
    <div>
      <div className="menu">
        <button
          className="toggler"
          type="button"
          onClick={() => {
            if (!twoInRow) {
              toggle();
            }
          }}
        >
          <img
            src="../images/Component1.svg"
            alt="icon"
            className={classNames({ disaibled: !twoInRow })}
          />
          <img
            src="../images/Component3.svg"
            alt="icon"
            className={classNames({ disaibled: twoInRow })}
          />
        </button>
        <button
          className="toggler"
          type="button"
          onClick={() => {
            if (!fourInRow) {
              toggle();
            }
          }}
        >
          <img
            src="../images/Component2.svg"
            alt="icon"
            className={classNames({ disaibled: fourInRow })}
          />
          <img
            src="../images/Component4.svg"
            alt="icon"
            className={classNames({ disaibled: !fourInRow })}
          />
        </button>
      </div>
      <ul className={classNames('catalog', {
        twoInRow,
      })}
      >
        {goods.map(good => (
          <GoodsItem
            good={good}
            twoInRow={twoInRow}
            selected={selected}
            selectedGoods={selectedGoods}
            key={good.id}
          />
        ))}
      </ul>
    </div>
  );
};
