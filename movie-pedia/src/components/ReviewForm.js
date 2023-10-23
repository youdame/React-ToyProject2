import { useState, } from 'react';
import "./ReviewForm.css";
function ReviewForm() {
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleRatingChange = (e) =>{
    const nextRating = Number(e.target.value) || 0;
    setRating(e.target.value);
  }

  const handleContentChange = (e) =>{
    setContent(e.target.value);
  }


  return (
    <form className='ReviewForm'> 
      <input value={title} onChange={handleTitleChange}></input>
      <input type ="number" value = {rating} onChange={handleRatingChange}></input>
      <textarea value={content} onChange={handleContentChange}></textarea>
    </form>
  )
}

export default ReviewForm;