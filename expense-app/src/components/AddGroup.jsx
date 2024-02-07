import React, { useState } from 'react'
import Select from 'react-select';


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
            <div>
                <label htmlFor="groupName">Group Name: </label>
                <input
                    type="text"
                    name="groupName"
                    onChange={inputsHandler}
                    placeholder="Group Name"
                    value={inputField.groupName} />

            </div>
            <div>
                <label htmlFor="members">Members: </label>
                <Select
                    isMulti
                    name="members"
                    options={membersList}
                    onChange={(event) => handleChange(event)}
                />
            </div>
            <div>
                <p>Add New Member</p>

                {
                    newMembers.map((e, i) => (
                        <div key={i}>
                            <input type="text" placeholder='name' value={userName} onChange={(e) => setUserName(e.target.value)} />
                            <input type="text" placeholder='email' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            <button onClick={() => removeNewMember(i)}>Delete</button>
                        </div>
                    ))
                }
            </div>
            <button onClick={addNewMember}>Add </button>
            <div>
                <button onClick={submitButton}>Submit Now</button>

            </div>
        </div >
    )
}

export default AddGroup
