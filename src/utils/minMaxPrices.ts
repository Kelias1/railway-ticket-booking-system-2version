import { MinMaxPrices } from '../models/index';
import { IItem } from '../models/interfaces';

export function minMaxPrices(array: IItem[]): MinMaxPrices {
  if (array && array.length > 0) {
    const pricesClasses = array.map((elem) => elem.departure.price_info);
    const allPrices: number[] = [];
    pricesClasses.map((elem) => {
      if (elem.first) {
        if (elem.first.top_price) {
          allPrices.push(elem.first.top_price);
        };
        if (elem.first.bottom_price) {
          allPrices.push(elem.first.bottom_price);
        };
        if (elem.first.side_price) {
          allPrices.push(elem.first.side_price);
        };
      };

      if (elem.second) {
        if (elem.second.top_price) {
          allPrices.push(elem.second.top_price);
        };
        if (elem.second.bottom_price) {
          allPrices.push(elem.second.bottom_price);
        };
        if (elem.second.side_price) {
          allPrices.push(elem.second.side_price);
        };
      };

      if (elem.third) {
        if (elem.third.top_price) {
          allPrices.push(elem.third.top_price);
        };
        if (elem.third.bottom_price) {
          allPrices.push(elem.third.bottom_price);
        };
        if (elem.third.side_price) {
          allPrices.push(elem.third.side_price);
        };
      };

      if (elem.fourth) {
        if (elem.fourth.top_price) {
          allPrices.push(elem.fourth.top_price);
        };
        if (elem.fourth.bottom_price) {
          allPrices.push(elem.fourth.bottom_price);
        };
        if (elem.fourth.side_price) {
          allPrices.push(elem.fourth.side_price);
        };
      };

      return elem;
    });

    const minPrice = allPrices.sort((a, b) => a - b)[0];
    const maxPrice = allPrices.sort((a, b) => b - a)[0];

    return {
      minPrice,
      maxPrice,
      allPrices
    };
  };

  return {
    minPrice: 0,
    maxPrice: 7000,
    allPrices: []
  };
};

export function filteringPricesRange(min: number, max: number, array: IItem[]): IItem[] {
  return array.filter((e) => minMaxPrices([e]).allPrices.some((elem) => min <= elem && max >= elem));
};