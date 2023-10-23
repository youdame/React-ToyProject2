import { useState } from 'react';
function FoodForm() {

  const [title, setTitle] = useState('');
  const [calorie, setCalorie] = useState(0);
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handleCalorieChange = (e) => {
    const nextCalorie = Number(e.target.value) || 0;
    setCalorie(nextCalorie);
  }
  const handleContentChange = (e) => {
    setContent(e.target.value);
  }
  return (
    <form >
      <input name="title" onChange={handleTitleChange} value={title} />
      <input name="calorie" type="number" onChange={handleCalorieChange} value={calorie} />
      <textarea name="content" onChange={handleContentChange} value={content} />
    </form>
  )
}

export default FoodForm;