export async function getFoods(order = 'createdAt', cursor = '', limit = 10){
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`https://learn.codeit.kr/api/foods?${query}`);

  if(!response.ok){
    throw new Error('데이터를 불러오는데 실패했습니다');
  }
  const result = await response.json();
  return result;
}