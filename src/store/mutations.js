export default {
  addCount(state,payload){
    payload.count +=1
  },
  addToCart(state,payload){
    state.cartList.push(payload)
  }
}