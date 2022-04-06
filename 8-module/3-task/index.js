export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return
    }
    let itemIndex = this.cartItems.findIndex(item => item.product.id === product.id)
    console.log(itemIndex)
    if (itemIndex !== -1) {
      this.cartItems[itemIndex].count++
    } else {
      this.cartItems.push({product, count: 1})
      itemIndex = this.cartItems.length - 1

    }
    this.onProductUpdate(this.cartItems[itemIndex]);
  }

  updateProductCount(productId, amount) {
    let itemIndex = this.cartItems.findIndex(item => item.product.id === productId)
    this.cartItems[itemIndex].count += amount
    if (this.cartItems[itemIndex].count === 0) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId)
    }
    this.onProductUpdate(this.cartItems[itemIndex])
  }

  isEmpty() {
    return this.cartItems.length === 0
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, item) => sum += item.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum += item.count * item.product.price, 0)
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

