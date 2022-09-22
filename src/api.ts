const API_URL = ' http://localhost:3000/goods';

export function getGoods(): Promise<Goods[]> {
  return fetch(`${API_URL}`)
    .then(res => res.json());
}
