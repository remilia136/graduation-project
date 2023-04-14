var clients = [0,2,3,5,6,67,3,2,0]
console.log(clients.length)
for(let i = 0 ; i < clients.length ; i++){
    if(clients[i]==0){
        for(let f = i+1 ; f < clients.length ; f ++){
            clients[f-1]=clients[f];
        }
        clients.pop();
        i--;
        console.log(clients.length)
    }
}
console.log("test")