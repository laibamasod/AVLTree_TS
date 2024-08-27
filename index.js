var node = /** @class */ (function () {
    function node(num, left, right) {
        this.value = num;
        this.left = left || null;
        this.right = right || null;
        this.height = 1; // first node as height 1
    }
    node.prototype.getNum = function () {
        return this.value;
    };
    node.prototype.setNum = function (value) {
        this.value = value;
    };
    node.prototype.getHeight = function () {
        return this.height;
    };
    node.prototype.setHeight = function (height) {
        this.height = height;
    };
    return node;
}());
var AVL = /** @class */ (function () {
    function AVL() {
        this.root = null;
        this.size = 0;
    }
    AVL.prototype.getSize = function () {
        return this.size;
    };
    AVL.prototype.insert = function (val) {
        this.root = this.insertNode(this.root, val);
    };
    AVL.prototype.insertNode = function (n, v) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        // first root node
        if (n === null) {
            n = new node(v);
            this.size++;
            return n;
        }
        // leaves
        else {
            if (v < n.getNum()) {
                n.left = this.insertNode(n.left, v);
            }
            else if (v > n.getNum()) {
                n.right = this.insertNode(n.right, v);
            }
            else {
                // do nothing
                return n;
            }
            var leftHeight = n.left ? n.left.getHeight() : 0;
            var rightHeight = n.right ? n.right.getHeight() : 0;
            n.setHeight(1 + Math.max(leftHeight, rightHeight));
            // update height of current node based on new insertions on its left/right
            var bf = this.getBalanceFactor(n);
            // if unbalanced, perform rotations 
            // Left Left
            if (bf > 1 && v < ((_b = (_a = n.left) === null || _a === void 0 ? void 0 : _a.getNum()) !== null && _b !== void 0 ? _b : 0)) {
                return this.clockRotate(n);
            }
            // Right Right
            if (bf < -1 && v > ((_d = (_c = n.right) === null || _c === void 0 ? void 0 : _c.getNum()) !== null && _d !== void 0 ? _d : 0)) {
                return this.anticlockRotate(n);
            }
            // Left Right
            if (bf > 1 && v > ((_f = (_e = n.left) === null || _e === void 0 ? void 0 : _e.getNum()) !== null && _f !== void 0 ? _f : 0)) {
                if (n.left !== null) {
                    n.left = this.anticlockRotate(n.left);
                }
                return this.clockRotate(n);
            }
            // Right Left
            if (bf < -1 && v < ((_h = (_g = n.right) === null || _g === void 0 ? void 0 : _g.getNum()) !== null && _h !== void 0 ? _h : 0)) {
                if (n.right !== null) {
                    n.right = this.clockRotate(n.right);
                }
                return this.anticlockRotate(n);
            }
            return n;
        }
    };
    AVL.prototype.clockRotate = function (y) {
        var _a, _b, _c, _d;
        var x = y.left; // shouldnt be null
        var T2 = x.right;
        // Perform rotation
        x.right = y;
        y.left = T2;
        // Update heights
        y.setHeight(Math.max((_a = y.left) === null || _a === void 0 ? void 0 : _a.getHeight(), (_b = y.right) === null || _b === void 0 ? void 0 : _b.getHeight()) + 1);
        x.setHeight(Math.max((_c = x.left) === null || _c === void 0 ? void 0 : _c.getHeight(), (_d = x.right) === null || _d === void 0 ? void 0 : _d.getHeight()) + 1);
        // Return new root
        return x;
    };
    AVL.prototype.anticlockRotate = function (x) {
        var _a, _b, _c, _d;
        var y = x.right;
        var T2 = y.left;
        // Perform rotation
        y.left = x;
        x.right = T2;
        // Update heights
        x.setHeight(Math.max((_a = x.left) === null || _a === void 0 ? void 0 : _a.getHeight(), (_b = x.right) === null || _b === void 0 ? void 0 : _b.getHeight()) + 1);
        y.setHeight(Math.max((_c = y.left) === null || _c === void 0 ? void 0 : _c.getHeight(), (_d = y.right) === null || _d === void 0 ? void 0 : _d.getHeight()) + 1);
        // Return new root
        return y;
    };
    AVL.prototype.getBalanceFactor = function (n) {
        if (n === null) {
            return 0;
        }
        var leftHeight = n.left ? n.left.getHeight() : 0;
        var rightHeight = n.right ? n.right.getHeight() : 0;
        return leftHeight - rightHeight;
    };
    AVL.prototype.print = function () {
        console.log(this.inOrder(this.root).trim());
    };
    AVL.prototype.inOrder = function (r) {
        var inOrder = "";
        if (r !== null) {
            inOrder += this.inOrder(r.left);
            inOrder += r.getNum() + " ";
            inOrder += this.inOrder(r.right);
        }
        return inOrder;
    };
    AVL.prototype.getRoot = function () {
        var _a;
        return (_a = this.root) === null || _a === void 0 ? void 0 : _a.getNum();
    };
    return AVL;
}());
var tree = new AVL();
//tree.insert(12);
tree.insert(9);
//tree.insert(14);
tree.insert(8);
//tree.insert(22);
tree.insert(7);
tree.insert(5);
tree.insert(3);
tree.print();
console.log("Root of tree: ", tree.getRoot());
console.log("Size of tree: ", tree.getSize());
// const Left= new node(12);
// const Right = new node(14);
// const Node2 = new node(13, Left, Right);
// console.log(Node2.getNum());
// console.log(Node2.left);
// console.log(Node2.right);
