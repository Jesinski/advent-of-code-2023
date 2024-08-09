type Node = [number, number, number, number, number, number];
export class MinHeap {
  heap: Array<Node>;
  elements: number;

  constructor() {
    this.heap = [];
    this.elements = 0;
  }

  insert(value: Node) {
    if (this.elements >= this.heap.length) {
      this.elements = this.elements + 1;
      this.heap.push(value);
      this._percolateUp(this.heap.length - 1);
    } else {
      this.heap[this.elements] = value;
      this.elements = this.elements + 1;
      this._percolateUp(this.elements - 1);
    }
  }

  getMin() {
    if (this.heap.length != 0) {
      return this.heap[0];
    } else {
      return null;
    }
  }

  removeMin() {
    const min = this.heap[0];
    if (this.elements > 1) {
      this.heap[0] = this.heap[this.elements - 1];
      this.elements = this.elements - 1;
      this._minHeapify(0);
      return min;
    } else if (this.elements == 1) {
      this.elements = this.elements - 1;
      return min;
    } else {
      return null;
    }
  }

  private _percolateUp(index: number) {
    const parent = Math.floor((index - 1) / 2);
    if (index <= 0) {
      return;
    } else if (this.heap[parent][2] > this.heap[index][2]) {
      const tmp = this.heap[parent];
      this.heap[parent] = this.heap[index];
      this.heap[index] = tmp;
      this._percolateUp(parent);
    }
  }

  private _minHeapify(index: number) {
    const left = index * 2 + 1;
    const right = index * 2 + 2;

    let smallest = index;
    if (this.elements > left && this.heap[smallest][2] > this.heap[left][2]) {
      smallest = left;
    }
    if (this.elements > right && this.heap[smallest][2] > this.heap[right][2]) {
      smallest = right;
    }
    if (smallest != index) {
      const tmp = this.heap[smallest];
      this.heap[smallest] = this.heap[index];
      this.heap[index] = tmp;
      this._minHeapify(smallest);
    }
  }
}
