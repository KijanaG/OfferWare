import React, { useContext, useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import FormWrapper from '../../components/Styles/FormWrapper';
import { AuthContext } from '../../context/AuthProvider';
import { Menu, Segment, Button } from 'semantic-ui-react';
import Lottie from 'react-lottie';
import ModalView from './Modal';
import Waiting from '../../assets/Waiting.json';
const defaultOptions = {
    loop: true, autoplay: true, animationData: Waiting,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
}

export default function Verification() {
    let history = useHistory();
    let location = useLocation();
    let params = useParams();
    let match = useRouteMatch();
    // console.log(history, location, params, match)

    //*********IF CLIENT IS ADMIN SHOW DIFFERENT DAHSBOARD */
    const { signOut, client } = useContext(AuthContext)
    const [activeItem, setActiveItem] = useState(null)
    const [modal, setModal] = useState(false)
    const [admin, setAdmin] = useState(client.admin)

    useEffect(() => {
        if (location.pathname.split('/')[2] === 'deals') setActiveItem('All Deals')
        else setActiveItem('Home')
    }, [])
    const handleItemClick = (e, { name }) => {
        if (name == activeItem) return
        if (name === 'All Deals') history.replace('/dashboard/deals')
        else history.replace('/dashboard/home')
        setActiveItem(name)
    }
    const handleModal = e => {
        e.preventDefault()
        setModal(true)
    }

    const Deals = () => (<FormWrapper><h3>List Of Deals</h3></FormWrapper>)
    const Home = () => (<FormWrapper> <h3>{client.name}</h3></FormWrapper>)

    if (admin) {
        return (
            <Segment>
                <Menu color="teal" inverted pointing widths={3}>
                    <Menu.Item active={activeItem === 'Home'} onClick={handleItemClick} name='Home' />
                    <Menu.Item active={activeItem === 'Create Deal'} onClick={handleModal} name='Create Deal' />
                    <Menu.Item active={activeItem === 'All Deals'} onClick={handleItemClick} name='All Deals' />
                </Menu>
                <ModalView modal={modal} setModal={setModal} />
                <Switch>
                    <Route path="/dashboard/home" component={Home} />
                    <Route path="/dashboard/deals" exact component={Deals} />
                    <Redirect to="/dashboard/home" />
                </Switch>
                <Button onClick={signOut}> Log Out </Button>
            </Segment>
        )
    } else {
        return (
            <Segment style={{textAlign:'center'}}>
                <Lottie options={defaultOptions} height={'50vh'} width={'50vh'} />
                <h3 style={{margin:'4vh 1vw'}}>Your Deal Data Will Be Displayed Here Soon...</h3>
                <Button onClick={signOut}> Log Out </Button>
            </Segment>
        )
    }
}
