import ConnectFour from "./App/Apps/ConnectFour/ConnectFour.tsx";
import App from "./App/App.tsx";

function Desktop() {
  return (
    <main id={"desktop"}>
      {/*<App applicationTitle={"Settings"}>

            </App>*/}

      <App applicationTitle={"Connect Four"}>
        <ConnectFour />
      </App>
    </main>
  );
}

export default Desktop;
