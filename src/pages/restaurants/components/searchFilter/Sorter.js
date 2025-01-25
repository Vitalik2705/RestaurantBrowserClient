import { Radio } from "antd";
import { useState } from "react";
import "./styles/Sorter.css";
import {useLanguage} from "../../../../contexts/LanguageContext";

const Sorter = ({ handleSort }) => {
  const { text } = useLanguage();
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    handleSort(selectedValue);
  };

  return (
    <div className="sorter">
      <div className="sorter-container">
        <div className="sorter-header">{text.sorter.header}</div>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>{text.sorter.options.popularity}</Radio>
          <Radio value={2}>{text.sorter.options.rating}</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Sorter;