const ws = new WebSocket('ws://localhost:5000');

ws.onopen = (_ev:Event)=>{

}

ws.onmessage = (ev:MessageEvent)=>{
    console.log(ev.data);
    const {data,type} = ev;
    
}