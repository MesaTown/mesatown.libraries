function main() {
    return {
        descript: "Shows help for the command",
        marker: null,
        require: [],
        execute: (args = []) => {
            if (args.length >= 1 && lib[args[0]] && !/help/.test(args[0])) {
                const module = lib[args[0]]()
                module.descript && log(module.descript)
            } else if (args.length <= 0 || /help/.test(args[0])) {
                const help = []
                Object.entries(lib).sort().forEach(f => {
                    const [name, fn] = f, module = fn()
                    if (!/^\W/.test(name) && !module.hidden) help.push(name)
                }), log(help.join(', '))
            }
        },
        onload: () => {
            Object.entries(lib).sort().forEach(f => {
                const [name, fn] = f, module = fn()
                module.aliases && name !== module.aliases
                    && AddVModule(module.aliases, module)
            })
        }
    }
}