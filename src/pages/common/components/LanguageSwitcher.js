import { Switch } from "antd";
import { useLanguage } from "../../../contexts/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (checked) => {
    setLanguage(checked ? 'en' : 'uk');
  };

  return (
      <Switch
        checkedChildren="EN"
        unCheckedChildren="UK"
        checked={language === 'en'}
        onChange={handleLanguageChange}
      />
  );
};

export default LanguageSwitcher;