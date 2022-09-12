const confset = {}
function fit(value) {
    return String(value).split('*//;').map(f => {
        for (let i = f.length; i < 5; i ++) f = 0 + f
        return f
    }).join('')
}
function _rd(value, radix) {
    return value.split('').map(f => f.charCodeAt(0)).reduce((x, y) => x + y, 0).toString(radix)
}
function run(data) {
    if (0 < data.length) {
        const map = JSON.parse(localStorage.getItem('oc//__hash_map')) ?? {},
        id = `${data[0]}${fit(data.length)}${data[data.length - 1]}${_rd(data, 24)}`.toUpperCase()
        map[id] = SHA256(data)
        localStorage.setItem('oc//__hash_map', JSON.stringify(map))
        get_oc()
    }
}
function get_oc() {
    const map = JSON.parse(localStorage.getItem('oc//__hash_map'))
    if (map) {
        for (const key of Object.keys(map)) {
            const hash = map[key]
            if (__dev__()) console.info(`%c[dev::ocsc4i.hash]%c \\\\${key}\n%c${hash}`, 'color: #AE2BFF', '', 'color: #8D8E91')
            if (hash == '343d997c827c809e588137fdd7cffad1086a61c37d2cf1da1c89b87566c2a8f7'
                && !/android|tablet|tizen|ios/i.test(platform.os)) {
                AddVModule('open-comp', {
                    meta: { help: 'reperire', tip: '/params/', hidden: true },
                    require: ['any*'],
                    execute: () => {},
                    onstart: () => {
                        openRender()
                    },
                    oncomplete: () => {
                        render.innerHTML = ''
                        is('cli-win').style.removeProperty('animation')
                    }
                })
            }
        }
    }
}
function main() {
    return {
        meta: { help: 'occultatum', tip: ' ', hidden: true },
        require: ['any*'],
        execute: (args) => {
            if (confset['ocopen'] === true) {
                confset['ocport'].push(args.join(';'))
            }
        },
        onload: () => {
            AddLibraries('./e/mt.js')
            get_oc()
        },
        onstart: () => {
            confset['ocopen'] = true
            confset['ocport'] = []
        },
        oncomplete: () => {
            confset['ocopen'] = false
            run(confset['ocport']?.join('\\\\'))
            confset['ocport'] = []
        }
    }
}
