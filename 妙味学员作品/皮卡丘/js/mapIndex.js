const kdiQ = document.getElementsByClassName('kdiQ')[0];
const homeQ = document.getElementsByClassName('homeQ')[0];
const marketQ = document.getElementsByClassName('marketQ')[0];
const centerQ = document.getElementsByClassName('centerQ')[0];
const gardenQ = document.getElementsByClassName('gardenQ')[0];
const royalRoadQ = document.getElementsByClassName('royalRoadQ')[0];
const parliamentQ = document.getElementsByClassName('parliamentQ')[0];
const schoolQ = document.getElementsByClassName('schoolQ')[0];
const adventureQ = document.getElementsByClassName('adventureQ')[0];
const tipKdiQ = document.getElementsByClassName('tipKdiQ')[0];
const homeKdiQ = document.getElementsByClassName('homeKdiQ')[0];
const marKdiQ = document.getElementsByClassName('marKdiQ')[0];
const cenKdiQ = document.getElementsByClassName('cenKdiQ')[0];
const garKdiQ = document.getElementsByClassName('garKdiQ')[0];
const rrQKdiQ = document.getElementsByClassName('rrQKdiQ')[0];
const plQKdiQ = document.getElementsByClassName('plQKdiQ')[0];
const scKdiQ = document.getElementsByClassName('scKdiQ')[0];
const adKdiQ = document.getElementsByClassName('adKdiQ')[0];
const explain = document.querySelector('.explain');
const shut_shut = document.querySelector('.shut-shut');
let att = [1];


kdiQ.onmousemove = function(){
    tipKdiQ.style.display = 'block';
};
kdiQ.onmouseleave = function(){
    tipKdiQ.style.display = 'none';
};
kdiQ.onclick = function(){

};
homeQ.onmousemove = function(){
    homeKdiQ.style.display = 'block';
};
homeQ.onmouseleave = function(){
    homeKdiQ.style.display = 'none';
};
marketQ.onmousemove = function(){
    marKdiQ.style.display = 'block';
};
marketQ.onmouseleave = function(){
    marKdiQ.style.display = 'none';
};
marketQ.onclick = function(){
  box1.style.display = 'block';
    mapIndexQyk.style.display = 'none';
    mainMenuBgd.classList.add('allHidden');
    chen();
};

centerQ.onmousemove = function(){
    cenKdiQ.style.display = 'block';
};
centerQ.onmouseleave = function(){
    cenKdiQ.style.display = 'none';
};
gardenQ.onmousemove = function(){
    garKdiQ.style.display = 'block';
};
gardenQ.onmouseleave = function(){
    garKdiQ.style.display = 'none';
};
royalRoadQ.onmousemove = function(){
    rrQKdiQ.style.display = 'block';
};
royalRoadQ.onmouseleave = function(){
    rrQKdiQ.style.display = 'none';
};
royalRoadQ.onclick = function(){
    move_role.style.display = "block";
    explain.style.display = 'block';
    shut_shut.onclick = function () {
        explain.style.display = 'none';
    }
    mapIndexQyk.style.display = 'none';
    mainMenuBgd.classList.add('allHidden');
    allBgd.classList.add('allHidden');
    bagmodel.classList.add('allHidden');
//  bagmodel.style.display = "none"
};
parliamentQ.onmousemove = function(){
    plQKdiQ.style.display = 'block';
};
parliamentQ.onmouseleave = function(){
    plQKdiQ.style.display = 'none';
};
schoolQ.onmousemove = function(){
    scKdiQ.style.display = 'block';
};
schoolQ.onmouseleave = function(){
    scKdiQ.style.display = 'none';
};
adventureQ.onmousemove = function(){
    adKdiQ.style.display = 'block';
};
adventureQ.onmouseleave = function(){
    adKdiQ.style.display = 'none';
};

$classname("tap")[0].onclick = e=>{
    move_role.style.display = "none"
    mapIndexQyk.style.display = 'block';
    mainMenuBgd.classList.remove('allHidden');

    // allBgd.classList.add('allHidden');
    // bagmodel.style.display = "none"
}