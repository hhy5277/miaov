        let PlayerTimer = null;
        let PlayerOnoff = 0;

        let PlayerDirection = {
        left: false,
        right:false,
        forward:true,
        back:false,
    };
    let menuonoff = "off";
    function $id(id){return document.getElementById(id)}
    function $name(name){return document.getElementsByName(name)}
    function $classname(classname){return document.getElementsByClassName(classname)}
    //定义地图开始
    let boxxx =[];
        let map1 = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,7,0,38,0,55,55,55,55,33,44,44,44,44,44,0,40,19,20,20,20,20,20,20,20,20,31,0,0,36,36,36,60,58,13,13,13,13,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
            [1,1,1,1,1,1,1,1,1,1,57,0,0,0,0,0,41,0,56,46,44,46,44,46,0,0,21,27,23,23,23,30,28,26,26,21,0,0,36,36,36,61,59,13,13,13,13,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,3,0,44,45,43,45,44,0,0,21,23,23,26,23,29,23,26,23,21,0,0,36,36,36,61,59,13,13,13,13,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,0,0,44,44,44,44,0,0,0,0,0,0,0,0,0,0,21,24,23,23,23,27,23,23,23,21,0,0,36,36,36,61,59,13,13,13,13,13,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,0,0,46,44,44,44,0,14,16,0,0,42,0,0,0,0,22,25,25,25,25,25,25,23,25,32,0,0,36,36,36,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,0,6,44,43,45,44,0,14,16,0,0,53,53,53,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,37,37,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,0,0,39,0,17,15,0,14,16,0,0,44,44,44,44,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,37,37,37,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,14,16,0,0,44,44,44,44,0,0,0,13,13,13,13,13,13,0,0,19,20,20,20,20,20,20,20,20,23,20,20,31,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,54,54,9,0,0,0,0,0,0,0,0,44,44,44,46,5,0,0,13,13,13,13,13,13,0,0,21,35,35,35,35,35,23,23,23,23,23,35,21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,54,54,9,54,54,54,54,54,54,0,0,44,43,45,44,4,0,0,13,13,13,13,13,13,0,0,21,35,35,35,35,23,23,35,35,35,23,35,21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,12,11,11,11,11,10,54,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,0,0,21,35,23,35,35,23,35,35,35,35,23,23,21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,9,8,65,8,8,9,54,54,54,0,52,52,52,52,0,0,0,0,0,0,0,0,0,0,21,35,35,23,23,23,35,35,35,35,35,23,21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,9,8,8,62,8,10,11,11,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,23,23,23,23,35,35,35,23,23,23,23,21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,9,8,64,62,8,8,63,8,18,0,0,0,13,13,13,13,13,13,66,66,66,37,37,37,21,35,35,23,23,23,23,23,23,35,35,35,21,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,9,8,8,8,8,63,8,8,18,11,0,0,13,13,13,13,13,13,66,66,66,37,37,37,22,25,25,25,25,25,25,25,25,25,25,25,32,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        ];
    boxxx.push(map1);
    let gameConfig={
        "person":{
            "x":0,
            "y":0,
            "id":"person"
        },
        "map" : 0,
        "boxxx":{
            "x":"64",
            "y":"64"
        },
    };

    function createGame(){
    	
    	
    	

        $id("cell").innerHTML="";

        for(let i=0;i<boxxx[gameConfig.map].length;i++){
            for(let j=1;j<boxxx[gameConfig.map][i].length;j++){
                let itemdiv = document.createElement("div");
                itemdiv.style.width = gameConfig.boxxx.x + "px";
                itemdiv.style.height = gameConfig.boxxx.y + "px";
                itemdiv.style.left = gameConfig.boxxx.x*j + "px";
                itemdiv.style.top = gameConfig.boxxx.y*i + "px" ;
                itemdiv.setAttribute("name",i+"_"+j);
                itemdiv.style.position="absolute";

                $id("cell").appendChild(itemdiv);
                switch(boxxx[gameConfig.map][i][j]){
                    case 0:
                        itemdiv.style.background = `url("img/map/road.png")`;    //陆地
                        break;

                    case 1:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;//"url(1.png)70px,32px"     树墙
                        let tree1 = document.createElement("img");
                        tree1.src = "img/map/tree3.png";                         //树
                        itemdiv.appendChild(tree1);
                        break;

                    case 2:
                        itemdiv.style.background = "yellow";          // npc
                        itemdiv.innerHTML = "npc";
                        break;
                    case 3:
                        itemdiv.id = gameConfig.person.id;
                        itemdiv.style.background = `url("img/map/road.png")`;
                        itemdiv.style.width = gameConfig.boxxx.x + "px";
                        itemdiv.style.height = gameConfig.boxxx.y + "px";
                        gameConfig.person.x = j;
                        gameConfig.person.y = i;
                        break;
                    case 4:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree12 = document.createElement("img");
                        tree12.src = "img/map/img5.png";                        // 花丛
                        itemdiv.appendChild(tree12);
                        break;
                    case 5:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree13 = document.createElement("img");
                        tree13.src = "img/map/img6.png";                        // 花丛
                        itemdiv.appendChild(tree13);
                        break;
                    case 6:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;//"url(1.png)70px,32px"     草地
                        let decoration = document.createElement("img");
                        decoration.src = "img/map/flowers.png";              // 房子旁边的装饰
                        itemdiv.appendChild(decoration);
                        break;
                    case 7:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;//"url(1.png)70px,32px"     草地
                        let tree2 = document.createElement("img");
                        tree2.src = "img/map/well.png";                        // 水井
                        itemdiv.appendChild(tree2);
                        break;
                    case 8:
                        itemdiv.style.background = `url("img/map/water1.png")`;          // 水
                        break;
                    case 9:
                        itemdiv.style.background = `url("img/map/bridge-left.png")`;          //  桥-纵向铺路
                        break;
                    case 10:
                        itemdiv.style.background = `url("img/map/bridge-part.png")`;          //  桥-节点
                        break;
                    case 11:
                        itemdiv.style.background = `url("img/map/bridge-top.png")`;          //  桥-横向铺路
                        break;
                    case 12:
                        itemdiv.style.background = `url("img/map/bridge-part-l.png")`;          //  桥-节点左
                        break;
                    case 13:
                        itemdiv.style.background = `url("img/map/grass.png")`;          //  留做建筑物
                        break;
                    case 14:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;//"url(1.png)70px,32px"     草地
                        let tree3 = document.createElement("img");
                        tree3.src = "img/map/grass4.png";                        // 草地
                        itemdiv.appendChild(tree3);
                        break;
                    case 15:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree4 = document.createElement("img");
                        tree4.src = "img/map/img2.png";                        // 房子旁边的装饰1
                        itemdiv.appendChild(tree4);
                        break;
                    case 16:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree5 = document.createElement("img");
                        tree5.src = "img/map/flower2.png";                        // 花丛
                        itemdiv.appendChild(tree5);
                        break;
                    case 17:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree6 = document.createElement("img");
                        tree6.src = "img/map/img3.png";                        // 房子旁边的装饰2
                        itemdiv.appendChild(tree6);
                        break;
                    case 18:
                        itemdiv.style.background = `url("img/map/bridge-rr.png")`;          //  桥(一半河水一半桥)
                        break;
                    case 19:
                        itemdiv.style.background = `url("img/map/railings-lt.png")`;          //  栅栏（左上）
                        break;
                    case 20:
                        itemdiv.style.background = `url("img/map/railings-t.png")`;          //  栅栏（上）
                        break;
                    case 21:
                        itemdiv.style.background = `url("img/map/railings-l.png")`;          //  栅栏（左/右）
                        break;
                    case 22:
                        itemdiv.style.background = `url("img/map/railings-lb.png")`;          //  栅栏（左下）
                        break;
                    case 23:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;          //  栅栏里的草地
                        break;
                    case 24:
                        itemdiv.style.background = `url("img/map/grass5.png")`;          //  栅栏里的草地（带装饰）
                        break;
                    case 25:
                        itemdiv.style.background = `url("img/map/railings-b.png")`;          //  栅栏（下）
                        break;
                    case 26:
                        itemdiv.style.background = `url("img/map/grass6.png")`;          //  栅栏里的草地（带装饰）
                        break;
                    case 27:
                        itemdiv.style.background = `url("img/map/grass7.png")`;          //  栅栏里的草地（带装饰）
                        break;
                    case 28:
                        itemdiv.style.background = `url("img/map/grass8.png")`;          //  栅栏里的草地（带装饰）
                        break;
                    case 29:
                        itemdiv.style.background = `url("img/map/grass9.png")`;          //  栅栏里的草地（带装饰）
                        break;
                    case 30:
                        itemdiv.style.background = `url("img/map/grass10.png")`;          //  栅栏里的草地（带装饰）
                        break;
                    case 31:
                        itemdiv.style.background = `url("img/map/railings-rt.png")`;          //  栅栏（右上）
                        break;
                    case 32:
                        itemdiv.style.background = `url("img/map/railings-rb.png")`;          //  栅栏（右下）
                        break;
                    case 33:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree7 = document.createElement("img");
                        tree7.src = "img/map/stump.png";                        // 草坪的装饰（树桩）
                        itemdiv.appendChild(tree7);
                        break;
                    case 34:
                        itemdiv.style.background = `url("img/map/grass2.png")`;
                        let tree8 = document.createElement("img");
                        tree8.src = "img/map/stone.png";                        // 草坪的装饰（石头）
                        itemdiv.appendChild(tree8);
                        break;
                    case 35:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree9 = document.createElement("img");
                        tree9.src = "img/map/tree4.png";                        // 果树
                        itemdiv.appendChild(tree9);
                        break;
                    case 36:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree10 = document.createElement("img");
                        tree10.src = "img/map/img4.png";                        // 装饰（仙人掌）
                        itemdiv.appendChild(tree10);
                        break;
                    case 37:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree11 = document.createElement("img");
                        tree11.src = "img/map/kep.png";                        // 道路装饰(果篮)
                        itemdiv.appendChild(tree11);
                        break;
                    case 38:
                        itemdiv.style.background = `url("img/map/road.png")`;
                        let npc1 = document.createElement("img");
                        npc1.src = "img/npc1/npc1Forward.png"
                        itemdiv.appendChild(npc1);
                        break;
                    case 39:
                        itemdiv.style.background = `url("img/map/road.png")`;
                        let npc2 = document.createElement("img");
                        npc2.src = "img/npc1/npc2Forward.png"
                        itemdiv.appendChild(npc2);
                        break;
                    case 40:
                        itemdiv.style.background = `url("img/map/road.png")`;
                        let npc3 = document.createElement("img");
                        npc3.src = "img/npc1/npc2Forward.png"
                        itemdiv.appendChild(npc3);
                        break;
                    case 41:
                        itemdiv.style.background = `url("img/map/road.png")`;
                        let npc4 = document.createElement("img");
                        npc4.src = "img/npc1/npc2Forward.png"
                        itemdiv.appendChild(npc4);
                        break;
                    case 42:
                        itemdiv.style.background = `url("img/map/road.png")`;
                        let npc5 = document.createElement("img");
                        npc5.src = "img/npc1/npc2Forward.png"
                        itemdiv.appendChild(npc5);
                        break;
                    case 43:
                        itemdiv.style.background = `url("img/building/Wall.png")`;
                        let gate = document.createElement("img");
                        gate.src = "img/building/gate.png";
                        itemdiv.appendChild(gate);
                        break;
                    case 44:
                        itemdiv.style.background = `url("img/building/Wall.png")`;
                        break;
                    case 45:
                        itemdiv.style.background = `url("img/building/Wall.png")`;
                        let window = document.createElement("img");
                        window.src = "img/building/window.png";
                        itemdiv.appendChild(window);
                        break;
                    case 46:
                        itemdiv.style.background = `url("img/building/Wall.png")`;
                        let lamp = document.createElement("img");
                        lamp.src = "img/building/lamp.png";
                        itemdiv.appendChild(lamp);
                        break;
                    case 47:
                        itemdiv.style.background = `url("img/map/road.png")`;
                        let ceil1 = document.createElement("img");
                        ceil1.src = "img/building/ceil1.png";
                        itemdiv.appendChild(ceil1);
                        break;
                    case 48:
                        itemdiv.style.background = `url("img/map/road.png")`;
                        let ceil2 = document.createElement("img");
                        ceil2.src = "img/building/ceil2.png";
                        itemdiv.appendChild(ceil2);
                        break;
                    case 52:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree14 = document.createElement("img");
                        tree14.src = "img/map/parterre.png";                      //  路上装饰
                        itemdiv.appendChild(tree14);
                        break;
                    case 53:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree15 = document.createElement("img");
                        tree15.src = "img/map/flower3.png";                      //  路上装饰
                        itemdiv.appendChild(tree15);
                        break;
                    case 54:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree16 = document.createElement("img");
                        tree16.src = "img/map/grass11.png";                      //  路上装饰
                        itemdiv.appendChild(tree16);
                        break;
                    case 55:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree17 = document.createElement("img");
                        tree17.src = "img/map/flower4.png";                      //  路上装饰
                        itemdiv.appendChild(tree17);
                        break;
                    case 56:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree18 = document.createElement("img");
                        tree18.src = "img/map/stump1.png";                      //  路上装饰
                        itemdiv.appendChild(tree18);
                        break;
                    case 57:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree19 = document.createElement("img");
                        tree19.src = "img/map/tong.png";                      //  路上装饰
                        itemdiv.appendChild(tree19);
                        break;
                    case 58:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree20 = document.createElement("img");
                        tree20.src = "img/map/img7.png";                      //  路上装饰
                        itemdiv.appendChild(tree20);
                        break;
                    case 59:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree21 = document.createElement("img");
                        tree21.src = "img/map/img8.png";                      //  路上装饰
                        itemdiv.appendChild(tree21);
                        break;
                    case 60:
                        itemdiv.style.background = `url("img/map/road-grass-ltr.png")`;          //  路有草（左上右）
                        break;
                    case 61:
                        itemdiv.style.background = `url("img/map/road-grass-lr.png")`;          //  路有草（左右）
                        break;
                    case 62:
                        itemdiv.style.background = `url("img/map/water1.png")`;
                        let tree22 = document.createElement("img");
                        tree22.src = "img/map/lotus.png";                      //  路上装饰
                        itemdiv.appendChild(tree22);
                        break;
                    case 63:
                        itemdiv.style.background = `url("img/map/water1.png")`;
                        let tree23 = document.createElement("img");
                        tree23.src = "img/map/lotus2.png";                      //  路上装饰
                        itemdiv.appendChild(tree23);
                        break;
                    case 64:
                        itemdiv.style.background = `url("img/map/water1.png")`;
                        let tree24 = document.createElement("img");
                        tree24.src = "img/map/lotus1.png";                      //  路上装饰
                        itemdiv.appendChild(tree24);
                        break;
                    case 65:
                        itemdiv.style.background = `url("img/map/water1.png")`;
                        let tree25 = document.createElement("img");
                        tree25.src = "img/map/lotus3.png";                      //  路上装饰
                        itemdiv.appendChild(tree25);
                        break;
                    case 66:
                        itemdiv.style.background = `url("img/map/grass3-c.png")`;
                        let tree26 = document.createElement("img");
                        tree26.src = "img/map/img9.png";                      //  路上装饰
                        itemdiv.appendChild(tree26);
                        break;



                }
            }
        }
    }
    createGame();

    function judgeGame(oy,ox,y,x,isperson){
			
            let original = document.getElementsByName(oy+"_"+ox)[0];
            let target = document.getElementsByName(y+"_"+x)[0];
            original.style.top = y * gameConfig.boxxx.y + "px";
            original.style.left = x *gameConfig.boxxx.x + "px";
            target.style.top = oy * gameConfig.boxxx.y + "px";
            target.style.left = ox * gameConfig.boxxx.x + "px";
            original.setAttribute("name",y+"_"+x);
            target.setAttribute("name",oy+"_"+ox);
            let tmp = boxxx[gameConfig.map][oy][ox];
            boxxx[gameConfig.map][oy][ox] = boxxx[gameConfig.map][y][x];
            boxxx[gameConfig.map][y][x] = tmp;
            if (isperson) {
                gameConfig.person.y = y;
                gameConfig.person.x = x;
            }
    }
    window.location.hash='move-1';
   
    function BA(){
    	
        // let s1=document.createElement('script');
        // s1.setAttribute('class','s1');
        // s1.src="js/bgm.js";
        let s2=document.createElement('script');
        s2.setAttribute('class','sss');
        s2.src="js/dialog.js";
        let s3=document.createElement('script');
        s3.setAttribute('class','sss');
        s3.src="js/bloodControl.js";
        let s4=document.createElement('script');
        s4.setAttribute('class','sss');
        s4.src="js/battleOption.js";
        // console.log(move_role);
        var move_role=document.querySelector('#move_role');
        console.log(move_role);
        move_role.style.display='none';
        console.log(Battle)
        Battle.style.display='block';
        // vic1.remove();
        // vic2.remove();
        // var ss1=document.querySelectorAll('.sss');
        // ss1[0].src="js/dialog.js";
        // ss1[1].src="js/bloodControl.js";
        // ss1[2].src="js/battleOption.js";
        // Battle.appendChild(s1);
        Battle.appendChild(s2);
        Battle.appendChild(s3);
        Battle.appendChild(s4);
    }
let ooo=true;
    function startGame(){
    	
            document.onkeyup = e=>{
            let zx = gameConfig.person.x;
            let zy = gameConfig.person.y;
            switch(e.keyCode){
                case 32:
                    switch(boxxx[gameConfig.map][zy][zx-1]){
                        case 38: {
                            window.location.hash = "gui";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 39:{
                            window.location.hash = "jjy";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 40:{
                            window.location.hash = "chong";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 41:{
                            window.location.hash = "lada";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 42:{
                            window.location.hash = "fish";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                    }
                    switch(boxxx[gameConfig.map][zy][zx+1]){
                        case 38: {
                            window.location.hash = "gui";
                            if(ooo){
                                BA()
                            }

                        }
                        break;
                        case 39:{
                            window.location.hash = "jjy";
                            if(ooo){
                                BA()
                            }

                        }
                        break;
                        case 40:{
                            window.location.hash = "chong";
                            if(ooo){
                                BA()
                            }

                        }
                        break;
                        case 41:{
                            window.location.hash = "lada";
                            if(ooo){
                                BA()
                            }

                        }
                        break;
                        case 42:{
                            window.location.hash = "fish";
                            if(ooo){
                                BA()
                            }

                        }
                        break;
                    }
                    switch(boxxx[gameConfig.map][zy+1][zx]){
                        case 38: {
                            window.location.hash = "gui";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 39:{
                            window.location.hash = "jjy";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 40:{
                            window.location.hash = "chong";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 41:{
                            window.location.hash = "lada";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 42:{
                            window.location.hash = "fish";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                    }
                    switch(boxxx[gameConfig.map][zy-1][zx]){
                        case 38: {
                            window.location.hash = "gui";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 39:{
                            window.location.hash = "jjy";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 40:{
                            window.location.hash = "chong";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 41:{
                            window.location.hash = "lada";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                        case 42:{
                            window.location.hash = "fish";
                            if(ooo){
                                BA()
                            }

                        }
                            break;
                    }
                    break;
                case 8:
//              	console.log(123)
//                  console.log($id("menu"))
                    if(menuonoff == "off"){
                        menu.style.opacity = .8;
                        menuonoff = "on"
                    }
                    else{
                        menu.style.opacity = "0";
                        menuonoff = "off"
                        
                    }

                    break;
                case 37:

                    var n =1;
                    if(PlayerDirection["left"] == false){
                        PlayerDirection["left"] = true;
                        PlayerDirection["right"] = false;
                        PlayerDirection["forward"] = false;
                        PlayerDirection["back"] = false;
                        player.src = "img/player/PlayerLeft.png";
                        return;
                    }
                    clearInterval(PlayerTimer);
                    if ( PlayerOnoff ==0) {
                        PlayerTimer = setInterval(function () {
                            if (n < 4) {
                                n++;
                                player.src = `img/player/PlayerLeft${n}.png`
                            }

                        }, 150);
                    }
                    switch(boxxx[gameConfig.map][zy][zx-1]){
                        case 0:
                            if (PlayerOnoff == 0 ){
                                judgeGame(zy,zx,zy,zx-1,true);
                                cell.style.left = cell.offsetLeft + (64) + 'px';
                                PlayerOnoff = 1
                            }
                            break;
                    }
                    break;
                case 38:
                    var n = 1;
                    if(PlayerDirection["back"] == false){
                        PlayerDirection["left"] = false;
                        PlayerDirection["right"] = false;
                        PlayerDirection["forward"] = false;
                        PlayerDirection["back"] = true;
                        player.src = "img/player/PlayerBack.png";
                        return;
                    }
                    clearInterval(PlayerTimer);
                    PlayerTimer = setInterval(function () {
                        if (n<4){
                            n++;
                            player.src = `img/player/PlayerBack${n}.png`
                        }
                    },150);

                    switch(boxxx[gameConfig.map][zy-1][zx]){
                        case 0:
                            if (PlayerOnoff == 0 ){
                                judgeGame(zy,zx,zy-1,zx,true);
                                cell.style.top = cell.offsetTop + (64) + 'px';
                                PlayerOnoff = 1
                            }
                            break;
                            
                    }
                    break;
                case 39:
                    var n = 1;
                    if(PlayerDirection["right"] == false){
                        PlayerDirection["left"] = false;
                        PlayerDirection["right"] = true;
                        PlayerDirection["forward"] = false;
                        PlayerDirection["back"] = false;
                        player.src = "img/player/PlayerRight.png";
                        return;
                    }
                    clearInterval(PlayerTimer);
                    PlayerTimer = setInterval(function () {
                        if (n<4){
                            n++;
                            player.src = `img/player/PlayerRight${n}.png`
                        }

                    },150);


                    switch(boxxx[gameConfig.map][zy][zx+1]){
                        case 0:
                            if (PlayerOnoff == 0 ){
                                judgeGame(zy,zx,zy,zx+1,true);
                                cell.style.left = cell.offsetLeft + (-64) + 'px';
                                PlayerOnoff = 1
                            }
                            break;
                    }
                    break;
                case 40:
                    var n = 1;
                    if(PlayerDirection["forward"] == false){
                        PlayerDirection["left"] = false;
                        PlayerDirection["right"] = false;
                        PlayerDirection["forward"] = true;
                        PlayerDirection["back"] = false;
                        player.src = "img/player/PlayerForward.png";
                        return;
                    }
                    clearInterval(PlayerTimer);
                    PlayerTimer = setInterval(function () {
                        if (n<4){
                            n++;
                            player.src = `img/player/PlayerForward${n}.png`
                        }

                    },150);
                    switch(boxxx[gameConfig.map][zy+1][zx]){
                        case 0:
                            if (PlayerOnoff == 0 ){
                                judgeGame(zy,zx,zy+1,zx,true);
                                cell.style.top = cell.offsetTop + (-64) + 'px';
                                PlayerOnoff = 1
                            }
                            break;
                    }
                    break;
            }

        };
    }
    startGame()

        setInterval(function () {
            PlayerOnoff = 0
        },600)

        // document.oncontextmenu = function () {
        //     return false
        // }
