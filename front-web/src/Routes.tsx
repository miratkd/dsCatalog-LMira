import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from 'core/components/navbar';
import Admin from 'pages/Admin';
import Catalog from 'pages/Catalog';
import ProductsDetails from 'pages/Catalog/components/productsDetails';
import Home from 'pages/Home';

const Routes = () => (

    <BrowserRouter>
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

            <Route path ="/admin">
                <Admin/>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;