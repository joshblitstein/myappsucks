
const bedo = "beo"

let pro = new Promise((resolve, reject) =>{
if(bedo === "bedo"){
    resolve("gun")
}else{
    reject("chow")
}
})

pro.then((f)=>{
    console.log(f)
}).catch((f)=>{
    console.log(f)
})