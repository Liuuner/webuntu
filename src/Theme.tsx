import {useAppSelector} from "./app/hooks.ts";

export default function Theme() {
    const personalisation = useAppSelector(state => state.personalisation);
    const style = `
#infoBar {
    background-color: #000;
}
#appBar {
    width: ${personalisation.appBarWidth}
}
.app {
    background-color: ${personalisation.theme.firstColor};
}

.fullscreenApp {
    background-color: ${personalisation.theme.firstColor};
}

.appMenuBar {
    background-color: ${personalisation.theme.secondColor};
}
`

    return (
        <style>
            {style}
        </style>
    )
}