import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Model({ type, name1 = "", cnum = "", id = 0, change, setChange }) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(name1 ? name1 : "");
    const [ph, setPh] = useState(cnum ? cnum : "");

    const handleClose = async () => {
        if (!name) {
            alert("Enter a Name !!")
        } else if (!ph) {
            alert("Enter a Contact Number")
        }
        else {
            let postData = {
                name: name,
                cnum: ph
            };
            if (!id) {
                await axios.post('http://localhost:5000/insert', { postData })
                    .then((res) => change != undefined ? setChange(!change) : setShow(false));
            }
            else {
                let putData = {
                    name: name,
                    cnum: ph,
                    id: id
                };
                await axios.put('http://localhost:5000/update', { putData })
                    .then((res) => setChange(!change));
            }
            setShow(false)
        }
    };
    function cancle() {
        setName(name1);
        setPh(cnum)
        setShow(false)
    }
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button color="warning" onClick={handleShow}>{type}</Button>
            <Modal isOpen={show} toggle={cancle} >
                <ModalHeader toggle={cancle}>{type}</ModalHeader>
                <ModalBody>
                    <label>Name = </label>
                    <input onChange={e => setName(e.target.value)} value={name} ></input>
                    <br /><label>Contact Number = </label>
                    <input onChange={e => setPh(e.target.value)} value={ph} ></input>
                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={handleClose}>Save</Button>{' '}
                    <Button color="danger" onClick={cancle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Model;
