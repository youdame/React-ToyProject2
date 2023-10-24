import { useState } from "react";

function FileInput() {
  const [value, setValue] = useState();

  

  const handleChange = (e) => {
    console.log(e.target.files);
  };
  return <input type="file" onChange={handleChange} />;
}

export default FileInput;
