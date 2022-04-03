interface Shape {
    draw(): void;
}
class Point implements Shape {
    static readonly minValue = -100;
    static readonly maxValue = 100;
    static checkValue(value: number) {
        if (value < Point.minValue || value > Point.maxValue) {
            throw `wrong value ${value}, should be in range [${Point.minValue} - ${Point.maxValue}]`
        }
    }
    constructor(private _x: number, private _y: number) {
        Point.checkValue(_x);
        Point.checkValue(_y);
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value: number) {
        Point.checkValue(value);
        this._x = value;
    }
    set y(value: number) {
        Point.checkValue(value);
        this._y = value;
    }
    draw(): void {
        console.log(`Point [x: ${this._x}, y: ${this._y}]`)
    }
    
}
class Line extends Point {
    constructor(x: number, y: number, private _point: Point) {
        super(x, y);
    }
    draw() {
        console.log("-----------Line----------")
        super.draw();
        this._point.draw();
        console.log('-'.repeat(20));
    }
    get point() {
        return this._point;
    }
}
class Square extends Point {
    constructor(x: number, y: number, private _width: number) {
        super(x, y);
    }
    get width() {
        return this._width;
    }
    draw() {
        console.log("--------Square-----------");
        super.draw();
        console.log(`width: ${this._width}`)
        console.log("-".repeat(20))
      
    }
}
class Rectangle extends Square {
    constructor(x: number, y: number, width: number, private _height: number) {
        super(x, y, width);
    }
    draw() {
        console.log("==========Rectangle=================")
        super.draw();
        console.log(`height: ${this._height}`);
        console.log("=".repeat(20))
    }
}



//===========================HW33=========================
class Canvas implements Shape {
    private _shapes: Shape[] = []
    draw(): void {
        console.log("-----canvas-----")
        this._shapes.forEach(s=>s.draw());
    }
    addShape(shape: Shape): number {
        this._shapes.push(shape)
        return this._shapes.indexOf(shape);
    }
    removeShape(index: number): Shape {
        return this._shapes.splice(index, 1)[0];
    }
    sort(): void {
        this._shapes.sort((a, b)=>(a.x-b.x)||(a.y-b.y));
    }
    removeIf(predicate: (shape: Shape)=>boolean) {
        this._shapes.forEach((s,i)=> predicate(s)&&this.removeShape(i))
    }
    
}
const canvas = new Canvas();
const add1 = canvas.addShape(new Square(10, 15, 20));
const add2 = canvas.addShape(new Point(8, 7));
const add3 = canvas.addShape(new Rectangle(10, 12, 12, 15));
canvas.addShape(new Line(15,6, new Point(20,2)));
canvas.addShape(new Line(4,8, new Point(10,2)));
canvas.addShape(new Line(7,1, new Point(6,6)));
canvas.addShape(new Line(5,10, new Point(2,5)));
console.log(add1, add3, add2);
canvas.sort();
canvas.draw();
const remove = canvas.removeShape(1);
console.log(remove);
canvas.removeIf((p)=>(p instanceof Line)&&(p.x>p.point.x));
canvas.draw();



