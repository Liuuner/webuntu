import { Button } from "@mui/material";
import { EEntryType, IEntry, IFileEntry } from "indexeddb-fs/dist/types";

type EntryBtnProps = {
  entry: IEntry<EEntryType>,
  setPath: (path: string) => void
}

export function EntryBtn(props: EntryBtnProps){
  function onClick(){
    if (props.entry.type == "file"){
      const file = props.entry as IFileEntry
      console.log("Implement file view")
      console.log(file.data)
    }
    else {
      props.setPath(props.entry.fullPath)
    }
  }

  return (
    <Button onClick={onClick}>
      {/*TODO: add image of file by type*/}
      {props.entry.name}
    </Button>
  )
}