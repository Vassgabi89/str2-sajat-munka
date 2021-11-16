let clockDiv = document.getElementsByClassName("clock");
let locale = navigator.language

const clock = () => {
    let now = new Date()
    let formattedTime = now.toLocaleTimeString(locale,{ hour12: false })
    
    //1. opció
    clockDiv[0].innerHTML = `${formattedTime}`
    
    //2-es opció:
    // let timeArray=[...formattedTime]
    // clockDiv[0].innerHTML = `${timeArray[0]} ${timeArray[1]} <span class="red">{</span> ${timeArray[3]} ${timeArray[4]} <span class="red">}</span> ${timeArray[6]} ${timeArray[7]}`

    //3-as opció:
    //clockDiv[0].innerHTML = `${now.getHours().toString().padStart(2,0)}:${now.getMinutes().toString().padStart(2,0)}:${now.getSeconds().toString().padStart(2,0)}`
    
    //getTimezoneOffset()-el lehetne mókolni esetleg, de ahogy kipróbáltam az óra enélkül is mindig a jó időt fogja mutatni minden időzónában
    //console.log(Intl.DateTimeFormat(locale).format(now))

    setTimeout(clock, 1000)
  }
    

clock()



