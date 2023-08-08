import { useState } from "react";

const useHandleListCheck = (initialList: string[]) => {
  const [checkedList, setCheckedList] = useState(initialList);

  const handleListCheck = (id: string) => {
    setCheckedList(prevList => {
      if (prevList.includes(id)) {
        return prevList.filter(item => item !== id);
      }
      return [...prevList, id];
    });
  };
  return { checkedList, handleListCheck };
};
export default useHandleListCheck;
