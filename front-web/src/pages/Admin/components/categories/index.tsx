import { Route, Switch } from "react-router";
import Form from "./components/Form";
import List from "./List";

const Categories = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/categories" exact>
                    <List/>
                </Route>
                <Route path="/admin/categories/:productsId">
                     <Form />
                </Route>
            </Switch>
        </div>
    );
}
export default Categories;