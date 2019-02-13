(module
 (type $i (func (result i32)))
 (type $_ (func))
 (type $i_ (func (param i32)))
 (type $ii (func (param i32) (result i32)))
 (import "gs.as" "INIT_64K_PAGECOUNT" (global $assembly/gs/gs.as/INIT_64K_PAGECOUNT i32))
 (import "gs.as" "MAX_64K_PAGECOUNT" (global $assembly/gs/gs.as/MAX_64K_PAGECOUNT i32))
 (import "gs.as" "X_BUFFER_SIZE" (global $assembly/gs/gs.as/X_BUFFER_SIZE i32))
 (import "gs.as" "xprintf" (func $assembly/gs/gs.as/xprintf))
 (memory $0 1)
 (data (i32.const 8) "\02\00\00\006\005\00")
 (data (i32.const 16) "\08\00\00\00A\00B\00C\00E\00F\00G\00H\00I\00")
 (data (i32.const 40) "\17\00\00\00A\00B\00 \00\'\00{\00$\002\00}\00\'\00 \00C\00D\00E\00F\00 \00{\00$\001\00}\00 \00g\00h\00j\00")
 (data (i32.const 96) "\06\00\00\001\002\003\004\005\006\00")
 (table $0 1 funcref)
 (elem (i32.const 0) $null)
 (global $assembly/gs/gs.as/HO i32 (i32.const 8))
 (global $assembly/gs/gs.as/COLOR i32 (i32.const 16))
 (global $assembly/gs/gs.as/AL_SIZE i32 (i32.const 8))
 (global $assembly/gs/gs.as/AL_MASK i32 (i32.const 7))
 (global $assembly/gs/gs.as/TEST i32 (i32.const -1))
 (global $assembly/gs/gs.as/PAGE_SIZE i32 (i32.const 65536))
 (global $assembly/gs/gs.as/PAGE_MASK i32 (i32.const 65535))
 (global $assembly/gs/gs.as/BLOCK_SIZE i32 (i32.const 4096))
 (global $assembly/gs/gs.as/BLOCK_MASK i32 (i32.const 4095))
 (global $assembly/gs/gs.as/BLOCK_LOG2 i32 (i32.const 12))
 (global $assembly/gs/gs.as/xBufferStartOffset (mut i32) (i32.const 0))
 (global $assembly/gs/gs.as/storeStartOffset (mut i32) (i32.const 0))
 (global $assembly/gs/gs.as/BATInited (mut i32) (i32.const 0))
 (global $assembly/gs/gs.as/BATFirstBlock (mut i32) (i32.const 0))
 (global $assembly/gs/gs.as/xpointer (mut i32) (i32.const 0))
 (global $assembly/gs/gs.as/xtype.eoa i32 (i32.const 0))
 (global $assembly/gs/gs.as/xtype.array i32 (i32.const 1))
 (global $assembly/gs/gs.as/xtype.hashArray i32 (i32.const 2))
 (global $assembly/gs/gs.as/xtype.staticString i32 (i32.const 3))
 (global $assembly/gs/gs.as/xtype.u8 i32 (i32.const 4))
 (global $assembly/gs/gs.as/xtype.u16 i32 (i32.const 5))
 (global $assembly/gs/gs.as/xtype.u32 i32 (i32.const 6))
 (global $assembly/gs/gs.as/xtype.f32 i32 (i32.const 7))
 (global $assembly/gs/gs.as/xtype.pointer i32 (i32.const 8))
 (global $HEAP_BASE i32 (i32.const 112))
 (export "memory" (memory $0))
 (export "table" (table $0))
 (export "HO" (global $assembly/gs/gs.as/HO))
 (export "COLOR" (global $assembly/gs/gs.as/COLOR))
 (export "AL_SIZE" (global $assembly/gs/gs.as/AL_SIZE))
 (export "AL_MASK" (global $assembly/gs/gs.as/AL_MASK))
 (export "TEST" (global $assembly/gs/gs.as/TEST))
 (export "getHeapBase" (func $assembly/gs/gs.as/getHeapBase))
 (export "gsGetXBufferStartOffset" (func $assembly/gs/gs.as/gsGetXBufferStartOffset))
 (export "reset" (func $assembly/gs/gs.as/reset))
 (export "blockAllocate" (func $assembly/gs/gs.as/blockAllocate))
 (export "info" (func $assembly/gs/gs.as/info))
 (start $start)
 (func $assembly/gs/gs.as/getHeapBase (; 1 ;) (type $i) (result i32)
  global.get $HEAP_BASE
 )
 (func $assembly/gs/gs.as/gsGetXBufferStartOffset (; 2 ;) (type $i) (result i32)
  global.get $assembly/gs/gs.as/xBufferStartOffset
 )
 (func $assembly/gs/gs.as/reset (; 3 ;) (type $_)
  (local $0 i32)
  i32.const 0
  global.set $assembly/gs/gs.as/BATFirstBlock
  global.get $assembly/gs/gs.as/storeStartOffset
  local.set $0
  i32.const 1
  global.set $assembly/gs/gs.as/BATInited
 )
 (func $assembly/gs/gs.as/blockAllocate (; 4 ;) (type $i_) (param $0 i32)
  global.get $assembly/gs/gs.as/BATInited
  i32.eqz
  if
   call $assembly/gs/gs.as/reset
  end
 )
 (func $assembly/gs/gs.as/xbegin (; 5 ;) (type $i) (result i32)
  global.get $assembly/gs/gs.as/xBufferStartOffset
  global.set $assembly/gs/gs.as/xpointer
  global.get $assembly/gs/gs.as/xpointer
  global.get $assembly/gs/gs.as/xtype.array
  i32.store8
  global.get $assembly/gs/gs.as/xpointer
  i32.const 1
  i32.add
  global.set $assembly/gs/gs.as/xpointer
  global.get $assembly/gs/gs.as/xpointer
  global.get $assembly/gs/gs.as/xtype.eoa
  i32.store8
  global.get $assembly/gs/gs.as/xpointer
 )
 (func $assembly/gs/gs.as/xpushString (; 6 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  block (result i32)
   global.get $assembly/gs/gs.as/xpointer
   local.tee $1
   i32.const 1
   i32.add
   global.set $assembly/gs/gs.as/xpointer
   local.get $1
  end
  global.get $assembly/gs/gs.as/xtype.staticString
  i32.store8
  global.get $assembly/gs/gs.as/xpointer
  local.get $0
  i32.store
  global.get $assembly/gs/gs.as/xpointer
  i32.const 4
  i32.add
  global.set $assembly/gs/gs.as/xpointer
  global.get $assembly/gs/gs.as/xpointer
  global.get $assembly/gs/gs.as/xtype.eoa
  i32.store8
  i32.const 1
 )
 (func $assembly/gs/gs.as/xpushU32 (; 7 ;) (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  block (result i32)
   global.get $assembly/gs/gs.as/xpointer
   local.tee $1
   i32.const 1
   i32.add
   global.set $assembly/gs/gs.as/xpointer
   local.get $1
  end
  global.get $assembly/gs/gs.as/xtype.u32
  i32.store8
  global.get $assembly/gs/gs.as/xpointer
  local.get $0
  i32.store
  global.get $assembly/gs/gs.as/xpointer
  i32.const 4
  i32.add
  global.set $assembly/gs/gs.as/xpointer
  global.get $assembly/gs/gs.as/xpointer
  global.get $assembly/gs/gs.as/xtype.eoa
  i32.store8
  i32.const 1
 )
 (func $assembly/gs/gs.as/info (; 8 ;) (type $_)
  call $assembly/gs/gs.as/xbegin
  drop
  i32.const 40
  call $assembly/gs/gs.as/xpushString
  drop
  i32.const 332211
  call $assembly/gs/gs.as/xpushU32
  drop
  i32.const 96
  call $assembly/gs/gs.as/xpushString
  drop
  call $assembly/gs/gs.as/xprintf
 )
 (func $start (; 9 ;) (type $_)
  (local $0 i32)
  nop
  nop
  nop
  block $assembly/gs/gs.as/align|inlined.0 (result i32)
   global.get $HEAP_BASE
   local.set $0
   local.get $0
   global.get $assembly/gs/gs.as/AL_MASK
   i32.add
   global.get $assembly/gs/gs.as/AL_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  global.set $assembly/gs/gs.as/xBufferStartOffset
  block $assembly/gs/gs.as/alignToBlock|inlined.0 (result i32)
   global.get $assembly/gs/gs.as/xBufferStartOffset
   global.get $assembly/gs/gs.as/X_BUFFER_SIZE
   i32.add
   local.set $0
   local.get $0
   global.get $assembly/gs/gs.as/BLOCK_MASK
   i32.add
   global.get $assembly/gs/gs.as/BLOCK_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  global.set $assembly/gs/gs.as/storeStartOffset
 )
 (func $null (; 10 ;) (type $_)
 )
)
