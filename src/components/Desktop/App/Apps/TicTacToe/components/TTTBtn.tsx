type TTTBtnProps = {
  btnIndex: number;
  btnState: number;
}

export function TTTBtn(props: TTTBtnProps) {

  function getChar(): string {
    switch (props.btnState) {
      case 1:
        return "O"
      case 2:
        return "X"
    }
    return "_"
  }


  return (
    <td>
      <button className={"ttt-btn " + props.btnIndex}>{getChar()}</button>
    </td>
  )
}