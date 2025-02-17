// In a contextually typed array literal expression containing no spread elements, an element expression at index N is contextually typed by
//      the type of the property with the numeric name N in the contextual type, if any, or otherwise
//      the numeric index type of the contextual type, if any.
import _to_consumable_array from "@swc/helpers/src/_to_consumable_array.mjs";
var array = [
    1,
    2,
    3
];
var array1 = [
    true,
    2,
    3
]; // Contextual type by the numeric index type of the contextual type
var tup = [
    1,
    2,
    3,
    4
];
var tup1 = [
    1,
    2,
    3,
    "string"
];
var tup2 = [
    1,
    2,
    3,
    "string"
]; // Error
// In a contextually typed array literal expression containing one or more spread elements,
// an element expression at index N is contextually typed by the numeric index type of the contextual type, if any.
var spr = [
    1,
    2,
    3
].concat(_to_consumable_array(array));
var spr1 = [
    1,
    2,
    3
].concat(_to_consumable_array(tup));
var spr2 = [
    1,
    2,
    3
].concat(_to_consumable_array(tup)); // Error
