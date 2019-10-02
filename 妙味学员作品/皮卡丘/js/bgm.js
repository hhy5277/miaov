function audio(url,Loop){
    let music=new Audio(url);
    music.loop=Loop;
    music.autoplay=true;
    music.play();
}



