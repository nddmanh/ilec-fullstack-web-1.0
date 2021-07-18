import { init } from '@rematch/core'
import { cart } from './models/cart/model';

const store = init({
  models: {
    cart
  }
});

export default store