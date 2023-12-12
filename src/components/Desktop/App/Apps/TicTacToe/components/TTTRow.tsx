import {TTTBtn} from "./TTTBtn.tsx";

type TTTRowProps = {
  rowIndex: number;
  rowBtnStates: number[];
}

export function TTTRow(props: TTTRowProps){

  return (
    <tr>
      <TTTBtn btnIndex={props.rowIndex * 3 - 3} btnState={props.rowBtnStates[0]}/>
      <TTTBtn btnIndex={props.rowIndex * 3 - 2} btnState={props.rowBtnStates[1]}/>
      <TTTBtn btnIndex={props.rowIndex * 3 - 1} btnState={props.rowBtnStates[2]}/>
    </tr>
  )
}