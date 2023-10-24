import { useState } from "react";
import FileInput from "./FileInput";
function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm() {
  const [values, setValues] = useState({
    imgFile: null,
    title: '',
    calorie: 0,
    content: '',
  });


  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    handleChange(name, sanitize(type, value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      />
      <input name="title" onChange={handleInputChange} value={values.title} />
      <input
        name="calorie"
        type="number"
        onChange={handleInputChange}
        value={values.calorie}
      />
      <input
        name="content"
        onChange={handleInputChange}
        value={values.content}
      />
      <button type="submit">확인</button>
    </form>
  );
}

export default FoodForm;
