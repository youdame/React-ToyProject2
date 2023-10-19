import mockItems from '../mock.json';
import FoodList from './FoodList';
import { useState } from 'react';


function App() {
  const [order, setOrder] = useState('createdAt');
  const [items, setItems] = useState(mockItems);

  const handleEarlyClick = () => setOrder('createdAt');
  const handleCalorieClick = () => setOrder('calorie');
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  return (
    <div>
      <button onClick={handleEarlyClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
    </div>
  );
}

export default App;