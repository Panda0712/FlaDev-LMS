import { useState } from "react";

const useToggleLessons = ({ toggleData, itemData, activeAttribute }) => {
  const [openItemList, setOpenItemList] = useState(
    toggleData?.map((_, index) => ({
      current: index,
      active: false,
    }))
  );
  const [currentActiveLesson, setCurrentActiveLesson] = useState(
    toggleData?.[0]?.[itemData]?.[0]?.[activeAttribute]
  );

  const handleChangeActiveLesson = (activeValue) => {
    if (activeValue === currentActiveLesson) return;

    setCurrentActiveLesson(activeValue);
  };

  const handleToggleList = (index) => {
    setOpenItemList((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, active: !item.active } : item
      )
    );
  };

  return {
    openItemList,
    currentActiveLesson,
    handleToggleList,
    handleChangeActiveLesson,
  };
};

export default useToggleLessons;
