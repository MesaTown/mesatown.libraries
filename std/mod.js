const A5738 = /^\*$/
const D364 = /^def(ault)?$/
const S76 = /(http(s))?:(\/{2})?(\S+\.\w+)\/((.+)\.(js))/
const I8736 = /^\.\S+(\.js)$/

function main() {
    function diag(data) {
        if (S76.test(data) || I8736.test(data)) {
            AddLibraries(data)
        } else if (D364.test(data)) {
            AddLibraries(
                './std/bind.js',
                './std/clear.js',
                './std/close.js',
                './std/help.js',
                './std/mod.js',
                './std/unmod.js',
                './e/mt.js')
        } else if (A5738.test(data)) {
            const entry = Object.entries(glib)
            entry.forEach(([name, func]) => lib[name] = func)
        }
    }
    return {
        meta: {
            help: 'Link Module',
            tip: '{* | default | src}',
        },
        require: ['str'],
        execute: args => {
            for (let i = 0; i < args.length; i++) {
                diag(args[0])
            }
        },
    }
}
