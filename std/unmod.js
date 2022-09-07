const A5738 = /^\*$/

function main() {
    return {
        meta: {
            help: 'Unlink Module',
            tip: '{* | module}',
        },
        require: ['str'],
        execute: args => {
            if (A5738.test(args[0])) {
                for (const v in lib) {
                    glib[v] = lib[v]
                    delete lib[v]
                }  AddLibrary(
                    './std/bind.js',
                    './std/clear.js',
                    './std/close.js',
                    './std/help.js',
                    './std/mod.js',
                    './std/unmod.js',
                    './e/mt.js')
            } else if (lib[args[0]]) {
                glib[args[0]] = lib[args[0]]
                delete lib[args[0]]
            }
        },
    }
}
