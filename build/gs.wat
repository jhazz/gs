(module
 (type $i (func (result i32)))
 (type $v (func))
 (type $iv (func (param i32)))
 (import "gs.as" "INIT_64K_PAGECOUNT" (global $assembly/gs/gs.as/INIT_64K_PAGECOUNT i32))
 (import "gs.as" "MAX_64K_PAGECOUNT" (global $assembly/gs/gs.as/MAX_64K_PAGECOUNT i32))
 (import "gs.as" "X_BUFFER_SIZE" (global $assembly/gs/gs.as/X_BUFFER_SIZE i32))
 (import "gs.as" "logger" (func $assembly/gs/gs.as/logger (param i32)))
 (memory $0 1)
 (data (i32.const 8) "\02\00\00\006\005\00")
 (data (i32.const 16) "\06\00\00\00A\00B\00C\00D\00E\00F\00")
 (table $0 1 anyfunc)
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
 (global $assembly/gs/gs.as/xBufferStartOffset (mut i32) (i32.const 0))
 (global $assembly/gs/gs.as/gsStartOffset (mut i32) (i32.const 0))
 (global $HEAP_BASE i32 (i32.const 32))
 (export "memory" (memory $0))
 (export "table" (table $0))
 (export "HO" (global $assembly/gs/gs.as/HO))
 (export "COLOR" (global $assembly/gs/gs.as/COLOR))
 (export "AL_SIZE" (global $assembly/gs/gs.as/AL_SIZE))
 (export "AL_MASK" (global $assembly/gs/gs.as/AL_MASK))
 (export "TEST" (global $assembly/gs/gs.as/TEST))
 (export "gsGetHeapBase" (func $assembly/gs/gs.as/gsGetHeapBase))
 (export "gsGetMemInit" (func $assembly/gs/gs.as/gsGetMemInit))
 (export "getAligned" (func $assembly/gs/gs.as/getAligned))
 (export "getAligned2" (func $assembly/gs/gs.as/getAligned2))
 (start $start)
 (func $assembly/gs/gs.as/gsGetHeapBase (; 1 ;) (type $i) (result i32)
  get_global $HEAP_BASE
 )
 (func $assembly/gs/gs.as/gsGetMemInit (; 2 ;) (type $v)
  get_global $HEAP_BASE
  call $assembly/gs/gs.as/logger
  get_global $assembly/gs/gs.as/xBufferStartOffset
  call $assembly/gs/gs.as/logger
  get_global $assembly/gs/gs.as/gsStartOffset
  call $assembly/gs/gs.as/logger
 )
 (func $assembly/gs/gs.as/getAligned (; 3 ;) (type $iv) (param $0 i32)
  block $assembly/gs/gs.as/align|inlined.1 (result i32)
   get_local $0
   get_global $assembly/gs/gs.as/AL_MASK
   i32.add
   get_global $assembly/gs/gs.as/AL_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  call $assembly/gs/gs.as/logger
  block $assembly/gs/gs.as/alignToBlock|inlined.1 (result i32)
   get_local $0
   get_global $assembly/gs/gs.as/BLOCK_MASK
   i32.add
   get_global $assembly/gs/gs.as/BLOCK_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  call $assembly/gs/gs.as/logger
  block $assembly/gs/gs.as/alignToPage|inlined.0 (result i32)
   get_local $0
   get_global $assembly/gs/gs.as/PAGE_MASK
   i32.add
   get_global $assembly/gs/gs.as/PAGE_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  call $assembly/gs/gs.as/logger
 )
 (func $assembly/gs/gs.as/getAligned2 (; 4 ;) (type $iv) (param $0 i32)
  (local $1 i32)
  block $assembly/gs/gs.as/align|inlined.2 (result i32)
   get_local $0
   get_global $assembly/gs/gs.as/AL_MASK
   i32.add
   get_global $assembly/gs/gs.as/AL_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  call $assembly/gs/gs.as/logger
  block $assembly/gs/gs.as/align|inlined.3 (result i32)
   get_local $0
   i32.const 1
   i32.add
   set_local $1
   get_local $1
   get_global $assembly/gs/gs.as/AL_MASK
   i32.add
   get_global $assembly/gs/gs.as/AL_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  call $assembly/gs/gs.as/logger
  block $assembly/gs/gs.as/align|inlined.4 (result i32)
   get_local $0
   i32.const 2
   i32.add
   set_local $1
   get_local $1
   get_global $assembly/gs/gs.as/AL_MASK
   i32.add
   get_global $assembly/gs/gs.as/AL_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  call $assembly/gs/gs.as/logger
 )
 (func $start (; 5 ;) (type $v)
  (local $0 i32)
  block $assembly/gs/gs.as/align|inlined.0 (result i32)
   get_global $HEAP_BASE
   set_local $0
   get_local $0
   get_global $assembly/gs/gs.as/AL_MASK
   i32.add
   get_global $assembly/gs/gs.as/AL_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  set_global $assembly/gs/gs.as/xBufferStartOffset
  block $assembly/gs/gs.as/alignToBlock|inlined.0 (result i32)
   get_global $assembly/gs/gs.as/xBufferStartOffset
   get_global $assembly/gs/gs.as/X_BUFFER_SIZE
   i32.add
   set_local $0
   get_local $0
   get_global $assembly/gs/gs.as/BLOCK_MASK
   i32.add
   get_global $assembly/gs/gs.as/BLOCK_MASK
   i32.const -1
   i32.xor
   i32.and
  end
  set_global $assembly/gs/gs.as/gsStartOffset
 )
 (func $null (; 6 ;) (type $v)
 )
)
