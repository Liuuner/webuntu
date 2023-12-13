import ConnectFour from "./App/Apps/ConnectFour/ConnectFour.tsx";
import App from "./App/App.tsx";
import { TicTacToe } from "./App/Apps/TicTacToe/TicTacToe.tsx";

function Desktop() {
  return (
    <main id={"desktop"}>
      {/*<App applicationTitle={"Settings"}>

            </App>*/}

      <App applicationTitle={"Connect Four"}>
        <TicTacToe/>
      </App>
    </main>
  );
}

export default Desktop;
