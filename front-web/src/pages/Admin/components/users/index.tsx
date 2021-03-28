import { Route, Switch } from "react-router";
import List from "./components/List";

const Users = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/users" exact>
                    <List/>
                </Route>
                <Route path="/admin/users/:userId">
                    <h1>form</h1>
                </Route>
            </Switch>
        </div>
    )
}
export default Users;