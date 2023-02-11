import { Fragment } from 'react';
import{ useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
let isInitial=true;
function App() {
  const showCart=useSelector(state=>state.ui.cartIsVisible);
  const cart=useSelector(state=>state.cart);
  const notification=useSelector(state=>state.ui.notification);
  const dispatch=useDispatch();
  useEffect(()=>{
    const sentCartData=async ()=>{
      dispatch(uiActions.showNotification({
        status:'pending',
        title:'Sending...',
        message:'Sending cart data'
      }));
      const response = await fetch('https://react-http-practice-a4548-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
      if(!response.ok){
        throw new Error('Sending cart data failed');
      }
      dispatch(uiActions.showNotification({
        status: 'success',
        title: 'Sucess!',
        message: 'Sent cart data successfully'
      }));
    }
    if(isInitial){
      isInitial=false;
      return;
    }
    sentCartData().catch(error=>{
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error',
        message: 'Sending cart data failed!'
      }));
    });
  },[cart,dispatch]);

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>

  );
}

export default App;
