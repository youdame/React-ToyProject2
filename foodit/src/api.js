export async function getFoods(){
  const response = await fetch('https://learn.codeit.kr/4062/foods');
  const result = await response.json();
  return result;
}