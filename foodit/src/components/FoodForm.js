import { useState } from "react";
function FoodForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
  });

  function sanitize(type, value) {
    switch (type) {
      case "number":
        return Number(value) || 0;

      default:
        return value;
    }
  }

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: sanitize(type, value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} value={values.title} />
      <input
        name="calorie"
        type="number"
        onChange={handleChange}
        value={values.calorie}
      />
      <textarea name="content" onChange={handleChange} value={values.content} />
      <button name="submit">확인</button>
    </form>
  );
}

export default FoodForm;
