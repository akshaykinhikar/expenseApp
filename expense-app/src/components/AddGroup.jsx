import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CONSTANTS from '../constants';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AddGroup = () => {

    const [inputField, setInputField] = useState({
        groupName: "",
        members: []
    });

    let navigate = useNavigate();

    const [selectedMembers, setSelectedMembers] = useState();

    const [newMembers, setNewMembers] = useState([{ name: 'lorem', email: '' }]);

    const [newMemberAdded, setNewMemberAdded] = useState(0)

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [membersList, setMemberList] = useState([]);
    const [groupList, setGroupList] = useState([]);

    const notify = (props) => toast(props);

    useEffect(() => {
        Promise.all([
            fetch(CONSTANTS.GET_MEMBERS, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }),
            fetch(CONSTANTS.GET_GROUP, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
        ]).then(async ([getMemList, getGroupList]) => {
            const memList = await getMemList.json();
            const groupList = await getGroupList.json();
            console.log('memList', memList);
            console.log('groupList', groupList);
            setMemberList(memList);
            setGroupList(groupList)
        })
            .catch(err => {
                console.log('Error', err);
            })
        // fetch(CONSTANTS.GET_MEMBERS, {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' }
        // }).then((res) => {
        //     return res.json();
        // }).then((data) => {
        //     setMemberList(data);
        // })
    }, [newMemberAdded]);

    const handleChange = (ev) => {
        setSelectedMembers(ev);
    }

    const removeNewMember = (i) => {
        const updatedNewMembers = [...newMembers];
        updatedNewMembers.splice(i, 1);
        setNewMembers(updatedNewMembers);

    }



    const addNewMember = (event) => {
        // event.preventDefault()

        try {
            fetch(CONSTANTS.GET_MEMBERS, {
                method: 'post',
                body: JSON.stringify({ name: userName, email: userEmail }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if (res.status === 'error') {
                        notify(res.message);
                    } else if (res.status === 'success') {
                        setNewMemberAdded(newMemberAdded + 1)
                        notify('New Member added');
                        setUserName('');
                        setUserEmail('');
                    }
                })
        } catch (err) {
            console.log(err);
            notify('Something went wrong');
        }

    }

    const inputsHandler = (e) => {
        setInputField({ [e.target.name]: e.target.value })
    }


    const submitButton = () => {
        const newGroupData = inputField;

        newGroupData.members = selectedMembers.map(e => e.value);

        try {
            fetch(CONSTANTS.CREATE_GROUP, {
                method: 'post',
                body: JSON.stringify(newGroupData),
                headers: { 'Content-Type': 'application/json' }
            }).then((res) => {
                return res.json();
            }).then((res) => {
                if (res.status === 'error') {
                    notify(res.message);
                } else if (res.status === 'success') {
                    notify('Group created');
                    setTimeout(() => { navigate(`/`); }, 500);
                }
            })
        } catch (err) {
            console.log(err);
            notify('Something went wrong');
        }
    }

    const deleteGroup = (id) => {
        fetch(CONSTANTS.DELETE_GROUP + `${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            notify('Group deleted');
            console.log(data);
            setGroupList(data.allGroups);
        })
    }

    const deleteMember = (id) => {
        fetch(CONSTANTS.DELETE_MEMBER + `${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            notify('Member deleted');
            console.log(data);
            setMemberList(data.allMembers);
        })
    }

    return (
        <div style={{ 'background-color': 'silver', 'min-height': '100vh' }}>
            <Container>
                <Toaster />
                <Row className="justify-content-md-center pt-4">
                    <Col xs={6} md={6} lg={6} className='back-form-add-exp'>
                        <h3 className='text-center'>Create new group</h3>
                        <div className='my-3'>
                            <label className="" htmlFor="groupName">Group Name: </label>
                            <input
                                className="form-control"
                                type="text"
                                name="groupName"
                                onChange={inputsHandler}
                                placeholder="Group Name"
                                value={inputField.groupName} />

                        </div>
                        <div className='my-3'>
                            <label htmlFor="members">Members: </label>
                            <Select
                                isMulti
                                name="members"
                                options={membersList}
                                onChange={(event) => handleChange(event)}
                            />
                        </div>
                        <div className='my-3'>
                            <h6>Add New Member</h6>

                            <Row>
                                <Col xs={10} md={10} lg={10}>
                                    {
                                        newMembers.map((e, i) => (
                                            <div key={i}>
                                                <Row>
                                                    <Col xs={6} md={6} lg={6}>
                                                        <input className="form-control" type="text" placeholder='name' value={userName} onChange={(e) => setUserName(e.target.value)} />
                                                    </Col>
                                                    <Col xs={6} md={6} lg={6}>
                                                        <input className="form-control" type="text" placeholder='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                                                    </Col>
                                                </Row>
                                                {/* <button onClick={() => removeNewMember(i)}>Delete</button> */}
                                            </div>
                                        ))
                                    }
                                </Col>
                                <Col xs={2} md={2} lg={2}>
                                    <button className="btn btn-primary" onClick={addNewMember}>Add </button>

                                </Col>
                            </Row>
                        </div>

                        <div>
                            <button className="btn btn-primary" onClick={submitButton}>Create Group</button>
                        </div>
                    </Col>
                </Row>

                <h4 className='my-3'>Group List</h4>

                {groupList.length > 0 ? groupList.map((group, i) => (
                    <Row key={i}>
                        <Col xs={4} md={4} lg={4} >
                            <p>{group.label}</p>
                        </Col>
                        <Col xs={1} md={1} lg={1} >
                            <FontAwesomeIcon onClick={() => deleteGroup(group._id)} icon={faTrash} />
                        </Col>
                    </Row>

                ))
                    : <p>Please add group</p>}

                <h4 className='my-3'>Members List</h4>

                {membersList.length > 0 ? membersList.map((member, i) => (
                    <Row key={i}>
                        <Col xs={4} md={4} lg={4} >
                            <p>{member.label}</p>
                        </Col>
                        <Col xs={1} md={1} lg={1} >
                            <FontAwesomeIcon onClick={() => deleteMember(member._id)} icon={faTrash} />
                        </Col>
                    </Row>

                ))
                    : <p>Please add group</p>}
            </Container>
        </div >
    )
}

export default AddGroup
