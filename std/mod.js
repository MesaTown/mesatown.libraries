const D364 = /^def(ault)?$/, S76 = /(http(s))?:(\/{2})?(\S+\.\w+)\/((.+)\.(js))/, I8736 = /^\.\S+(\.js)$/
function main() {
    const t = t => S76.test(t) || I8736.test(t) ? AddLibraries(t)
        : D364.test(t) && AddLibraries(...define.get("&a2"))
    return {
        descript: "Link Module",
        marker: "{* | default | src}",
        require: ["str"],
        execute: e => t(e[0])
    }
}