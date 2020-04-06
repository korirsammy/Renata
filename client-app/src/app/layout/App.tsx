import React, {  Fragment, useContext, useEffect } from "react";
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
import LoginForm from "../../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import PhonesDashboard from "../../features/Phones/PhonesDashboard";
import PhonesTable from "../../features/Phones/phonesTable";




const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded())
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token])

  if (!appLoaded)  return <LoadingComponent content='Loading app...' />
 
    return (

      <Fragment>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
              <Route exact path='/phones' component={PhonesDashboard} />
                <Route exact path='/products' component={ProductsDashboard} />
                <Route path='/products/:id' component={ProductDetails} />
                <Route
                  key={location.key}
                  path={['/createProduct', '/manage/:id']}
                  component={ProductForm}
                />
                 <Route path='/login' component={LoginForm} />
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
