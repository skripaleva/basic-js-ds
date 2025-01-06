const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.top = null;
  }

  root() {
    return this.top;
  }

  add(data) {
    this.top = addNode(this.top, data);

    function addNode(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return data;
      }

      if (data < node.data) {
        node.left = addNode(node.left, data);
      } else {
        node.right = addNode(node.right, data);
      }

      return node;
    }
  }

  has(data) {
    return searchNode(this.top, data);

    function searchNode(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      return data < node.data ?
          searchNode(node.left, data) :
          searchNode(node.right, data);
    }
  }

  find(data) {
    if(!this.top) {
      return null;
    }

    let current = this.top;
    let res = false;
    while(current && !res){
      if(data < current.data){
        current = current.left;
      } else if(data > current.data){
        current = current.right;
      } else {
        res = current;
      }
    }
    return res || null;
  }

  remove(data) {
    this.top = removeNode(this.top, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.top) {
      return;
    }

    let node = this.top;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.top) {
      return;
    }

    let node = this.top;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
