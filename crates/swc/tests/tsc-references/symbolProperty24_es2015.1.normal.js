//@target: ES6
class C {
    [Symbol.toPrimitive]() {
        return "";
    }
}
