import { useDispatch, useSelector } from "react-redux";
import { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import { setClickedFileAction, setOpenedFilesAction, setTabIdToRemoveAction } from "../app/features/fileTreeSlice";
import { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

const OpenedFilesBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();

  const {
    openedFiles,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.tree);

  // ** Handlers
  const onClick = () => {
    const { id, name, content } = file;
    dispatch(setClickedFileAction({ activeTabId: id, filename: name, fileContent: content }));
  };

  const onRemove = (selectedId: string) => {
    const filtered = openedFiles.filter((file) => file.id !== selectedId);
    const lastTab = filtered[filtered.length - 1];
    if (!lastTab) {
      dispatch(setOpenedFilesAction([]));
      dispatch(setClickedFileAction({ activeTabId: null, fileContent: "", filename: "" }));
      return;
    }
    const { id, content, name } = lastTab;
    dispatch(setOpenedFilesAction(filtered));
    dispatch(setClickedFileAction({ activeTabId: id, fileContent: content, filename: name }));

    console.log(filtered);
  };

  return (
    <div
      className={`flex items-center cursor-pointer justify-center  w-fit p-2 select-none border-t-2 ${
        file.id === activeTabId ? "border-[#cf6ccf]" : "border-transparent"
      }`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setTabIdToRemoveAction(file.id));
      }}
    >
      <RenderFileIcon filename={file.name} />
      <span className="mx-1">{file.name}</span>
      <span
        className="hover:bg-[#64646473] duration-300 p-1 cursor-pointer rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFilesBarTab;
