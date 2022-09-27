function main(){
    return {
        descript: "Assign a function to a key combo.\nIt can be inconvenient within the command.\r\n\n - [bind \"ctrl+r\" \"location.reload()\"]",
        marker: "{str:combo} {str:function}",
        require: ['str','str'],
        execute: args => bind(args[0], new Function(args[1]))
    }
}