'use client'

import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  return (
    <div>
      <label>
        Text input:
        <input
          className="bg-orange-200"
          name="myInput"
          onChange={onChange}
          value={text}
        />
      </label>
      <div>
        <b>값: </b>
        {text}
      </div>
    </div>
  );
}
