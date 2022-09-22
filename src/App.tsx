import React, { useEffect, useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';
import classNames from 'classnames';
import {
  useSearchParams,
} from 'react-router-dom';
import { getGoods } from './api';
import { GoodsList } from './components/GoodsList';

const categorys = ['Переглянути все', 'Sale', 'Bestsellers', 'Брюки', 'Джинси', 'Сукні', 'Футболки', 'Топи і світшоти', 'Верхній одяг', 'Обрані'];

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Goods[]>([]);
  const [preparedGoods, setPreparedGoods] = useState<Goods[]>([]);
  const [selectedGoods, setSelectedGoods] = useState<Goods[]>(() => {
    const goodsFromLocalStorage = localStorage.getItem('goods');

    try {
      return goodsFromLocalStorage
        ? JSON.parse(goodsFromLocalStorage)
        : [];
    } catch {
      return [];
    }
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  const onCategoryChange = (value: string) => {
    if (value === 'Переглянути все') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    localStorage.setItem('goods', JSON.stringify(selectedGoods));
  }, [selectedGoods]);

  useEffect(() => {
    if (category) {
      if (category?.includes('Обрані')) {
        setPreparedGoods(selectedGoods);
      } else {
        const newGoods = goods.filter(good => category.includes(good.title));

        setPreparedGoods(newGoods);
      }
    } else {
      setPreparedGoods(goods);
    }
  }, [searchParams, goods, selectedGoods]);

  const request = async () => {
    const res = await getGoods();

    setGoods(res);
  };

  useEffect(() => {
    request();
  }, []);

  const selected = (good: Goods) => {
    if (selectedGoods.includes(good)) {
      setSelectedGoods(selectedGoods.filter(product => product.id !== good.id));
    } else {
      setSelectedGoods((prev) => [...prev, good]);
    }
  };

  return (
    <div className="page">
      <header className="pageHeader">
        <div className="container">
          <img
            src="../images/Shop.svg"
            alt="logo"
            className="logo"
          />
        </div>
      </header>
      <main className="main">
        <div className="container">
          <div className="content">
            <nav className="nav">
              <div className="list">
                {categorys.map(params => (
                  <button
                    key={params}
                    className={classNames(
                      'list__button',
                      {
                        'list__button-active': params === category || (!category && params === 'Переглянути все'),
                      },
                    )}
                    type="button"
                    onClick={() => onCategoryChange(params)}
                  >
                    {params}
                  </button>
                ))}
              </div>
            </nav>
            <div className="catalog">
              <GoodsList
                goods={preparedGoods}
                selected={selected}
                selectedGoods={selectedGoods}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="pageFooter">
        <div className="container">
          <img
            src="../images/footer.svg"
            alt="logo"
            className="logo"
          />
        </div>
      </footer>
    </div>
  );
};
