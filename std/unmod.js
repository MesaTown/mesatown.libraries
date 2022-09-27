function main() {
    return {
        descript: "Unlink Module",
        marker: "{* | module}",
        require: ["str"],
        execute: e => lib[e[0]] && RemVModule(e[0])
    }
}