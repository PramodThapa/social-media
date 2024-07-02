import { useState } from "react";

const useTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
  };
};

export default useTabs;
