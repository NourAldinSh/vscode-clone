import { IFile } from "../interfaces";
import { v4 as uuidv4 } from "uuid";

export const fileTree: IFile = {
  id: uuidv4(),
  name: "VS Code Clone",
  isFolder: true,
  children: [
    {
      id: uuidv4(),
      name: "node_modules",
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: ".vite",
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              name: "react.js",
              isFolder: false,
              content: `interface IProps {
  src: string;
}

const IconImg = ({ src }: IProps) => {
  return <img src={src} className="w-5 h-5" />;
};

export default IconImg;`,
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      name: "public",
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: "index.html",
          isFolder: false,
          content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
        },
      ],
    },
    {
      id: uuidv4(),
      name: "src",
      isFolder: true,
      children: [
        {
          id: uuidv4(),
          name: "components",
          isFolder: true,
          children: [
            {
              id: uuidv4(),
              name: "Button.tsx",
              isFolder: false,
              content: `import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import OpenedFilesBarTab from "./OpenedFilesBarTab";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
              
const OpenedFilesBar = () => {
  const { openedFiles, clickedFile } = useSelector((state: RootState) => state.tree);
  return (
    <div className="w-full">
      <div className="flex items-center border-b-[1px] border-[#ffffff1f]">
        {openedFiles.map((file) => (
          <OpenedFilesBarTab key={file.id} file={file} />
        ))}
      </div>
      <FileSyntaxHighlighter content={clickedFile.fileContent} />
    </div>
  );
};

export default OpenedFilesBar;`,
            },
            {
              id: uuidv4(),
              name: "index.txt",
              isFolder: false,
              content: `Hello Guys <3`,
            },
          ],
        },
      ],
    },
  ],
};
