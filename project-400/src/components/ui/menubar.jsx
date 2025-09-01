"use client";

import React from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from "./Menubar";

export default function MenubarExample() {
  return (
    <div className="p-4">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => alert("New File clicked")}>
              New File
            </MenubarItem>
            <MenubarItem onClick={() => alert("Open File clicked")}>
              Open File
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Recent Files</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={() => alert("File1.txt clicked")}>
                  File1.txt
                </MenubarItem>
                <MenubarItem onClick={() => alert("File2.txt clicked")}>
                  File2.txt
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => alert("Undo clicked")}>
              Undo
            </MenubarItem>
            <MenubarItem onClick={() => alert("Redo clicked")}>
              Redo
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Zoom</MenubarLabel>
            <MenubarItem onClick={() => alert("Zoom In clicked")}>
              Zoom In
            </MenubarItem>
            <MenubarItem onClick={() => alert("Zoom Out clicked")}>
              Zoom Out
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
