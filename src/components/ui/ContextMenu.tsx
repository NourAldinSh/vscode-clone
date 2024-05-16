import { useEffect, useRef } from "react";
import { setOpenedFilesAction } from "../../app/features/fileTreeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface IProps {
  setShowMenu: (val: boolean) => void;
  positions: {
    x: number;
    y: number;
  };
}

const ContextMenu = ({ positions: { x, y }, setShowMenu }: IProps) => {
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement>(null);
  const { openedFiles, tabIdToRemove } = useSelector((state: RootState) => state.tree);

  // ** Handlers
  const onCloseAll = () => {
    dispatch(setOpenedFilesAction([]));
    setShowMenu(false);
  };
  const onCloseTab = () => {
    const filtered = openedFiles.filter((file) => file.id !== tabIdToRemove);
    dispatch(setOpenedFilesAction(filtered));
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(handleClickOutside);
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <div ref={menuRef}>
      <ul style={{ position: "absolute", left: x, top: y }} className="bg-white text-black w-28 p-2 rounded-md ">
        {tabIdToRemove ? (
          <li className="text-sm px-3 py-1 rounded-md hover:bg-gray-100 duration-300 cursor-pointer text-gray-500" onClick={onCloseTab}>
            Close
          </li>
        ) : null}
        <li className="text-sm px-3 py-1 rounded-md hover:bg-gray-100 duration-300 cursor-pointer text-gray-500" onClick={onCloseAll}>
          Close All
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
