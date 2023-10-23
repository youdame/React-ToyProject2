import FoodList from './FoodList';
import { useState, useEffect } from 'react';
import { getFoods } from '../api';
import FoodForm from './FoodForm';
function App() {
  const [order, setOrder] = useState('createdAt');
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState('');

  const handleEarlyClick = () => setOrder('createdAt');
  const handleCalorieClick = () => setOrder('calorie');

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getFoods(options);

    } catch (error) {
      setLoadingError(error);
    } finally {
      setIsLoading(false);
    }

    const { foods, paging } = result;
    setCursor(paging.nextCursor);

    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }

  }
  const handleLoadMore = () => handleLoad({ order, cursor, search });


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target['search'].value);
  };

  useEffect(() => { handleLoad({ order, search }) }, [order, search]);

  return (
    <div>
      <FoodForm  />

      <button onClick={handleEarlyClick}>최신순</button>
      <button onClick={handleCalorieClick}>칼로리순</button>
      <form onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {cursor && <button disabled={isLoading} onClick={handleLoadMore}>더 보기</button>}
      {loadingError?.message && <p>loadingError.message</p>}
    </div>
  );
}

export default App;