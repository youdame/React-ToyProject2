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
const INITIAL_VALUES = {
  imgFile: null,
  title: "",
  calorie: 0,
  content: "",
};

function FoodForm({
  initialValues = INITIAL_VALUES,
  onSubmitSuccess,
  onCancel,
  onSubmit,
  initialPreview
}) {


  const [values, setValues] = useState(initialValues);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("values : ", values);
    const formData = new FormData();
    formData.append("imgFile", values.imgFile);
    formData.append("title", values.title);
    formData.append("calorie", values.calorie);
    formData.append("content", values.content);
    let result;
    try {
      setIsSubmitting(true);
      setSubmittingError(null);
      result = await onSubmit(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }

    setValues(INITIAL_VALUES);
    console.log("result : ", result);
    const { food } = result;
    onSubmitSuccess(food);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
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
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {onCancel && <button onClick={onCancel}>취소</button>}
      {submittingError && <div>{submittingError.message}</div>}
    </form>
  );
}

export default FoodForm;
