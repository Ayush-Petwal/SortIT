var n=20;
var array=[];
var algo="";
var speed=200;

function getParameters(parameterName){
    let parameters=new URLSearchParams(window.location.search);
    algo= parameters.get(parameterName)
    document.getElementById("putalgo").innerHTML=algo;
}

getParameters("algo");

function setSize(){
    var size=document.getElementById("sizerange").value;
    document.getElementById("size").innerHTML=size;
    init();
}

function setSpeed(){
    var tempspeed=document.getElementById("speedrange").value;
    document.getElementById("speed").innerHTML=tempspeed+"x";
    speed= 101 - 10*tempspeed;
}

setSize();
setSpeed();

let audio=null;
function playNote(freq){
    if(audio==null){
        audio=new(AudioContext || webkitAudioContext || window.webkitAudioContext)();
    }
    const dur=0.1;
    const osc=audio.createOscillator();
    osc.frequency.value=freq;
    osc.start();
    osc.stop(audio.currentTime+dur);
    const node=audio.createGain();
    node.gain.value=0.1;
    node.gain.linearRampToValueAtTime(0,audio.currentTime+dur)
    osc.connect(node);
    node.connect(audio.destination)
}

function init(){
    n=document.getElementById("sizerange").value;
    const temp=[]
    for(let i=0;i<n;i++){
        temp[i]=Math.random();
    }
    array=temp;
    showBars();
}

function play(){
    document.getElementById("init").disabled = true;
    document.getElementById("sizerange").disabled = true;
    document.getElementById("speedrange").disabled = true;
    document.getElementById("play").disabled = true;
    const copy=[...array]
    var moves=1;
    if(algo==="Bubble Sort"){
        moves=bubbleSort(copy);
    }else if(algo==="Selection Sort"){
        moves=selectionSort(copy);
    }else if(algo==="Insertion Sort"){
        moves=insertionSort(copy);
    }else if(algo==="Merge Sort"){
        moves=mergeSort(copy);
    }else{
        moves=quickSort(copy);
    }
    
    animate(moves , function(){
        document.getElementById("init").disabled = false;
        document.getElementById("sizerange").disabled = false;
        document.getElementById("speedrange").disabled = false;
        document.getElementById("play").disabled = false;
    });

}


function animate(moves , callback){
    if(moves.length==0){
        showBars();
        if (typeof callback === 'function') {
            callback();
        }
        return;
    }
    const move=moves.shift();
    const [i,j]=move.indices;

    if(move.type=="swap"){
        [array[i],array[j]]=[array[j],array[i]];
    }

    playNote(200+array[i]*500);
    playNote(200,array[j]*500);

    showBars(move);
    setTimeout(function(){
        animate(moves , callback);
    },speed);
}


function bubbleSort(array){
    const moves=[];
    do{
        var swapped=false;
        for(let i=1;i<array.length;i++){
            moves.push({indices:[i-1,i],type:"comp"});
            if(array[i-1]>array[i]){
                swapped=true;
                moves.push({indices:[i-1,i],type:"swap"});
                [array[i-1],array[i]]=[array[i],array[i-1]]
            }
        }
    }while(swapped);

    return moves;
}

function selectionSort(array){
    const moves=[];
    for(let i=0;i<array.length;i++){
        var minIdx=i;
        for(let j=i+1;j<array.length;j++){
            moves.push({indices:[minIdx,j],type:"comp"});
            if(array[minIdx]>array[j]){
                minIdx=j;
            }
        }
        moves.push({indices:[i,minIdx],type:"swap"});
        [array[i],array[minIdx]]=[array[minIdx],array[i]]
    }

    return moves;
}

function insertionSort(array){
    const moves=[];
    for(let i=1;i<array.length;i++){
        let key=array[i]
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            moves.push({indices:[j+1,j],type:"comp"});
            moves.push({indices:[j+1,j],type:"swap"});
            array[j+1]=array[j];
            j=j-1;
        }
        array[j+1]=key;
    }

    return moves;
}

function merge(moves,array, l, m, r)
{
    let i=l,j=m+1;
    while (i<=m && j<=r) {
        moves.push({indices:[i,j],type:"comp"});
        if (array[i] < array[j]) {
            i++;
        } else {
            moves.push({indices:[i,j],type:"swap"});
            [array[i],array[j]]=[array[j],array[i]]
            let p=j+1
            while(p<=r && array[p-1]>array[p]){
                moves.push({indices:[p-1,p],type:"swap"});
                [array[p-1],array[p]]=[array[p],array[p-1]]
                p++;
            }
            i++;
        }
    }
}
 

function MERGESORT(moves,array,l, r){
    if(l>=r){
        return;
    }
    var m =l+ parseInt((r-l)/2);
    MERGESORT(moves,array,l,m);
    MERGESORT(moves,array,m+1,r);
    merge(moves,array,l,m,r);
}

function mergeSort(array){
    var h=array.length-1;
    const moves=[];
    MERGESORT(moves,array,0,h);

    return moves
}



function partition(moves, arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
   
    for (let j = low; j <= high - 1; j++) {
        moves.push({indices:[j,high],type:"comp"});
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
            moves.push({indices:[i,j],type:"swap"});
        }
    }
   
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    moves.push({indices:[i+1,high],type:"swap"});
    return i + 1;
}
 
function QUICKSORT(moves,arr, low, high) {
    if (low < high) {
        let pi = partition(moves,arr, low, high);
        QUICKSORT(moves,arr, low, pi - 1);
        QUICKSORT(moves,arr, pi + 1, high);
    }
}


function quickSort(array){
    var h=array.length;
    const moves=[];
    QUICKSORT(moves,array,0,h-1);

    return moves;
}


function showBars(move){
    container.innerHTML="";
    for(let i=0;i<array.length;i++){
        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        bar.classList.add("bar");
        
        if(move && move.indices.includes(i)){
            bar.style.backgroundColor=move.type=="swap"?"red":"blue";
        }

        container.appendChild(bar);
    }
    
}

