window.timers = [];

const lP = x=>x.toString().length == 1 ? `0${x}` : x;

const tickTimers = ()=>{
    document.querySelectorAll("[data-timer]").forEach(x=>{
        const time = x.dataset.timer;
        for (let index = 0; index < window.timers.length; index++) {
            const element = window.timers[index];
            if (x.dataset.id == element.id){
                return;
            }
        }
        x.dataset.id = window.crypto.randomUUID(); 
        window.timers.push({"time": new Date(time), "id": x.dataset.id});
    });

    const curDate = new Date();
    window.timers.forEach(x=>{
        
        const diff = x.time > curDate ? (Math.abs(curDate-x.time)/1000) : 0; // to work with S
        let newText = '00:00:00';
        if(diff >=1 ){
            const h = Math.floor(diff/60/60);
            const m = Math.abs((h*60) - Math.floor(diff/60));
            const s = Math.floor(Math.abs(diff - (h*60*60) - (m*60)));
            newText = `${lP(h)}:${lP(m)}:${lP(s)}`;
        }
        document.querySelector(`[data-id="${x.id}"]`).textContent = newText;
    })
}

setInterval(tickTimers, 1000);