import {Radio} from "antd";
import {useState} from "react";
import "../styles/Sorter.css";

const Sorter = ({ handleSort }) => {
    const [value, setValue] = useState(1);

    const onChange = (e) => {
        const selectedValue = e.target.value;
        console.log(selectedValue)
        setValue(selectedValue);
        handleSort(selectedValue);
    };

    return (
        <div className="sorter">
            <div className="sorter-container">
                <div className="sorter-header">Сортувати за: </div>
                <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>популярністю</Radio>
                    <Radio value={2}>рейтингом</Radio>
                </Radio.Group>
            </div>
        </div>
    );
};


export default Sorter;