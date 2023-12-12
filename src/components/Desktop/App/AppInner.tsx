import "./App.css";
import React, {useEffect, useRef, useState} from "react";

type Position = {
    top: string,
    left: string
}

function AppInner() {

    const [position, setPosition] = useState<Position>({top: "0px", left: "0px"});

    const ref = useRef<HTMLDivElement>();

    function dragMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        let pos3 = e.clientX;
        let pos4 = (e.clientY);
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

        function elementDrag(e: MouseEvent) {
            e.preventDefault();
            
            const pos1 = pos3 - e.clientX;
            const pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            const boundingClientRect = ref.current?.getBoundingClientRect();

            setPosition({
                top: (Math.max(0, (boundingClientRect?.top - pos2)) + "px"),
                left: (Math.max(0, (boundingClientRect?.left - pos1)) + "px")
            })
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }


    useEffect(() => {
        console.log(position)
    }, [position]);


    return (
        <div id="mydiv"
             style={position}
             ref={ref}>
            <div id="mydivheader"
                 onMouseDown={(e) => dragMouseDown(e)}
            > Click here to move
            </div>
            <p>Move</p>
            <p>this</p>
            <p>DIV</p>
        </div>
    )
}

export default AppInner;