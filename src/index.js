class Point {
    constructor(_x, _y) {
        this._x = _x;
        this._y = _y;
        Point.checkValue(_x);
        Point.checkValue(_y);
    }
    static checkValue(value) {
        if (value < Point.minValue || value > Point.maxValue) {
            throw `wrong value ${value}, should be in range [${Point.minValue} - ${Point.maxValue}]`;
        }
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value) {
        Point.checkValue(value);
        this._x = value;
    }
    set y(value) {
        Point.checkValue(value);
        this._y = value;
    }
    draw() {
        console.log(`Point [x: ${this._x}, y: ${this._y}]`);
    }
}
Point.minValue = -100;
Point.maxValue = 100;
class Line extends Point {
    constructor(x, y, _point) {
        super(x, y);
        this._point = _point;
    }
    draw() {
        console.log("-----------Line----------");
        super.draw();
        this._point.draw();
        console.log('-'.repeat(20));
    }
    get point() {
        return this._point;
    }
}
class Square extends Point {
    constructor(x, y, _width) {
        super(x, y);
        this._width = _width;
    }
    get width() {
        return this._width;
    }
    draw() {
        console.log("--------Square-----------");
        super.draw();
        console.log(`width: ${this._width}`);
        console.log("-".repeat(20));
    }
}
class Rectangle extends Square {
    constructor(x, y, width, _height) {
        super(x, y, width);
        this._height = _height;
    }
    draw() {
        console.log("==========Rectangle=================");
        super.draw();
        console.log(`height: ${this._height}`);
        console.log("=".repeat(20));
    }
}
//===========================HW33=========================
class Canvas {
    constructor() {
        this._shapes = [];
    }
    draw() {
        console.log("-----canvas-----");
        this._shapes.forEach(s => s.draw());
    }
    addShape(shape) {
        this._shapes.push(shape);
        return this._shapes.indexOf(shape);
    }
    removeShape(index) {
        return this._shapes.splice(index, 1)[0];
    }
    sort() {
        this._shapes.sort((a, b) => (a.x - b.x) || (b.y - a.y));
    }
    removeIf(predicate) {
        this._shapes.forEach((s, i) => predicate(s) && this.removeShape(i));
    }
}
const canvas = new Canvas();
const add1 = canvas.addShape(new Square(10, 15, 20));
const add2 = canvas.addShape(new Point(8, 7));
const add3 = canvas.addShape(new Rectangle(10, 12, 12, 15));
canvas.addShape(new Line(15, 6, new Point(20, 2)));
canvas.addShape(new Line(4, 8, new Point(10, 2)));
canvas.addShape(new Line(7, 1, new Point(6, 6)));
canvas.addShape(new Line(5, 10, new Point(2, 5)));
console.log(add1, add3, add2);
canvas.sort();
canvas.draw();
const remove = canvas.removeShape(1);
console.log(remove);
canvas.removeIf((p) => (p.constructor.name == "Line") && (p.point.x > p.x));
canvas.draw();
