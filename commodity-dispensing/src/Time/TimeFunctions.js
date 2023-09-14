export function fetchDate() {
    let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    return (date<10?'0':'') + date +'.' + (month<10?'0':'') + month +'.'+ year;
}

export function fetchTime(){
  let d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();

  return (hours<10?'0':'') + hours + ':' + (minutes<10?'0':'') + minutes;
}