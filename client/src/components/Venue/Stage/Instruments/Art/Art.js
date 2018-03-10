
import React, { Component } from 'react';


class Art extends Component {

    
    componentDidMount() {}     

    componentWillUpdate(nextProps) {
        // init canvas
        const canvas = document.getElementById("art");
        const ctx = canvas.getContext("2d"); 

        const now = this.props.location;
        const next = nextProps.location;

        // coorect for canvas placement
        let nextX = next.x - canvas.getBoundingClientRect().left;
        let nextY = next.y - canvas.getBoundingClientRect().top;
        let nowX = now.x - canvas.getBoundingClientRect().left;
        let nowY = now.y - canvas.getBoundingClientRect().top;



        //////////////// SET - KANDINSKY 01//////////////////////
        // global
        let colorSet1 = 0; // current cursor lcation - full opacity
        let colorSet2 = 0; // current cursor lcation - 0.7 opacity
        

        // create color variable based on current box
        switch(next.activeNode) {
            case "A":
            colorSet1 = "rgba(150, 39, 15,1)";
            colorSet2 = "rgba(150, 39, 15, 0.7)";
            break;

            case "B":
            colorSet1 = "rgba(82, 98, 130,1)";
            colorSet2 = "rgba(82, 98, 130, 0.7)";
            break;
            
            case "C":
            colorSet1 = "rgba(228, 190, 80,1)";
            colorSet2 = "rgba(228, 190, 80, 0.7)";
            break;
            
            case "D":
            colorSet1 = "rgba(78, 68, 31,1)";
            colorSet2 = "rgba(78, 68, 31, 0.7)";
            break;

            case "E":
            colorSet1 = "rgba(212, 82, 3,1)";
            colorSet2 = "rgba(212, 82, 3, 0.7)";
            break;

            case "F":
            colorSet1 = "rgba(60, 86, 16,1)";
            colorSet2 = "rgba(60, 86, 16, 0.7)";
            break;


            default:
        }

        // ctx.strokeStyle=colorSet1;
        // ctx.fillStyle=lcolorSet1;


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
    }

    render() {
        return (
            <div className="art">
                <canvas id="art" width="750" height="500" >
               
                </canvas>
            </div>
        );
    }
}

export default Art;