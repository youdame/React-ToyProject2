export async function getFoods(order = 'createdAt'){
  const query = `order=${order}`
  const response = await fetch(`https://learn.codeit.kr/4062/foods?${query}`);
  const result = await response.json();
  return result;
}