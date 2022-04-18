import { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Model from "./model";
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom'
import Page from './page';

function FirstPage({ login, setLogin }) {

    return <div>
        <Router>
            {/* <Link to={'/'}>Insert</Link>
            <Link to={'/login'}>Login</Link>
            <Link to={'/signup'}>Signup</Link> */}
            <Routes>
                <Route exact path="/" element={<h1>This is HomePage !!</h1>}></Route>
                <Route exact path='/insert'
                    element={<Model type={'Add a Client'} />} >
                </Route>
                <Route exact path='/login'
                    element={login ? <Navigate to='/show' /> : <Login setLogin={setLogin} />}>
                </Route>
                <Route exact path='/signup'
                    element={<Signup />}>
                </Route>
                <Route exact path='/show' element={login ? <Page setLogin={setLogin} /> : <Navigate to='/login' />}></Route>
            </Routes>
        </Router>
    </div>
}

function Login({ setLogin }) {
    const [show, setShow] = useState(false);
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = async () => {
        let postData = {
            email: mail,
            password: pass
        }
        // console.log(postData);
        await axios.post('http://localhost:5000/user/login', postData)
            .then((res) => {
                console.log('login', res);
                localStorage.setItem('logged', res.data);
                // alert('Login Successful');
                setLogin('true');
            });
    }
    function cancle() {
        setMail('');
        setPass('')
        setShow(false)
    }
    const handleShow = () => setShow(true);

    return <>
        <Model type='Add a Client' />
        <Button color="success" onClick={handleShow}>Login</Button>
        <Modal isOpen={show} toggle={cancle} >
            <ModalHeader toggle={cancle}>Login form</ModalHeader>
            <ModalBody>
                <label>E-mail Id :</label>
                <input
                    type='email'
                    onChange={e => setMail(e.target.value)}
                    value={mail}
                    placeholder='E-mail Id'
                    required={true}
                ></input>
                <br />

                <label>Password</label>
                <input
                    type='password'
                    onChange={e => setPass(e.target.value)}
                    value={pass}
                    placeholder='Password'
                    required={true}
                ></input>
            </ModalBody>
            <ModalFooter>
                <Button color="warning" onClick={handleLogin}>Save</Button>
                <Button color="danger" onClick={cancle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </>
}

function Signup() {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [pass, setPass] = useState('');
    const handleSignup = () => {
        alert('Currently unavailable');
    }
    function cancle() {
        setName('');
        setMail('');
        setPass('')
        setShow(false)
    }
    const handleShow = () => setShow(true);

    return <>
        <Button color="secondary" onClick={handleShow}>Signup</Button>
        <Modal isOpen={show} toggle={cancle} >
            <ModalHeader toggle={cancle}>Sign form Currently unavailable</ModalHeader>
            {/* <ModalBody>
                <label>Name : </label>
                <input
                    type='text'
                    onChange={e => setName(e.target.value)}
                    value={name}
                    placeholder='Userame'
                    required={true}
                ></input>
                <br />

                <label>E-mail Id :</label>
                <input
                    type='email'
                    onChange={e => setMail(e.target.value)}
                    value={mail}
                    placeholder='E-mail Id'
                    required={true}
                ></input>
                <br />

                <label>Password :</label>
                <input
                    type='password'
                    onChange={e => setPass(e.target.value)}
                    value={pass}
                    placeholder='Password'
                    required={true}
                ></input>

            </ModalBody> */}
            {/* <ModalFooter>
                <Button color="warning" onClick={handleSignup}>Send</Button>
                <Button color="danger" onClick={cancle}>Cancel</Button>
            </ModalFooter> */}
        </Modal>
    </>
}

export default FirstPage;