function main(){
    return {
        descript: "Clear the log",
        require: [],
        execute: () => {
            if (Log) for(let i=0;i<Log.length;i++)Log[i].remove()
        }
    }
}