import '../styles/Filter.css';
import {TreeSelect} from "antd";
import {useState} from "react";
import treeData from '../data/treeData.json';

function Filter({handleFilter}) {
    const [value, setValue] = useState();
    const onChange = (newValue) => {
        setValue(newValue);
        handleFilter(newValue, 0, 10)
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
                placeholder="Виберіть фільтр"
                allowClear
                multiple
                treeData={treeData}
                size={"large"}
                maxTagCount={5}
                onChange={onChange}
                value={value}
            />
        </div>
    );
}

export default Filter;