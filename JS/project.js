const bgDiv = document.querySelector(".background");
const settingBox = document.querySelector('.setting');
const gearBtn = document.querySelector('.bi-gear-fill');
const root = document.documentElement;
const colorSet = Array.from(document.querySelector('.color-group').children) ;
const colorGroup = ['#FF9800','#E91E63','#009688','#03A9F4','#4CAF50'];
const bgBtnYes = document.querySelector('.bg-change div .yes');
const bgBtnNo = document.querySelector('.bg-change div .no');
const galleryImg = Array.from(document.querySelectorAll('.gallery div img'))
const toggleBtn = document.querySelector('.bi-list')
let autobg;
let counter=1;
let mylayer

// change the background automaticlly
if(localStorage.getItem('auto-bg')=='yes'){
    changeBg()
} else if(localStorage.getItem('auto-bg')=='no')
            stopBg()
bgBtnYes.addEventListener('click',function(){
 changeBg()
})
bgBtnNo.addEventListener('click',function(){
    console.log('no')
stopBg()
})

// appear setting box
gearBtn.addEventListener('click', function(){
    gearBtn.classList.toggle('active');
    settingBox.classList.toggle('open');
})

// change the color in the page 
colorSet.forEach((li,index)=>{
    li.addEventListener('click',function(e){
        colorSet.forEach((ele)=>ele.classList.remove('active'))
        if(e.target)
            e.target.classList.add('active')
        localStorage.clear()
        root.style.setProperty("--main-color",`${colorGroup[index]}`)
        localStorage.setItem("color",JSON.stringify(colorGroup[index]))
    })
})

// check local storage to save the selected  color
if(localStorage.length==0){
    root.style.setProperty("--main-color",`${colorGroup[0]}`)
    colorSet[0].classList.add('active')
}
else{
    root.style.setProperty("--main-color",`${JSON.parse(localStorage.getItem("color"))}`);
    let colorIndex = colorGroup.indexOf(JSON.parse(localStorage.getItem("color")))
    colorSet[colorIndex].classList.add('active')
}

// add the overlay when click on the images
galleryImg.forEach((img)=>{
    img.addEventListener('click',(e)=>{
        
        let divOverlay = document.createElement('div');
        let imgBox = document.createElement('div');
        let imgElement = document.createElement('img')
        let imgAlt = document.createElement('h3')
        let close = document.createElement('i')

        imgBox.classList.add('img-box')
        divOverlay.classList.add('created-overlay','d-flex','justify-content-center','align-items-center');
        imgAlt.classList.add('text-center','img-box-text');
        close.classList.add("bi", "bi-x-circle","close-btn")

        if(e.target.alt !=''){
            imgAlt.appendChild(document.createTextNode(e.target.alt))
        }
        else{
            imgAlt.appendChild(document.createTextNode("Image"))
        }
        imgElement.src = e.target.src
        divOverlay.appendChild(imgBox)
        imgBox.appendChild(close)
        imgBox.appendChild(imgAlt)
        imgBox.appendChild(imgElement)
        
        document.body.appendChild(divOverlay)
        close.addEventListener('click',_=>{divOverlay.remove()})
        divOverlay.addEventListener('click',(e)=>{
            divOverlay.remove()
        })
    })
})

// remove the created outlier 


// functions area

// auto-background-on-function
function changeBg(){
    autobg = setInterval(function(){
        counter++
        bgDiv.style.backgroundImage = `url('../images/0${counter}.jpg')`;
        // console.log(counter)
        if(counter>=5)
            counter = 0;
    
    },5000);
    bgBtnYes.classList.add('clicked');
    bgBtnNo.classList.remove('clicked');
    localStorage.setItem('auto-bg','yes')
}
// auto-background-off-function

function stopBg(){
    
    clearInterval(autobg)
    bgDiv.style.backgroundImage = `url('../images/0${1}.jpg')`;
    bgBtnNo.classList.add('clicked');
    bgBtnYes.classList.remove('clicked');
    localStorage.setItem('auto-bg','no')
}

toggleBtn.addEventListener('click', function(){
    let menu = document.querySelector('.menu');
    let txt = document.querySelector('.text-area')
    bgDiv.style.minHeight = '130vh'
    txt.style.transition = "all 0.4s"
    menu.classList.toggle('open')
})