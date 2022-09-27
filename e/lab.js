let timecount = 0

function parseURL() {
    const value = decodeURIComponent(location.pathname).replace(/^\//, ''),
    params = new URLSearchParams(location.search)
    const n = parseInt(params.get('r'))
    n === 0 ? PostCommand && PostCommand(`${value} ${params.get('v') || ''}`) : null
    history.replaceState({}, null, '/')
}
function main() {
    const commands = {
        help: {
            alias: ['?'],
            function() {
                const aliases = []
                for (const entry of Object.entries(commands)) {
                    const [name, data] = entry
                    aliases.push(name)
                    data.alias && data.alias.forEach(f => aliases.find(e => e === f) || aliases.push(f))
                }
                log(aliases.sort().join(', '))
            }
        },
        version: {
            alias: ['v'],
            function() {
                const version = __version__,
                contents = [
                    'Module required return values were fixed',
                    'Now using MomentJS Library',
                    'Take advantage of the URL a little more!',
                    `\t [${location.origin}/lab&v=help&r=0]\nwith this feeling`,
                    '\n',
                    'Almost ready to start the second project\nnow',
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
        quickload: {
            alias: ['qload'],
            function() {
                AddLibraries(
                    './mod/type/any.js',
                    './mod/type/bool.js',
                    './mod/type/num.js',
                    './mod/type/str.js')
            }
        }
    }
    return {
        descript: 'Shows the command to be continuously developed - [lab help]',
        marker: '{str:type}',
        require: ['str'],
        execute: args => {
            for (const entry of Object.entries(commands)) {
                const [name, data] = entry,
                    alias = data.alias ?? []
                alias.push(name)
                if (alias.filter(f => f === args[0]).length > 0) {
                    for (const v in data) {
                        const l = data[v]
                        typeof l === 'function' && (args.shift(), l(...args))
                    }
                }
            }
        },
        onload: () => {
            AddVModule(['now', 'time'], {
                meta: { help: 'Display the current time' },
                execute: () => {
                    const count = timecount
                    deb(moment().format('a hh:mm:ss'), {
                        name: `time${timecount}`,
                        duration: 0, html: !0,
                        height: '28pt',
                        color: 'rgb(181, 181, 181)',
                        'font-size': '16pt'})
                    setInterval(() => query0(`#time${count}`).textContent = moment().format('a hh:mm:ss'), 1)
                    timecount++
                },
            })
            AddVModule('reload', { meta: { help: 'Reload the page' }, execute: () => reload() })
            setTimeout(() => parseURL(), 0)
        }
    }
}
