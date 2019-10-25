import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "../ui/Home"
import AppContainer from "../container/AppContainer";
import CreateEit from "../ui/CreateEit";
import EditEit from "../ui/EditEit";


export default function Routes() {
  return (
    <Router>
     
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/eits/:id/edit" render={({ match }) => <EditEit match={match} />}/>
     
          <Route path="/eits/create">
            <CreateEit />
          </Route>
          <Route exact={true} path="">
            <AppContainer />
          </Route>
        </Switch>
      
    </Router>
  );
}

