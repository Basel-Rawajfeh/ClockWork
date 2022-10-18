let timeObj={
    minutes:0,
    seconds:0,
    timerId:0
}

function soundAlarm(){
    let amount=3;
    let audio=new Audio("Timer_Sound_Effect.mp3");
    function playSound(){
        audio.pause();
        audio.currentTime=0;
        audio.play(); 
    }
    for (let i=0;i<amount;i++){
        setTimeout(playSound,1200*i);
}}


function updateValue(key,value){
    if(value<0){
        value=0;
        alert("Negative values are not allowed");
    }
    if(key=="seconds"){
        if(value<10){
            value="0"+value;
        }
        if(value>59){
            value=59;
        }
    }
    $("#"+key).html(value||0);
    timeObj[key]=value;
} 

(function detectChanges(key) {
    let input = "#"+key+"-input";

    $(input).change(function(){
        updateValue(key ,$(input).val());
    });
    $(input).keyup(function(){
        updateValue(key,$(input).val());
    });
    return arguments.callee;
})("minutes")("seconds");

function startTimer(){
    buttonManager(["start",false],["pause",true],["stop",true]);
    freezeInput();
    timeObj.timerId=setInterval(function(){
        timeObj.seconds--;
        if(timeObj.seconds<0){
            if(timeObj.minutes==0){
                soundAlarm();
                return stopTimer();
            }
            timeObj.seconds=59;
            timeObj.minutes--;
        }
        updateValue("minutes",timeObj.minutes);
        updateValue("seconds",timeObj.seconds);
    },1000);


}

function stopTimer(){
    clearInterval(timeObj.timerId);
    buttonManager(["start",true],["pause",false],["stop",false]);
    unfreezeInput();
    updateValue("minutes",$("#minutes-input").val());
    updateValue("seconds",$("#seconds-input").val());
    let seconds = $("#seconds-input").val()||"0";
    updateValue("seconds",seconds);

}

function pauseTimer(){
    buttonManager(["start",true],["pause",false],["stop",true]);
    clearInterval(timeObj.timerId);


}

function buttonManager(...buttonArray){
    for (let i=0;i<buttonArray.length;i++){
        let button="#"+buttonArray[i][0]+"-button";
        if (buttonArray[i][1]){
            $(button).removeAttr("disabled");
        }else{
            $(button).attr("disabled","disabled");
        }
    }

}

function freezeInput(){
    $("#minutes-input").attr("disabled","disabled");
    $("#seconds-input").attr("disabled","disabled");
}

function unfreezeInput(){
    $("#minutes-input").removeAttr("disabled");
    $("#seconds-input").removeAttr("disabled");
}