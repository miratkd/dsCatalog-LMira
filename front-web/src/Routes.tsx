import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from 'core/components/navbar';
import Admin from 'pages/Admin';
import Catalog from 'pages/Catalog';
import ProductsDetails from 'pages/Catalog/components/productsDetails';
import Home from 'pages/Home';
import Auth from 'pages/Auth';
import history from './core/utils/history'; 

const Routes = () => (

    <Router history={history}>
    <Navbar/>
        <Switch>
            <Route path ="/" exact>
                <Home/>
            </Route>

            <Route path ="/products" exact>
                <Catalog/>
            </Route>

            <Route path ="/products/:productId">
                <ProductsDetails/>
            </Route>
            <Redirect from="/auth" to="/auth/login" exact/>
            <Route path="/auth">
                <Auth/>
            </Route>
            <Redirect from="/admin" to="/admin/products" exact/>
            <Route path ="/admin">    
                <Admin/>
            </Route>
        </Switch>
    </Router>
);

export default Routes;