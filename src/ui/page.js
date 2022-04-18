import { useEffect, useState } from "react";
import axios from 'axios';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Model from './model';
// import { Route } from "react-router-dom";

function Insert({ setLogin }) {
    const [data, setData] = useState([]);
    const [change, setChange] = useState(false);

    const remove = (id) => {
        axios.delete('http://localhost:5000/delete', {
            data: {
                id: id
            }
        }).then((res) => {
            setChange(!change);
        });
    }
    useEffect(() => {
        axios.get('http://localhost:5000/fetch')
            .then(function (response) {
                console.log(response);
                setData(response.data);
            });
    }, [change]);

    return <div>
    {/* <Model type='Add a Client' change={change} setChange={setChange} /> */ }
    {/* <Model type='Logout'setLogin></Model> */ }
    {/* <Route exact path="/show" element={ */}
        {/* <div> */}
            <Button color="danger" onClick={() => { localStorage.removeItem('logged'); setLogin(false) }}>Logout</Button>
            <Model type='Add a Client' change={change} setChange={setChange} />
         <h1>show data</h1>
            <table className="center">
                <tr>
                    <th>Name</th>
                    <th>C. Number</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                {data ? data.map((itm, indx) => <tr style={{ border: '1px solid black' }} key={indx}>
                    <td> {indx + 1}.  <b>{itm.name}</b></td>
                    <td> {itm.cnum}</td>
                    <td>
                        <Model type='Update' name1={itm.name} cnum={itm.cnum} id={itm._id} change={change} setChange={setChange} />
                    </td>
                    <td>
                        <Button color="danger" onClick={() => remove(itm._id)} >Delete</Button></td>
                </tr>) : "Error"}
            </table>
        {/* </div>}> */}
        {/* /</Route> */}
        </div>
}

// function Model({ type, name1 = "", cnum = "", id = 0, change, setChange }) {
//     const [show, setShow] = useState(false);
//     const [name, setName] = useState(name1 ? name1 : "");
//     const [ph, setPh] = useState(cnum ? cnum : "");

//     const handleClose = async () => {
//         if (!name) {
//             alert("Enter a Name !!")
//         } else if (!ph) {
//             alert("Enter a Contact Number")
//         }
//         else {
//             let postData = {
//                 name: name,
//                 cnum: ph
//             };
//             if (!id) {
//                 await axios.post('http://localhost:5000/insert', { postData })
//                     .then((res) => setChange(!change));
//             }
//             else {
//                 let putData = {
//                     name: name,
//                     cnum: ph,
//                     id: id
//                 };
//                 await axios.put('http://localhost:5000/update', { putData })
//                     .then((res) => setChange(!change));
//             }
//             setShow(false)
//         }
//     };
//     function cancle() {
//         setName(name1);
//         setPh(cnum)
//         setShow(false)
//     }
//     const handleShow = () => setShow(true);

//     return (
//         <div>
//             <Button color="warning" onClick={handleShow}>{type}</Button>
//             <Modal isOpen={show} toggle={cancle} >
//                 <ModalHeader toggle={cancle}>{type}</ModalHeader>
//                 <ModalBody>
//                     <label>Name = </label>
//                     <input onChange={e => setName(e.target.value)} value={name} ></input>
//                     <br /><label>Contact Number = </label>
//                     <input onChange={e => setPh(e.target.value)} value={ph} ></input>
//                 </ModalBody>
//                 <ModalFooter>
//                     <Button color="warning" onClick={handleClose}>Save</Button>{' '}
//                     <Button color="danger" onClick={cancle}>Cancel</Button>
//                 </ModalFooter>
//             </Modal>
//         </div>
//     );
// }

export default Insert;