import FoodList from './FoodList';
import { useState, useEffect } from 'react';
import { getFoods } from '../api';

function App() {
  const [order, setOrder] = useState('createdAt');
  const [items, setItems] = useState([]);

  const handleEarlyClick = () => setOrder('createdAt');
  const handleCalorieClick = () => setOrder('calorie');
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleLoad = async () => {
    const {foods} = await getFoods();
    setItems(foods);
  }
  
  useEffect(() => {handleLoad()}, []);

  return (
    <div>
      <button onClick={handleEarlyClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;