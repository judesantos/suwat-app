import Link from "next/link";
import { DocumentIcon, FilmIcon, MusicalNoteIcon } from '@heroicons/react/24/solid';

const FileIcon = (prop: any) => {
  return (
    <>
    {prop.type === "text" &&
      <DocumentIcon className="w-full h-20 items-center justify-center text-zinc-300"/>
    }
    {prop.type === 'video' &&
      <FilmIcon className="w-full h-20 items-center justify-center text-zinc-300"/>
    }
    {prop.type === 'audio' &&
      <MusicalNoteIcon className="w-full h-20 items-center justify-center text-zinc-300"/>
    }
    </>
  )
}

const File = (prop: any) => {
  return (
    <Link
      className="group relative"
      href="#"
    >
      <div 
        className="z-0 flex flex-col mr-5 mb-5 w-48
          border border-stone-300 data-tooltip-target=${prop.name}">
        <div className="items-center justify-center mx-5 my-3">
            {/*
              <DocumentIcon className="w-full h-20 bg-white items-center justify-center text-zinc-300"/>
            */}
            <FileIcon type={prop.type}/>
        </div>
        <div className="pl-4 pr-3 py-3 h-1/2 border-t border-stone-300">
          <div className="text-blue-500 text-sm truncate ... w-full">
            {prop.name}
          </div>
          <div className="text-xs mt-1">
            <span>
              Added: {prop.date} 
            </span>
          </div>
        </div>
      </div>
      {/** tooltip */}
      {prop?.name.length > 21 &&
        <span 
          className="tooltip z-100 absolute inline-block group-hover:opacity-100 
            text-sm text-white rounded-sm left-10 top-12
              w-max opacity-0 px-3 bg-zinc-600 transition-opacity"
        >
          {prop.name}
        </span> 
      }
    </Link>
  )
};

const FileManager = async () => {
  return (
    <div className="grid grid-cols-4 gap-0">
      <File 
        name="Document 2014.txt" 
        date="Dec. 21, 2023"
        type="text"
      />
      <File 
        name="summer-road-trip-2023.mp3" 
        date="Oct. 11, 2023"
        type="video"
      />
      <File 
        name="Interview with a vampire.wap" 
        date="Sep. 21, 2022"
        type="audio"
      />
      <File 
        name="Scrum-meeting-dec-19-2023.csv" 
        date="Dec. 21, 2023"
        type="text"
      />
      <File 
        name="Annual report 2014.txt" 
        date="Dec. 21, 2023"
        type="text"
      />
      <File 
        name="summer-road-trip-2023.mp3" 
        date="Oct. 11, 2023"
        type="video"
      />
      <File 
        name="Interview with a vampire.wap" 
        date="Sep. 21, 2022"
        type="audio"
      />
      <File 
        name="Scrum-meeting-dec-19-2023.csv" 
        date="Dec. 21, 2023"
        type="text"
      />
      <File 
        name="Annual report 2014.txt" 
        date="Dec. 21, 2023"
        type="text"
      />
      <File 
        name="summer-road-trip-2023.mp3" 
        date="Oct. 11, 2023"
        type="video"
      />
      <File 
        name="Interview with a vampire.wap" 
        date="Sep. 21, 2022"
        type="audio"
      />
      <File 
        name="Scrum-meeting-dec-19-2023.csv" 
        date="Dec. 21, 2023"
        type="text"
      />
      <File 
        name="Annual report 2014.txt" 
        date="Dec. 21, 2023"
        type="text"
      />
      <File 
        name="summer-road-trip-2023.mp3" 
        date="Oct. 11, 2023"
        type="video"
      />
      <File 
        name="Interview with a vampire.wap" 
        date="Sep. 21, 2022"
        type="audio"
      />
      <File 
        name="Scrum-meeting-dec-19-2023.csv" 
        date="Dec. 21, 2023"
        type="text"
      />
    </div>
  );
}

export default FileManager;