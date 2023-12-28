if ("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js").then(reg => {
    console.log("SW Registered",reg);
    
  }).catch(err =>{
    console.log("SW Registration fail");
    console.log(err);
  })
}