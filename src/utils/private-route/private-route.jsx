/* import React, {useLayoutEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';
import SideMenuPrivate from '../../components/side-menu/side-menu-private';
import Header from '../../components/header/header';
import { useHistory } from 'react-router-dom';

function PrivateRoute({ component: Component, user, ...restOfProps }) {
    
    const history = useHistory();

    const[currentPage, setCurrentPage] = useState(history.location.pathname);


    useLayoutEffect(() => {
        setCurrentPage(history.location.pathname)
    }, [history.location.pathname])

    return (
    <React.Fragment>
        <Header/>
        <SideMenuPrivate currentPage={currentPage}/>
        <Route
            {...restOfProps}
            render={(restOfProps) =>
                user?.loggedIn ? <Component {...restOfProps} /> : <Redirect to="/login" />
            }
        />
    </React.Fragment>
    );
}

export default PrivateRoute; */