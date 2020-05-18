export default {
  addCart(context,payload){
    //判断商品有没有在购物车内
    let OldProduct = context.state.cartList.find(value => value.id === payload.id)

    if(OldProduct){
      context.commit('addCount',OldProduct)
    } else {
      payload.count = 1
      context.commit('addToCart',payload)
    }
  }
}