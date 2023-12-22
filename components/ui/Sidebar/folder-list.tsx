'use client';

import Link from 'next/link';
import { FolderIcon, FolderOpenIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import clsx from 'clsx';

type FolderItemProperties = {
  onSelected: (id:string)=>void,
  selectedItemId: string,
  itemId: string,
  label: string,
  href: string
}

const FolderItem = (props: FolderItemProperties) => {

  return (
    <li className="flex flex-col items-start sm:flex-row py-1 border-b">
      <Link
        href={props.href} 
        onClick={()=>props.onSelected(props.itemId)}
        className="flex items-center space-x-2"
      >
        {props.selectedItemId === props.itemId ?
          <FolderOpenIcon className="h-5 w-5 mr-3"/> :
          <FolderIcon className="h-5 w-5 mr-3"/>
        }
        <span
          className={clsx("hover:text-indigo-500", {
            "text-indigo-600": props.selectedItemId === props.itemId
          })}
        >
          {props.label}
        </span>
      </Link>
    </li>
  )
}

const FolderList = () => {

  const [selectedItemId, setSelectedItem] = useState("0");

  return (
    <ul className="#">
      <FolderItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItemId}
        itemId="1"
        label="Files"
        href="#"
      />
      <FolderItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItemId}
        itemId="2"
        label="Pictures"
        href="#"
      />
      <FolderItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItemId}
        itemId="3"
        label="WebPages"
        href="#"
      />
      <FolderItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItemId}
        itemId="4"
        label="Illustrations"
        href="#"
      />
      <FolderItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItemId}
        itemId="5"
        label="Films"
        href="#"
      />
      <FolderItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItemId}
        itemId="6"
        label="Books"
        href="#"
      />
    </ul>
  )
}

export default FolderList;