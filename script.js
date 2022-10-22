const fileInput=document.querySelector('.file-input'),
filterBtns=document.querySelectorAll('.filters .btn-style');
previewImg=document.querySelector('.edit-image img');
choseBtn=document.querySelector('.chose-img');
reset=document.querySelector('.reset');

const rotateOptions=document.querySelectorAll('.rotate');
const saveImg=document.querySelector('.save-img');


var bright=100,saturation=100,grayscale=0,inversion=0;
let rotate=0,flipH=1,flipV=1;
const container=document.querySelector('.container');
const filterName=document.querySelector('.second-text h3');
const filterSlider=document.querySelector('.second input');

var applyFilters=()=>{
    previewImg.style.transform=`rotate(${rotate}deg) scale(${flipH}, ${flipV})`;
    previewImg.style.filter=`brightness(${bright}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
const loadImage=()=>{
    const file=fileInput.files[0];
    if(!file) return;
    previewImg.src=URL.createObjectURL(file);
    previewImg.addEventListener('load',()=>{
        reset.click();
        container.classList.remove('disabel')
    })
}
const update=()=>{
    document.querySelector('.second-text p').innerHTML=filterSlider.value+'%';

    const selectedFilter=document.querySelector('.filters .active');
    if(selectedFilter.id=='Brightness')
    {
        bright=filterSlider.value;
    }
    else if(selectedFilter.id==='Saturation')
    {
        saturation=filterSlider.value;
    }
    else if(selectedFilter.id==='Inversion')
    {
        inversion=filterSlider.value;
    }
    else if(selectedFilter.id==='Grayscale')
    {
        grayscale=filterSlider.value;
    }
    applyFilters();
}
filterBtns.forEach(options =>{
    options.addEventListener('click',()=>{
        document.querySelector('.filters .active').classList.remove('active');
        options.classList.add('active');
        filterName.innerHTML=options.innerHTML;
        if(options.id==='Brightness')
        {
            filterSlider.max='200';
            filterSlider.value=bright;
            document.querySelector('.second-text p').innerHTML=filterSlider.value+'%';
        }
        else if(options.id==='Saturation')
        {
            filterSlider.max='200';
            filterSlider.value=saturation;
            document.querySelector('.second-text p').innerHTML=filterSlider.value+'%';

        }
        else if(options.id==='Inversion')
        {
            filterSlider.max='100';
            filterSlider.value=inversion;
            document.querySelector('.second-text p').innerHTML=filterSlider.value+'%';

        }
        else if(options.id==='Grayscale')
        {
            filterSlider.max='100';
            filterSlider.value=grayscale;
            document.querySelector('.second-text p').innerHTML=filterSlider.value+'%';
  
        }
    })
})

rotateOptions.forEach(opt =>{
    opt.addEventListener('click',()=>{
        if(opt.id==='right')
        {
            rotate+=90;
        }
        else if(opt.id==='left')
        {
            rotate-=90
        }
        else if(opt.id==='horizontal')
        {
            flipH=flipH===1?-1:1
        }
        else{
            flipV=flipV===1?-1:1;
        }
        applyFilters()
    })
})

let resetFilter= ()=>{
    bright=100,saturation=100,grayscale=0,inversion=0;
    rotate=0,flipH=1,flipV=1;
    applyFilters();
    filterBtns[0].click();
}

const save=()=>{
    const canvas=document.createElement('canvas');
    const ctx=canvas.getContext('2d');
    canvas.width=previewImg.naturalWidth;
    canvas.height=previewImg.naturalHeight;

    ctx.filter=`brightness(${bright}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width/2,canvas.height/2);
    if(rotate!=0)
    {
        ctx.rotate(rotate*Math.PI/180);
    }
    ctx.scale(flipH,flipV);
    ctx.drawImage(previewImg,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
    // document.body.appendChild(canvas);

    const link=document.createElement('a');
    link.download='image.jpg';
    link.href=canvas.toDataURL();
    link.click();
}
filterSlider.addEventListener('input',update);
fileInput.addEventListener('change',loadImage);
reset.addEventListener('click',resetFilter);
choseBtn.addEventListener('click',()=>fileInput.click());
saveImg.addEventListener('click',save);