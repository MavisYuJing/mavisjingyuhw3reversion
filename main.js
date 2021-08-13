/**
 * USER NAME: 
 */
// show some message to user interface 
function customAlert(msg,time = false){
    let dom = document.getElementsByClassName("alert_slot")
    if(dom.length > 0){
        dom[0].innerHTML = msg
    }
    // hide the message on 1 seconds
    if(!time)
    setTimeout(function(){
        dom[0].innerHTML ="" 
    },1000)
}

// render and show table base on four points https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
function render(one, two, three, four){
    let dom = document.getElementById("table_slot")
    let {scrollTop: top, scrollLeft: left} = dom
   
    let html = ""
    let head = ""
    for(let y = three ; y <= four ; y++){

        html += `<tr>`
        for(let x = one; x <= two ; x ++ ){

            if(y === three){
                if(x === one){
                    head +=  `<tr><th style='z-index: 88;position:relative;top: ${top}px'></th><th style='z-index: 88;position:relative;top: ${top}px'>${x}</th>`
                }else{
                    head +=  `<th style='z-index: 88;position:relative;top: ${top}px'>${x}</th>`
                }
            }
            
            if(x === one){
                html += `<td style='z-index: 8;position:relative;left: ${left}px'>${y}</div></td><td>${parseInt(x*y)}</td>`
            }else{
                html += `<td>${parseInt(x*y)}</td>`
            }
        }
        html += `</tr>`

        //appends last tab
        if(y === three){
            head += "</tr>"
        }
    }
    
    // template HTML for render function https://vuejs.org/v2/guide/render-function.html
    dom.innerHTML = `
    <div class="table_slot" id="table_s">
        <table class="tb" cellspacing="0" cellpadding="10"  border="1">
            <thead>
                ${head}
            </thead>
            <tbody>
                ${html}
            </tbody>
        </table>
    </div>
    `
    customAlert("DONE!!!")
    document.getElementById("table_s").addEventListener("scroll",function(e){
        console.log(e)
        let {scrollLeft:left,scrollTop:top} = e.target
        let trs = document.getElementsByTagName("tr")

        for(let i=0; i<trs.length; i++){
            trs.item(i).firstElementChild.setAttribute("style",`z-index: 8;position:relative;left: ${left}px`)
            if(i===0){
                for(let j = 0 ; j<trs[i].children.length; j++){
                    trs.item(i).children.item(j).setAttribute("style",`z-index: 88;position:relative;top: ${top}px`)
                }
            }
           
        }
    })
}
window.onload = function(){


    document.getElementById("btn").addEventListener("click",function(){
        let one = parseInt(document.getElementById("one").value)
        let two =  parseInt(document.getElementById("two").value)
        let three =  parseInt(document.getElementById("three").value)
        let four =  parseInt(document.getElementById("four").value)

        //ensure four points value is valid
        if(isNaN(one)||isNaN(two)||isNaN(three)||isNaN(four)){
            customAlert("please provide a valid digit")
            return
        }
     
        if( one >= two || three >= four){
            customAlert("the start point is larger than the end point, please try another one")
            return
        }
        if( -51 < one &&  one <= 50 && -51 < two &&  two <= 50 && -51 < three &&  three <= 50 && -51 < four &&  four <= 50){
            render(one, two, three, four)
        }else{
            customAlert("Please enter a number in the range of - 50 to 50")
        }

    })
   
    
    
}