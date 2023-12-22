import Container from "../../home/container";
import { Button } from "../button";
import MenuTab from "./menu-tab";
import FolderList from "./folder-list";

const SideBar = () => {
  
  return (
    <Container className="items-center lg:w-1/4 h-3/4 border border-stone-300">
      <div className="m-5">
        <MenuTab/>
        <div className="mb-3">
          <Button
            className="px-6 py-2 text-white bg-indigo-600 rounded-md md:w-full"
          >
            <span>Upload Files</span>
          </Button>
        </div>
        <h5 className="font-bold antialiased mb-3">Folders</h5>
        <FolderList/>
      </div>
    </Container>
  )
}

export default SideBar;