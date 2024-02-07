import React, { useState } from 'react'
import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const AddGroup = () => {

    const [inputField, setInputField] = useState({
        groupName: "",
        members: []
    });

    const [selectedMembers, setSelectedMembers] = useState();

    const [newMembers, setNewMembers] = useState([{ name: 'lorem', email: '' }]);

    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();

    const [membersList, setMemberList] = useState([
        { value: "mem1", label: "member 1" },
        { value: "mem2", label: "member 2" },
        { value: "mem3", label: "member 3" },
        { value: "mem4", label: "member 4" }
    ]);

    const handleChange = (ev) => {
        console.log(ev)
        setSelectedMembers(ev);
    }

    const removeNewMember = (i) => {
        console.log('removeNewMember', i);
        const updatedNewMembers = [...newMembers];
        updatedNewMembers.splice(i, 1);
        setNewMembers(updatedNewMembers);

    }

    const addNewMember = (event) => {
        // event.preventDefault()
        console.log('addNewMember');
        setMemberList(prev => (
            [
                ...prev,
                { label: userName, value: userEmail }
            ]
        )
        );
        setUserName('');
        setUserEmail('');
    }

    const inputsHandler = (e) => {
        setInputField({ [e.target.name]: e.target.value })
    }


    const submitButton = () => {
        const newGroupData = inputField;

        newGroupData.members = selectedMembers;
        console.log(newGroupData)
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={6} md={6} lg={6} >
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

                    </Col>
                    <div>
                        <button className="btn btn-primary" onClick={submitButton}>Submit Now</button>

                    </div>
                </Row>
            </Container>
        </div >
    )
}

export default AddGroup
