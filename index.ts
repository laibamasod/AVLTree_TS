class node {
  private value: number;
  public left: node | null;
  public right: node | null;
  private height: number;

  public constructor(num: number, left?: node, right?: node) {
    this.value = num;
    this.left = left || null;
    this.right = right || null;
    this.height = 1; // first node as height 1
  }

  public getNum(): number {
    return this.value
  }
  public setNum(value: number) {
    this.value = value;
  }
  public getHeight(): number {
    return this.height;
  }
  public setHeight(height: number) {
    this.height = height;
  }

}

class AVL {
  private root: node | null;
  private size: number;

  public constructor() {
    this.root = null;
    this.size = 0;
  }
  public getSize(): number{
    return this.size;
  }
  public insert(val: number): void {
    this.root = this.insertNode(this.root, val);
  }

  private insertNode(n: node | null, v: number): node {
    // first root node
    if (n === null) {
      n = new node(v);
      this.size++;
      return n;
    }
    // leaves
    else {
      if (v < n.getNum()) {
        n.left= this.insertNode(n.left, v);
      }
      else if (v > n.getNum()) {
       n.right = this.insertNode(n.right, v);
      }
      else {
        // do nothing
        return n;
      }

      const leftHeight = n.left ? n.left.getHeight() : 0;
      const rightHeight = n.right ? n.right.getHeight() : 0
      n.setHeight(1 + Math.max(leftHeight, rightHeight))
      // update height of current node based on new insertions on its left/right

      const bf = this.getBalanceFactor(n);

      // if unbalanced, perform rotations 

      // Left Left
      if (bf > 1 && v < (n.left?.getNum() ?? 0)) {
        return this.clockRotate(n)
      }

      // Right Right
      if (bf < -1 && v > (n.right?.getNum() ?? 0)) {
        return this.anticlockRotate(n)
      }

      // Left Right
      if (bf > 1 && v > (n.left?.getNum() ?? 0)) {
        if (n.left !== null) {
          n.left = this.anticlockRotate(n.left);
        }
        return this.clockRotate(n)
      }

      // Right Left
      if (bf < -1 && v < (n.right?.getNum() ?? 0)) {
        if (n.right !== null) {
          n.right = this.clockRotate(n.right);
        }
        return this.anticlockRotate(n)
      }
      return n;

    }

  }
  private clockRotate(y: node): node {
    const x = y.left; // shouldnt be null
    const T2 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T2;

    // Update heights
    y.setHeight(Math.max(y.left?.getHeight() , y.right?.getHeight() ) + 1);
    x.setHeight(Math.max(x.left?.getHeight() , x.right?.getHeight() ) + 1);

    // Return new root
    return x;
  }

  private anticlockRotate(x: node): node {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights
    x.setHeight(Math.max(x.left?.getHeight() , x.right?.getHeight()) + 1);
    y.setHeight(Math.max(y.left?.getHeight() , y.right?.getHeight() ) + 1);

    // Return new root
    return y;
  }
  private getBalanceFactor(n: node): number {
    if (n === null) {
      return 0;
    }
    const leftHeight = n.left ? n.left.getHeight() : 0;
    const rightHeight = n.right ? n.right.getHeight() : 0;
    return leftHeight - rightHeight;

  }
  public print(): void {
    console.log(this.inOrder(this.root).trim());
  }

  private inOrder(r: node | null): string {
    let inOrder: string = "";
    if (r !== null) {
      inOrder += this.inOrder(r.left);
      inOrder += r.getNum() + " ";
      inOrder += this.inOrder(r.right);
    }
    return inOrder;
  }
  public getRoot(){
    return this.root?.getNum();
  }
}
const tree = new AVL();
//tree.insert(12);
tree.insert(9);
tree.insert(14);
tree.insert(8);
//tree.insert(22);
tree.insert(7);
tree.insert(5);
tree.insert(3);
tree.print();
console.log("Root of tree: ",tree.getRoot());
console.log("Size of tree: ",tree.getSize());
// const Left= new node(12);
// const Right = new node(14);
// const Node2 = new node(13, Left, Right);

// console.log(Node2.getNum());
// console.log(Node2.left);
// console.log(Node2.right);

