export async function getReviews(order = 'createdAt') {
  const query = `order=${order}`;
  const response = await fetch(
    `https://learn.codeit.kr/4062/film-reviews?${query}`
  );
  if (!response.ok) {
    throw new Error('리뷰를 불러오는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}