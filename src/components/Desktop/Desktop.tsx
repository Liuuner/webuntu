import App from "./App/App.tsx";
import { TicTacToe } from "./App/Apps/TicTacToe/TicTacToe.tsx";

function Desktop() {
  return (
    <main id={"desktop"}>
      {/*<App applicationTitle={"Settings"}>

            </App>*/}

      <App applicationTitle={"Peer-Tac-Toe"}>
        <TicTacToe />
      </App>
    </main>
  );
}

export default Desktop;
