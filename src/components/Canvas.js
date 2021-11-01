import React, {useEffect, useRef, useState} from 'react'

const PureCanvas = React.forwardRef((props, ref) => <canvas ref={ref} />);

function Canvas ({lineWidth, color}) {
    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)

    useEffect(()=>{        
        const canvas = canvasRef.current;
        // canvas.width = window.innerWidth  ;
        // canvas.height = window.innerHeight ;
        // canvas.style.width = `${window.innerWidth}px`;
        // canvas.style.height = `${window.innerHeight}px`;

        const context = canvas.getContext("2d")

        const handleResize = e => {
            var height = window.innerHeight-365
            if (window.innerHeight-365 < 270){
                height = 270
            }
            context.canvas.width = (window.innerWidth-519)*2 ;
            context.canvas.height = (height*2) ;
            canvas.style.width = `${(window.innerWidth-519)}px`;
            canvas.style.height = `${height}px`;
            context.scale(2,2)
            context.lineCap = "round"
            context.strokeStyle = color
            context.lineWidth = lineWidth
          };
      
          handleResize();
          window.addEventListener("resize", handleResize);

        
        // context.lineCap = "round"
        // context.strokeStyle = "black"
        // context.lineWidth = 3.5
        contextRef.current = context;
        return () => window.removeEventListener("resize", handleResize);
    },[])

    const startDrawing = ({nativeEvent})=>{
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing = ()=>{
        contextRef.current.closePath()
        setIsDrawing(false)
    }
    const draw = ({nativeEvent}) =>{
        if (!isDrawing){
            return
        }

        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()

    }

    return(
        <canvas
        style={{borderRadius:15, minHeight:270}}
        onMouseDown = {startDrawing}
        onMouseUp = {finishDrawing}
        onMouseMove = {draw}
        ref = {canvasRef}
        />
    );
}
export default Canvas;