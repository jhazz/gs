(module
 (type $v (func))
 (memory $0 0)
 (table $0 1 anyfunc)
 (elem (i32.const 0) $null)
 (global $assembly/gs/test.as/UNSIGNED_VALUE1 i32 (i32.const 100000))
 (global $assembly/gs/test.as/UNSIGNED_VALUE2 i32 (i32.const -1))
 (global $assembly/gs/test.as/UNSIGNED_VALUE3 i32 (i32.const -1))
 (global $HEAP_BASE i32 (i32.const 8))
 (export "memory" (memory $0))
 (export "table" (table $0))
 (export "UNSIGNED_VALUE1" (global $assembly/gs/test.as/UNSIGNED_VALUE1))
 (export "UNSIGNED_VALUE2" (global $assembly/gs/test.as/UNSIGNED_VALUE2))
 (export "UNSIGNED_VALUE3" (global $assembly/gs/test.as/UNSIGNED_VALUE3))
 (func $null (; 0 ;) (type $v)
 )
)