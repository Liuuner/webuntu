import { useAppSelector } from "./store/hooks.ts";

export default function Theme() {
  const personalisation = useAppSelector((state) => state.personalisation);
  const firstColor = "#2c2c2c";
  const secondColor = "#222222";
  const style = `
#infoBar {
    background-color: #000;
}
#appBar {
    width: ${personalisation.appBarWidth}
}
.app {
    background-color: ${firstColor};
}

.fullscreenApp {
    background-color: ${firstColor};
}

.appMenuBar {
    background-color: ${secondColor};
}
`;

  return <style>{style}</style>;
}
