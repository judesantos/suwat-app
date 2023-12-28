'use client';

import * as ContextMenu from '@radix-ui/react-context-menu';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useReducer } from 'react';
import { Button } from './ui/button';
import { FileIcon } from 'lucide-react';

const styles = {
  fileList: "h-full w-full p-5",
  fileContainer: "",
  file: "flex flex-row space-x-1",
  fileIcon: "w-5 h-5",
  fileName: "truncate",
  dropzone: "",
  files: "w-full h-full hover:bg-red-100",
  uploadMessage: ""
}

type ListViewFileItemProps = {
  name: string,
  lastModified: string,
  data: any,
  dispatch:({})=>void
}
const ListViewFileItem = (props: ListViewFileItemProps) => {

  const deleteFile =() => {
    const file = props.data.files?.find((f:any)=>f.name === props.name)
    console.log({file})
    props.dispatch({type: "DELETE_FILE_FROM_LIST", files: [file]})
  }

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div
          className="data-tooltip-target=${f.name} cursor-default hover:bg-indigo-100"
        >
          <li key={props.lastModified} className={styles.file}>
            <FileIcon
              className={styles.fileIcon}
            />
            <div className={styles.fileName}>
              {props.name}
            </div>
          </li>
          {/*f?.name.length &&
            <span 
              className="tooltip absolute z-100 inline-block group-hover:visible
              text-white rounded-sm left-0 top-0 invisible transition-all ease-in-out delay-200 duration-0
                  w-max px-3 bg-zinc-600"
            >
              {f.name}
            </span> 
          */}
        </div>
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content
          className="flex flex-row m-5 w-1/3 text-left bg-stone-200 border-2 border-stone-500"
        >
          <ContextMenu.Item>
            <div
              className="relative w-full px-2 py-3 border-b-2 border-gray-200 cursor-pointer bg-red-100"
              onClick={()=>deleteFile()}
            >
              Delete
            </div>
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}

const DropArea = ({data, dispatch}: {data:any, dispatch:({})=>void}) => {

  const dragEnter = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('dragEnter');
    dispatch({type: "SET_DRAGGING", dragging: data.dragging + 1})
    dispatch({type: "SET_IN_DROP_ZONE", inDropZone: true})
  }
  
  const dragLeave = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({type: "SET_DRAGGING", dragging: data.dragging - 1})
    if (0 === data.dragging) {
      console.log('dragLeave');
      dispatch({type: "SET_IN_DROP_ZONE", inDropZone: false})
    }
  }

  const dragOver = (e:any) => {
    e.preventDefault();
    console.log('dragOver');
    e.dataTransfer.dropEffect = 'copy';
    e.dataTransfer.effectAllowed = 'move'
    //dispatch({type: "SET_IN_DROP_ZONE", inDropZone: true})
    return false;
  }

  const drop = (e:any) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('drop');
    
    if (e.dataTransfer) {

      const fileList: FileList = e.dataTransfer.files;
      let files = Array.from(fileList);

      const existingFiles = data?.files?.map((f:File) => f.name)

      if (existingFiles?.length)
        files = files?.filter((f:File) => !existingFiles?.includes(f.name))

      if (files) {
        dispatch({type: "ADD_FILE_TO_LIST", files})
      }

      e.dataTransfer.clearData();
      e.target.value = null;
    }

    dispatch({type: "SET_DRAGGING", dragging: 0})
    dispatch({type: "SET_IN_DROP_ZONE", inDropZone: false})

    return false;
  }

  const handleFileSelect = (e:any) => {
    let files = [...e.target.files];
    if (files && files.length > 0) {
      const existingFiles = data?.files?.map((f:any) => f.name);
      if (existingFiles?.length)
        files = files.filter((f) => !existingFiles.includes(f.name));
      if (files) {
        dispatch({ type: "ADD_FILE_TO_LIST", files });
      }
      e.currentTarget.value = null;
    }
  };

  const uploadFiles = async () => {

    const formData = new FormData();
    const files = data.files;

    files.forEach((file:any) => formData.append("file", file));
    const response = await fetch("/api/upload-files", {
      method: "POST",
      body: formData,
    });

    //successful file upload
    if (response.ok) {
      // purge files
      dispatch({type:"DELETE_FILES_FROM_LIST", files: data.files})
      alert("Files uploaded successfully");

    } else {
      // unsuccessful file upload
      alert("Error uploading files");
    }
  };

  return (
    <>
      <div
        className="w-full flex pb-3 space-x-1 justify-end"
      >
        <label 
          id="btnUpload"
          htmlFor="fileSelect"
          className=""
        >
          <input 
            onChange={(e)=>handleFileSelect(e)}
            id="fileSelect"
            type="file" 
            multiple 
          />
          <div
            className="justify-center align-middle flex flex-row
              space-x-2 px-6 py-2 text-white bg-indigo-600 rounded-md cursor-pointer"
          >
            <CloudArrowUpIcon 
              className='h-6 w-6'
            />
            <span
              className="w-full"
            >
              Add file to list
            </span>
          </div>
        </label>
        <Button
          className="bg-black text-white"
          onClick={uploadFiles}
        >
          Save Files
        </Button>
      </div>
      <div 
        id="dropzone"
        className="z-1000 w-full min-h-full border-4 border-slate-300 border-spacing-4
          border-dotted hover:bg-gray-100
            transition duration-500"
        onDragEnter={dragEnter}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
        onDrop={drop}
      >
        <div
          className="w-full h-5 text-center flex flex-col mb-7 font-semibold text-indigo-500"
        >
          <span className='text-center w-full'>
            Search or drag files here.
          </span>
          <span className='text-center w-full'>
            Accepted formats: <i>*.wav, *.mp3, *.txt</i>
          </span>
        </div>
        <div className={styles.fileList}>
          <div className={styles.fileContainer}>
            {/* loop over the fileData */}
            {data?.files?.map((f: any) => {
              return (
                <>
                  <ol>
                    <div
                      className="group relative"
                    >
                      <ListViewFileItem
                        name={f.name}
                        lastModified={f.lastModified}
                        data={data}
                        dispatch={dispatch}
                      />
                    </div>
                  </ol>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "DELETE_FILE_FROM_LIST":
      return {
        ...state,
        files: state.files.filter((f:File) => {
          return action?.files.find((_f:File) => {
            f.name === _f.name
          });
        })
      }
    case "SET_DRAGGING":
      return { ...state, dragging: action.dragging }
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone }
    case "ADD_FILE_TO_LIST":
      if (!state.files) {
        state.files = [];
      }
      return { ...state, files: state.files.concat(action.files) }
    default:
      return state;
  }
}

export default async function FileDrop() {

  const [data, dispatch] = useReducer(reducer, {
    dragging: 0,
    inDropZone: false,
    files: []
  });

  return (
    <DropArea data={data} dispatch={dispatch}/>
  )
}
