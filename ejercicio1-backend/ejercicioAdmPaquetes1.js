const hastaVeinte = (min, max) => {
   return (Math.round(Math.random() * (max - min) + min));
}



const objeto = {
    
}

 for(let i=0 ; i< 10000; i++){
    const result = hastaVeinte(1,20)

    if(objeto[result]){
        objeto[result]= objeto[result] + 1;

    } else{
        objeto[result] = 1
    }
} 

console.log(objeto)