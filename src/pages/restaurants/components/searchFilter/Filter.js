import './styles/Filter.css';
import { TreeSelect } from 'antd';
import { useState } from 'react';
import {useLanguage} from "../../../../contexts/LanguageContext";
import {getTreeData} from "../../helpers/filterHelper";

function Filter({ handleFilter }) {
  const { text, language } = useLanguage();
  const [value, setValue] = useState();

  const onChange = (newValue) => {
    setValue(newValue);
    handleFilter(newValue, 0, 10);
  };

  return (
    <div className="filter">
      <TreeSelect
        showSearch
        style={{
          width: '100%',
        }}
        dropdownStyle={{
          maxHeight: 400,
          overflow: 'auto',
        }}
        placeholder={text.filter.placeholder}
        allowClear
        multiple
        treeData={getTreeData(language)}
        size="large"
        maxTagCount={5}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Filter;