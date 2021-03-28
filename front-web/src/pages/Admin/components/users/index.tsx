import { Route, Switch } from "react-router";
import Form from "./components/Form";
import List from "./components/List";

const Users = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/users" exact>
                    <List/>
                </Route>
                <Route path="/admin/users/:usersId">
                    <Form/>
                </Route>
            </Switch>
        </div>
    )
}
export default Users;