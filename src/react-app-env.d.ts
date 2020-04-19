/// <reference types="react-scripts" />

declare module 'language-map' {
  const d: {
    [name: string]:
      | {
          type: 'data' | 'programming' | 'markup' | undefined
          aliases: string[]
          filenames: string[]
          extensions: string[]
          interpreters: string[]
          wrap: boolean
          color: string
          group: string
          aceMode: string
          searchable: string
          searchTerm: string
          languageId: number
        }
      | undefined
  }
  export default d
}
