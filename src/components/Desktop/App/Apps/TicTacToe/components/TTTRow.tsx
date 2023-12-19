import { TTTBtn } from "./TTTBtn.tsx";

type TTTRowProps = {
  rowIndex: number;
  isBtnDisabled: (index: number) => boolean;
  getBtnState: (index: number) => string | JSX.Element;
  setField: (index: number) => void;
}

export function TTTRow(props: TTTRowProps) {

  return (
    <tr>
      <TTTBtn btnIndex={props.rowIndex * 3 - 3}
              isBtnDisabled={props.isBtnDisabled}
              getBtnState={props.getBtnState}
              setField={props.setField} />
      <TTTBtn btnIndex={props.rowIndex * 3 - 2}
              isBtnDisabled={props.isBtnDisabled}
              getBtnState={props.getBtnState}
              setField={props.setField} />
      <TTTBtn btnIndex={props.rowIndex * 3 - 1}
              isBtnDisabled={props.isBtnDisabled}
              getBtnState={props.getBtnState}
              setField={props.setField} />
    </tr>
  );
}