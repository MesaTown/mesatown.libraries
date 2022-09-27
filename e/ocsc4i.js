function main() {
    return {
        descript: 'occultatum',
        marker: null,
        hidden: true,
        require: ['any*'],
        execute: args => {
            if (SHA256(args[0]) === 'e50e6251329bcf16e1b84a63b96e2299574eb44748a3ca3b7c49f3cf9cfb6a82') {
                cli('ocsc4i')
                openRender()
            }
        },
        onload: () => {
            AddLibraries('./e/lab.js')
        },
        oncomplete: () => closeRender()
    }
}