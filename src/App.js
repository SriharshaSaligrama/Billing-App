import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from './selectors/PrivateRoute'
import { Home } from './components/User/Home'
import { Register } from './components/User/Register'
import { Login } from './components/User/Login'
import { UserAccount } from './components/User/UserAccount'
import { Customers } from './components/Customers/Customers'
import { Products } from './components/Products/Products'
import { Bills } from './components/Bills/Bills'
import { AddCustomer } from './components/Customers/AddCustomer'
import { EditCustomer } from './components/Customers/EditCustomer'
import { AddProduct } from './components/Products/AddProduct'
import { EditProduct } from './components/Products/EditProduct'
import { AddBill } from './components/Bills/AddBill'
import { BillId } from './components/Bills/BillId'
import { CustomerBills } from './components/Customers/CustomerBills'


const App = props=> {
  return (
    <div>
      <Route path='/' exact component={Home} />
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <PrivateRoute path='/account' component={UserAccount} />
      <PrivateRoute path='/customers' component={Customers} />
      <PrivateRoute path='/addCustomer' component={AddCustomer} />
      <PrivateRoute path='/editCustomer/:id' component={EditCustomer} />
      <PrivateRoute path='/customerBills/:id' component={CustomerBills} />
      <PrivateRoute path='/products' component={Products} />
      <PrivateRoute path='/addProduct' component={AddProduct} />
      <PrivateRoute path='/editProduct/:id' component={EditProduct} />
      <PrivateRoute path='/bills' exact component={Bills} />
      <PrivateRoute path='/bills/:id' component={BillId} />
      <PrivateRoute path='/addBill' component={AddBill} />
    </div>
  )
}

export default App
