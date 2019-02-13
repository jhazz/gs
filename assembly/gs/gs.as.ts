export const HO: string = "65";
export const COLOR: string = "ABCEFGHI";

export const AL_SIZE: usize = 8;
export const AL_MASK: usize = AL_SIZE - 1;
export const TEST: usize = 0xffffffff;
const PAGE_SIZE = 65536;
const PAGE_MASK = PAGE_SIZE - 1;
const BLOCK_SIZE = 4096;
const BLOCK_MASK = BLOCK_SIZE - 1;
const BLOCK_LOG2 = 12; // 4096 = 1<<12

type BlockNumber = u32;
type BATElement = u32;
type pointer = u32; // pointer to memory

const enum xtype {
  eoa=0,
  array = 1,
  hashArray = 2,
  staticString = 3,
  u8 = 4,
  u16 = 5,
  u32 = 6,
  f32 = 7,
  pointer = 8,
}

const enum blockType {
  HEADER = 7,
  BAT = 11,
  DATA = 22
}
declare const INIT_64K_PAGECOUNT: usize;
declare const MAX_64K_PAGECOUNT: usize;
declare const X_BUFFER_SIZE: usize; // eXchange Buffer places right after HEAP_BASE, aligned to 8
declare function xdump(): void;
export function getHeapBase(): usize {
  return HEAP_BASE;
}


@inline // Shift to next aligned address 
function align(offset: usize): usize {
  return (offset + AL_MASK) & ~AL_MASK;
}
@inline // Shift to next aligned address of block
function alignToBlock(offset: usize): usize {
  return (offset + BLOCK_MASK) & ~BLOCK_MASK;
}
@inline // Shift to next aligned address of page 
function alignToPage(offset: usize): usize {
  return (offset + PAGE_MASK) & ~PAGE_MASK;
}

var xBufferStartOffset: pointer = align(HEAP_BASE);
var storeStartOffset: pointer = alignToBlock(xBufferStartOffset + X_BUFFER_SIZE);
var BATInited: bool = false;
//var BATOffset: usize = 0;
var BATFirstBlock: BlockNumber = 0;

/**
 * for debug purpose
 */
export function gsGetXBufferStartOffset(): pointer {
  return xBufferStartOffset;
}

@unmanaged
class BATBlockHeader {
  typeOfBlock: blockType = blockType.HEADER; // Header block should be HEADER
  prevBlock: BlockNumber; // Previous block in single linked list started from BATFirstBlock
  firstEmptyElementIndex: u16;
  removed: u8;
}


export function reset(): void {
  BATFirstBlock = 0;
  let BATOffset = storeStartOffset; //+(BATFirstBlock << BLOCK_LOG2);
  //BATBlockHeader=BATOffset
  //store(BATOffset,
  BATInited = true;
}
export function blockAllocate(offset: usize): void {
  // At first, check the Block Allocation Table. 
  // If is does not exists - allocate it
  if (!BATInited) {
    reset();
  }

}
var xpointer: pointer;
function xbegin(): pointer {
  xpointer = xBufferStartOffset;
  store<i8>(xpointer, xtype.array);
  xpointer++;
  store<i8>(xpointer, xtype.eoa); 
  return xpointer;
}
function xpushString(s: string): boolean {
  /*
  let sourceStaticString: pointer = changetype<pointer>(s);
  let sourceStaticStringLength: u32 = load<u32>(sourceStaticString);
  // 3 - (type of xelement string(1 byte)+length in uchars (2 bytes)
  // 1 - ending
  if (sourceStaticStringLength >= (X_BUFFER_SIZE - ((sourceStaticStringLength << 1) + 3 + 1)))
    return false;
  let sourceStaticStringLength16: u16 = changetype<u16>(sourceStaticStringLength);
  let spointer: pointer = sourceStaticString + 4;
  store<i8>(xpointer++, xtype.staticString);
  store<i16>(xpointer += 2, sourceStaticStringLength16);
  for (let i: u16 = 0; i < sourceStaticStringLength16; i ++) {
    store<i16>(xpointer += 2, spointer+=2);
  }
  */
  store<i8>(xpointer++, xtype.staticString);
  store<pointer>(xpointer, changetype<pointer>(s)); 
  xpointer+=sizeof<pointer>();
  store<i8>(xpointer, xtype.eoa);
  return true;
}

function xpushU32(v:u32):boolean {
  store<i8>(xpointer++, xtype.u32);
  store<i32>(xpointer,v);
  xpointer+=4;
  store<i8>(xpointer, xtype.eoa);
  return true;
}
function xpushU16(v:u16):boolean {
  store<i8>(xpointer++, xtype.u16);
  store<i16>(xpointer,v);
  xpointer+=2;
  store<i8>(xpointer, xtype.eoa);
  return true;
}

function xpushU8(v:u8):boolean {
  store<i8>(xpointer++, xtype.u8);
  store<i8>(xpointer,v);
  xpointer++;
  store<i8>(xpointer, xtype.eoa);
  return true;
}

export function info(): void {
  //  logger(HEAP_BASE, xtype.pointer);
  //  logger(xBufferStartOffset, xtype.pointer);
  //  logger(storeStartOffset, xtype.pointer);

  //  logger(offsetof<BATBlockHeader>(), xtype.i32);
  //  logger(offsetof<BATBlockHeader>("firstEmptyElementIndex"), xtype.i32);

  //  logger(sizeof<BATBlockHeader>(), xtype.i32);
  //  logger(alignof<BATBlockHeader>(), xtype.i32);
  xbegin();
  xpushString("ABC");
  xpushU32(332211);
  xpushString("123456");
  xdump();
  
}
