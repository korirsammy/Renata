import React, {  Fragment } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./../../features/nav/NavBar";
import ProductsDashboard from "../../features/Products/dashboard/ProductsDashboard";
import { observer } from "mobx-react-lite";
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ProductForm from "../../features/Products/form/ProductForm";
import ProductDetails from "../../features/Products/details/ProductDetails";
import { ToastContainer } from "react-toastify";
import NotFound from "./NotFound";


const App: React.FC<RouteComponentProps> = ({ location }) => {
 
    return (

      <Fragment>
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/products' component={ProductsDashboard} />
                <Route path='/products/:id' component={ProductDetails} />
                <Route
                  key={location.key}
                  path={['/createActivity', '/manage/:id']}
                  component={ProductForm}
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>




     
    );
};

export default withRouter(observer(App));
