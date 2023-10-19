import items from './mock.json';
import FoodList from './FoodList';
import { useState } from 'react';


function App() {
  const [order, setOrder] = useState('createdAt');
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const handleEarlyClick = () => setOrder('createdAt');
  const handleCalorieClick = () => setOrder('calorie');
  
  return (
    <div>
      <button onClick={handleEarlyClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <FoodList items={sortedItems} />
    </div>
  );
}

export default App;