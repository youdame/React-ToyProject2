import FoodList from "./FoodList";
import { useState, useEffect } from "react";
import { createFood, deleteFood, getFoods, updateFood } from "../api";
import FoodForm from "./FoodForm";
import LocaleContext from "../contexts/LocaleContext";
function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState("");

  const handleEarlyClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");

  const handleDelete = async (id) => {
    const result = await deleteFood(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
  };
  const handleLoadMore = () => handleLoad({ order, cursor, search });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [...prevItems, review]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, search });
  }, [order, search]);

  return (
    <LocaleContext.Provider value={"ko"}>
      <div>
        <FoodForm onSubmit={createFood} onSubmitSuccess={handleCreateSuccess} />

        <button onClick={handleEarlyClick}>최신순</button>
        <button onClick={handleCalorieClick}>칼로리순</button>
        <form onSubmit={handleSearchSubmit}>
          <input name="search" />
          <button type="submit">검색</button>
        </form>
        <FoodList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {cursor && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && <p>loadingError.message</p>}
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
