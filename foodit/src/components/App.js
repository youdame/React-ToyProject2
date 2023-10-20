import FoodList from './FoodList';
import { useState, useEffect } from 'react';
import { getFoods } from '../api';

function App() {
  const [order, setOrder] = useState('createdAt');
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState('');



  const handleEarlyClick = () => setOrder('createdAt');
  const handleCalorieClick = () => setOrder('calorie');
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleLoad = async (options) => {
    const { foods, paging } = await getFoods(options);

    setCursor(paging.nextCursor);

    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }

  }
  const handleLoadMore = () => handleLoad({ order, cursor });

  useEffect(() => { handleLoad({ order }) }, [order]);

  return (
    <div>
      <button onClick={handleEarlyClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {cursor && <button onClick={handleLoadMore}>더 보기</button>}
    </div>
  );
}

export default App;