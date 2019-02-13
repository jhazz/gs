# GraphStorage
WebAssembly Graph Storage for using in a TypeScript programs.
Under lazy development.

## Usage
Project has two parts comibined in one:
- TypeScript that have to compile HTML+JS loader from classic TypeScript modules
- AssemblyScript that compiles gs wasm module from AssemblyScript

You should have already installed `AssemblyScript` toolkit, `npm` for the AssemblyScript side. And classic Microsoft TypeScript toolkit for the TypeScript part. Compilation of GraphStorage WASM module do not require Microsoft TypeScript. You may use JS wrapper.

Compile AssemblyScript from `assembly` folder
`npm run asbuild:debug`
or `npm run asbuild:optimize`
Result of build is a WebAssebly binary module `build\gs.wasm` 

Compile TypeScript from `ts` folder
`npm run tsbuild`
Result is a `gs.js` module that used as loader of wasm module and export wasm functions to the javascript namespace.

# Modules
## gs.as.ts
Source: assembly/gs/`gs.as.ts`
Builds to: build/`gs.wasm` [wat, wasm.map]

### Exported functions
#### getXBufferStartOffset (): usize
Reurns offset of XBuffer where exchange data could be placed.
XBuffer has X_BUFFER_SIZE bytes as requested at initial module setup

#### blockAllocate(count:usize): usize
Allocate one block
Returns: block offset in memory

---

### Internal functions
#### inline align(i: usize): usize
Aligns `offset` to the nearest right i64 position. 
Returns same ofset if the offset is already aligned

#### inline alignToBlock(i: usize): usize
Aligns `offset` to the nearest right `Block` position
First allocated block placed right after alignToBlock(HEAP_BASE + X_BUFFER_SIZE)

#### inline alignToPage(i: usize): usize
Aligns `offset` to the nearest right `64K-page` position.

---
Little Gist. (Thanks to https://github.com/MaxGraey for adoption)
https://webassembly.studio/?f=l00wnrt4vs