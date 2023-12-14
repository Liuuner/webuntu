type TTTBtnProps = {
  btnIndex: number;
  isBtnDisabled: (index: number) => boolean;
  getBtnState: (index: number) => string;
  setField: (index: number) => void;
}

export function TTTBtn(props: TTTBtnProps) {

  return (
    <td>
      <button className={"ttt-btn " + props.btnIndex}
              disabled={props.isBtnDisabled(props.btnIndex)}
              onClick={() => props.setField(props.btnIndex)}>{
        props.getBtnState(props.btnIndex)}
      </button>
    </td>
  );
}