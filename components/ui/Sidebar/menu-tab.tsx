'use client';

import clsx from "clsx";
import Link from "next/link"
import { useState } from "react";

type MenuItemProperties = {
  onSelected: (id:string)=>void,
  selectedItemId: string,
  itemId: string,
  label: string,
  href: string
}

const MenuItem = (props: MenuItemProperties) => {

  return (
    <Link 
      href={props.href}
      onClick={()=>props.onSelected(props.itemId)}
      className={clsx("hover:text-indigo-500 border-b", {
        "border-indigo-600": props.selectedItemId === props.itemId
      })}
    >
      {props.label}
    </Link>
  )
}

const MenuTab = () => {

  const [selectedItem, setSelectedItem] = useState("1");

  return (
    <div className="flex flex-row space-x-4 items-center mb-4">
      <MenuItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItem}
        itemId="1"
        label="All"
        href='#'
      />
      <MenuItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItem}
        itemId="2"
        label="Transcription"
        href='#'
      />
      <MenuItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItem}
        itemId="3"
        label="Audio"
        href='#'
      />
      <MenuItem
        onSelected={setSelectedItem}
        selectedItemId={selectedItem}
        itemId="4"
        label="Video"
        href='#'
      />
    </div>
  )
}

export default MenuTab;