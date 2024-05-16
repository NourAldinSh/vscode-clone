import { useState } from "react";
import { IFile } from "../interfaces";
import { BottomArrowIcon, RightArrowIcon } from "./SVG/Arrows";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import { setClickedFileAction, setOpenedFilesAction } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";
import { doesFileObjectExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { id, isFolder, name, children, content } = fileTree;
  const dispatch = useDispatch();
  const { openedFiles } = useSelector((state: RootState) => state.tree);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // ** Handlers
  const toggle = () => setIsOpen((prev) => !prev);
  const onFileClicked = () => {
    const exists = doesFileObjectExist(openedFiles, id);
    dispatch(setClickedFileAction({ activeTabId: id, filename: name, fileContent: content }));
    if (exists) return;
    dispatch(setOpenedFilesAction([...openedFiles, fileTree]));
  };

  return (
    <div className="ml-3 cursor-pointer">
      <div className="flex items-center mb-2 select-none">
        {isFolder ? (
          <div className="flex items-center gap-2 " onClick={toggle}>
            <div className="flex items-center gap-1">
              {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
              <RenderFileIcon filename={name} isFolder={isFolder} isOpen={isOpen} />
            </div>
            <span>{name}</span>
          </div>
        ) : (
          <div className="flex items-center mr-2" onClick={onFileClicked}>
            <RenderFileIcon filename={name} />
            <span className="ml-1">{name}</span>
          </div>
        )}
      </div>
      {isOpen && children?.map((file, idx) => <RecursiveComponent fileTree={file} key={idx} />)}
    </div>
  );
};

export default RecursiveComponent;
