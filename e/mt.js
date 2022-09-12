const conditionRegex = /^(\/|-{2}|:)(.+)/
let timecount = 0

const commands = {
    info: {
        alias: ['i'],
        info() {
            const version = __version__,
            contents = [
                'Renamed several function or variable:',
                '\t AddLibrary -> AddLibraries',
                '\t FloatLinkModal -> floatLinkModal',
                '\t style -> define',
                '\t ext -> cli',
                'Added Autocomplete and functions:',
                '\t openRender: Displays a screen',
                '\n⠀ └ ⠀with a black background',
                '\t openCLI: Display in non-terminal state',
                '\t closeCLI: Hide from non-terminal state',
                '\t AddVModule, RemVModule:',
                '\n⠀ └ ⠀Add or remove modules directly',
                'Fix: Mechanism error in command label',
            ]
            log(`In version ${version}\n`
                + contents.map((f, i, a) => {
                    return a.length - 1 === i  // Last┐
                    ? f.replace(/^/, '└─ ').replace(/\n/g, '\n ⠀⠀⠀ ')
                    : /^\n|^\s+$/.test(f) ? f.replace(/\n|^\s+$/g, '│ ⠀⠀') // Blank
                    : /^\t/.test(f) // Tab┐
                    ? f.replace(/^/, '│ ⠀⠀⠀').replace(/\n/g, '\n│ ⠀⠀⠀')
                    : f.replace(/^/, '├─ ').replace(/\n/g, '\n│ ⠀⠀') // Line
                }).join('\n'))
        }
    },
    help: {
        alias: ['?'],
        help() {
            const aliases = []
            for (const entry of Object.entries(commands)) {
                const [name, data] = entry
                aliases.push(name)
                if (data.alias) {
                    data.alias.forEach(f => {
                        if (!aliases.find(e => e === f))
                            aliases.push(f)
                    })
                }
            }
            log(aliases.sort().join(', '))
        }
    },
    quickload: {
        alias: ['qload'],
        quick() {
            AddLibraries(
                './mod/type/any.js',
                './mod/type/bool.js',
                './mod/type/num.js',
                './mod/type/str.js',
                './mod/e/add.js',
                './mod/e/sub.js',
                './mod/e/mul.js',
                './mod/e/div.js',
            )
        }
    },
    get: {
        run(...args) {
            const [key, condition] = args
            if (conditionRegex.test(condition)) {
                const property = conditionRegex.exec(condition)[2]
                switch(property) {
                    default: break
                    case 'local':
                        if (localStorage.getItem(key)) {
                            log(`Get the value from ${key}::*${property}\n> ${
                                localStorage.getItem(key)
                            }`)
                        } break
                    case 'session':
                        if (sessionStorage.getItem(key)) {
                            log(`Get the value from ${key}::*${property}\n> ${
                                sessionStorage.getItem(key)
                            }`)
                        } break
                }
            }
        }
    },
    set: {
        run(...args) {
            let [key, value, condition] = args
            if (conditionRegex.test(condition)) {
                const property = conditionRegex.exec(condition)[2]
                if (localStorage.getItem(key) && property === 'local') {
                    if (/^(true|false)/.test(localStorage.getItem(key))) {
                        value = /^t/.test(value) ? true : false
                    } localStorage.setItem(key, value)
                    log(`The value ${value} was assigned to ${key}::!${property}`)
                } else if (property === 'session') {
                    sessionStorage.setItem(key, value)
                    log(`The value ${value} was assigned to ${key}::${property}`)
                }
            }
        }
    },
    version: {
        alias: ['ver'],
        version() {
            log(`v${__version__}`)
        }
    }
}

function main() {
    return {
        meta: {
            help: 'Shows the history to be continuously developed',
            tip: '{str:type}',
        },
        require: ['str'],
        execute: (args) => {
            for (const entry of Object.entries(commands)) {
                const [name, data] = entry
                const alias = data.alias ?? []
                alias.push(name)
                if (alias.filter(f => f === args[0]).length > 0) {
                    for (const v in data) {
                        const l = data[v]
                        if (typeof l === 'function') {
                            const argv = args
                            argv.shift()
                            l(...argv)
                        }
                    }
                }
            }
        },
        onload: () => {
            AddVModule(['now', 'time'], {
                meta: { help: 'Display the current time' },
                execute: () => {
                    function tds(num) {
                        if (num === 0) num = 12
                        return String(num).length === 1
                            ? num = `0${num}` : num
                    }
                    function getNow() {
                        const now = new Date(),
                        merid = now.getHours() <= 12 ? 'am' : 'pm',
                        hours = tds(now.getHours() > 12 ? now.getHours() - 12 : now.getHours()),
                        minutes = tds(now.getMinutes()),
                        seconds = tds(now.getSeconds())
                        return `${merid} ${hours}:${minutes}:${seconds}`
                    }
                    const count = timecount
                    deb(getNow(), {
                        name: `time${count}`,
                        duration: 0, html: true,
                        height: '28pt',
                        color: 'rgb(181, 181, 181)',
                        'font-size': '16pt',
                    })
                    setInterval(() => query0(`#time${count}`).textContent = getNow(), 1)
                    timecount++
                },
            })
            AddVModule('reload', {
                meta: { help: 'Reload the page' },
                execute: () => reload(),
            })
        }
    }
}