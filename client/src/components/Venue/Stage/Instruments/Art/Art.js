
import React, { Component } from 'react';


class Art extends Component { 
    
    setupCanvas = () => { }

    componentDidMount() {}

 
    
    componentWillUpdate(nextProps, nextState) {
        // init canvas
        const canvas = document.getElementById("art");
        const ctx = canvas.getContext("2d"); 

        // nomralize props
        const now = this.props.location;
        const next = nextProps.location;

        const offsetLeft = canvas.getBoundingClientRect().left;
        const offsetTop = canvas.getBoundingClientRect().top;

        const nowLiveStatus = this.props.live;
        const nextLiveStatus = nextProps.live;

        // correct for canvas placement
        let nextX = next.x - offsetLeft;
        let nextY = next.y - offsetTop;
        let nowX = now.x - offsetLeft;
        let nowY = now.y - offsetTop;

        // get canvas width
        let canvasObj = document.querySelector("#art");
        let currentWidth = canvasObj.width;
        let currentHeight = canvasObj.height;
        

        //////////////////////////////////////////////////////////////////////////////
        //////////////// SET - KANDINSKY 01 /////////////////////////////////////////
        // global
        let colorSet1; // current cursor lcation - full opacity
        let colorSet2; // current cursor lcation - 0.7 opacity
        

        // create color variable based on current box
        switch(next.activeNode) {
            case "A":
            colorSet1 = "rgba(150, 39, 15, 1)";
            colorSet2 = "rgba(150, 39, 15, 0.7)";
            break;

            case "B":
            colorSet1 = "rgba(82, 98, 130, 1)";
            colorSet2 = "rgba(82, 98, 130, 0.7)";
            break;
            
            case "C":
            colorSet1 = "rgba(228, 190, 80, 1)";
            colorSet2 = "rgba(228, 190, 80, 0.7)";
            break;
            
            case "D":
            colorSet1 = "rgba(78, 68, 31, 1)";
            colorSet2 = "rgba(78, 68, 31, 0.7)";
            break;

            case "E":
            colorSet1 = "rgba(212, 82, 3, 1)";
            colorSet2 = "rgba(212, 82, 3, 0.7)";
            break;

            case "F":
            colorSet1 = "rgba(77, 109, 13, 1)";
            colorSet2 = "rgba(77, 109, 13, 0.7)";
            break;

            case "G":
            colorSet1 = "rgba(205, 48, 23, 1)";
            colorSet2 = "rgba(205, 48, 23, 0.7)";
            break;

            case "H":
            colorSet1 = "rgba(138, 148, 167, 1)";
            colorSet2 = "rgba(138, 148, 167, 0.7)";
            break;

            case "I":
            colorSet1 = "rgba(152, 108, 25, 1)";
            colorSet2 = "rgba(152, 108, 25, 0.7)";
            break;

            default:
        }

        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////


        //////////////// There is a performer so draw to canvas //////////////////////
        if (nextLiveStatus) {
            
            //CURRENT MouseDown = FALSE, NEXT MouseDown = TRUE
            if ( (!now.mouseDown) && (next.mouseDown)) {
                //CIRCLE 1
                ctx.beginPath();
                ctx.arc(nextX, nextY, 7, 0, 2 * Math.PI, false);
                ctx.strokeStyle = colorSet1;
                ctx.lineWidth = 7;
                ctx.stroke();
                ctx.closePath();   
            }
            
            //CURRENT MouseDown = TRUE, NEXT MouseDown = TRUE
            if ( (now.mouseDown) && (next.mouseDown)) {
                //DRAW 1
                ctx.save();
                ctx.beginPath();
                ctx.shadowBlur=50;
                ctx.shadowColor=colorSet2;   
                ctx.shadowOffsetX=5;
                ctx.shadowOffsetY=-5;
                ctx.lineWidth = 1;
                ctx.lineTo(nowX, nowY);
                ctx.lineTo(nextX, nextY);
                ctx.stroke();
                ctx.restore();
            }

            //CURRENT MouseDown = TRUE, NEXT MouseDown = FALSE
            if ( (now.mouseDown) && (!next.mouseDown)) {
                // RECT 1
                ctx.fillStyle="Black";
                ctx.fillRect(nextX, nextY, 6, 6);
            } 
         //////////////// There is no performer clear the canvas //////////////////////    
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }


        ////////////// Keyboard Events //////////////////////
        if ( (!now.keyDown) && (next.keyDown)) {
            let rX = Math.random() * (currentWidth - 1) + 1;
            let rY = Math.random() * (currentWidth - 1) + 1;
            let rD = Math.random() * (360 - 1) + 1;
            ctx.fillStyle = colorSet1;
            ctx.globalAlpha=0.05;
            // ctx.rotate(rD*Math.PI/180);
            // ctx.translate(nowX, nowY)
            ctx.fillRect(nowX/3, nowY/3, nowX/4, rY/6);
            // ctx.fillRect(nowX/2, nowY/2, nowX+5, nowY+5);
            ctx.globalAlpha=1;
            // ctx.setTransform(1, 0, 0, 1, 0, 0);
            // ctx.resetTransform();
        } 
    }

    render() {
        return (
            <div className="art-wrapper">
                <canvas id="art" width="750" height="480" >
                
                </canvas>
            </div>
        );
    }
}

export default Art;
