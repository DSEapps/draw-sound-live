
import React, { Component } from 'react';


class Art extends Component { 
    
    setupCanvas = () => { }

    componentDidMount() {}

    // this clears the canvas ctx.clearRect(0, 0, canvas.width, canvas.height)
    // the problem is, i just discovered why the below code was the only wayt to get this to work
    // it was rendering the render inside of itself

    // the state above this needs to be reset back to defaults, 0s when
    // user stops performing otherwise, when the next person starts performing
    // the math here will be off

    // there is not currently code in here to handle clearing the canvas
    
    componentWillUpdate(nextProps, nextState) {
        // console.log(this.props.performer);
        // console.log("art will update " + " performer- " + this.performerer + " location-  " + this.location);
        // console.log("art will update " + " performer- " + this.props.performer + " location-  " + nextProps.performer);
        // init canvas
        const canvas = document.getElementById("art");
        const ctx = canvas.getContext("2d"); 

        // nomralize props
        const now = this.props.location;
        const next = nextProps.location;

        const offsetLeft = canvas.getBoundingClientRect().left;
        const offsetTop = canvas.getBoundingClientRect().top;

        // correct for canvas placement
        let nextX = next.x - offsetLeft;
        let nextY = next.y - offsetTop;
        let nowX = now.x - offsetLeft;
        let nowY = now.y - offsetTop;



        //////////////// SET - KANDINSKY 01//////////////////////
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

        //////////////// Reset Canvas when Performer Clicked //////////////////////
        if ( ( (nextX + offsetLeft) === 0 && (nextY + offsetTop) === 0 ) || ( (nowX + offsetLeft) === 0 && (nowY + offsetLeft) === 0 )){
            ctx.clearRect(0, 0, canvas.width, canvas.height)  
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
