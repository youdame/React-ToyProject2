import { useEffect, useState } from 'react';
import ReviewList from './ReviewList';
import { getReviews } from '../api';

function App() {
  const LIMIT = 6;
  const [order, setOrder] = useState('createdAt');
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const handleNewestClick = () => setOrder('createdAt');

  const handleBestClick = () => setOrder('rating');

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {

    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;

    } finally {
      setIsLoading(false);

    }

    const { reviews, paging } = result;
    // 처음에 보여줄 때
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      // 그 이후로 보여줄 떄
      setItems((prevItems)=>[...prevItems, ...reviews])
    }
    setOffset(options.offset + options.limit);
    setHasNext(paging.hasNext);
  };


  const handleLoadMore = async () => {
    await handleLoad({ order, offset, limit: LIMIT });

  }

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleNewestClick}>최신순</button>
        <button onClick={handleBestClick}>베스트순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete} />
      {hasNext && <button disabled={isLoading} onClick={handleLoadMore}>더 보기</button>}

      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
