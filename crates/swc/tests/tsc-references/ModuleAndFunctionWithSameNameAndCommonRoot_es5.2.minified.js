var A;
!function(A) {
    (A.Point || (A.Point = {})).Origin = {
        x: 0,
        y: 0
    };
}(A || (A = {}));
var A;
!function(A) {
    var Point = function() {
        return {
            x: 0,
            y: 0
        };
    };
    A.Point = Point;
}(A || (A = {}));
var B;
!function(B) {
    var Point = function() {
        return {
            x: 0,
            y: 0
        };
    };
    (Point = B.Point || (B.Point = {})).Origin = {
        x: 0,
        y: 0
    }, B.Point = Point;
}(B || (B = {}));
