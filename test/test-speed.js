#!/usr/bin/env node 

const objc = require('objc')

let v 

v = objc.NSString.stringWithString_('')
v.description()

let v2 = v

console.log()

// objc.NSAppleScriptErrorAppName


let i, n = 10//00 // currently does 1K repeat calls in ~0.15sec, which is slow but usable; however, there is still significant overhead when converting argument and return values, operations which themselves involve calling multiple ObjC methods - currently each of those method invocations also goes through the full objc bridge, but since there's only a handful of standard JS types to bridge we could bypass the wrappers and use raw pointers to their corresponding ObjC classes, instances, and methods directly in ffi)

let b = true

let t = process.hrtime.bigint()

for (i=0;i<n;i++) {
	v = objc.NSString.stringWithString_(v) //`S${i}`)
	b = 1 && v.description()
	//console.log()
}

console.log('J: '+(Number(process.hrtime.bigint() - t)/1e9)+'sec')


console.log(i+' ' + typeof v+' = '+v) // 10000 object = [ObjCInstance __NSCFConstantString]

console.log(objc.isClass(v) + '  ' + objc.isInstance(v)) // false, true


let s1 = objc.NSString.stringWithString_('one')
let s2 = objc.NSString.stringWithString_('two')
let s3 = objc.NSString.stringWithString_('one')

console.log(s1.isEqual_(s2) + ' ' + s1.isEqual_(s3) + ' ' + s1.isEqual_('one')) // false true true

let arr = objc.ns([s1, s2, s3])
//console.log(arr) // TO DO: fix JS description strings, as they are currently borked

console.log(arr.description().UTF8String()) // '(\n    one,\n    two,\n    one\n)'

let s = arr.componentsJoinedByString_('/')

console.log(objc.js(s)) // 'one/two/one'
