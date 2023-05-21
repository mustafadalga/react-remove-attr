export type Extensions = [] | [ 'jsx' ] | [ 'tsx' ] | [ 'jsx', 'tsx' ] | [ 'tsx', 'jsx' ]

interface Options {
    extensions: Extensions,
    attributes: string[],
    ignoreFolders?: string[]
    ignoreFiles?: string[]
}


export type {
    Options
}