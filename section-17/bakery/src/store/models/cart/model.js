export const cart = {
  state: {
    products: []
  },
  reducers: {
    addProduct(state, payload) {
      return {
        ...state,
        products: [...state.products, payload]
      };
    },

    updateProduct(state, payload) {
      return {
        ...state,
        products: state.products.map(product => {
          if (product._id === payload._id) {
            return payload;
          }

          return product;
        })
      }
    }
  },
  effects: dispatch => ({
    //
  }),
}