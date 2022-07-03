import React from "react";
import styled from "styled-components";

const NewUserContainer = styled.div`
  flex: 4;
  padding: 20px;
`;
const NewUserTitle = styled.h1``;
const NewUserForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const NewUserItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;
const Label = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;
const LabelRadio = styled.label`
  margin: 10px;
  font-size: 18px;
  color: #555;
`;
const Input = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;
const InputRadio = styled.input`
  margin-top: 15px;
`;
const NewUserGender = styled.div``;
const NewUserSelect = styled.select`
  height: 40px;
  border-radius: 5px;
`;
const Option = styled.option``;
const NewUserButton = styled.button`
  width: 200px;
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

function NewUser() {
  return (
    <NewUserContainer>
      <NewUserTitle>New User</NewUserTitle>
      <NewUserForm>
        <NewUserItem>
          <Label>Username</Label>
          <Input type="text" placeholder="john" />
        </NewUserItem>
        <NewUserItem>
          <Label>Full Name</Label>
          <Input type="text" placeholder="John Smith" />
        </NewUserItem>
        <NewUserItem>
          <Label>Email</Label>
          <Input type="email" placeholder="john@gmail.com" />
        </NewUserItem>
        <NewUserItem>
          <Label>Password</Label>
          <Input type="password" placeholder="password" />
        </NewUserItem>
        <NewUserItem>
          <Label>Phone</Label>
          <Input type="text" placeholder="+1 123 456 78" />
        </NewUserItem>
        <NewUserItem>
          <Label>Address</Label>
          <Input type="text" placeholder="New York | USA" />
        </NewUserItem>
        <NewUserItem>
          <Label>Gender</Label>
          <NewUserGender>
            <InputRadio type="radio" name="gender" id="male" value="male" />
            <LabelRadio htmlFor="male">Male</LabelRadio>
            <InputRadio type="radio" name="gender" id="female" value="female" />
            <LabelRadio htmlFor="female">Female</LabelRadio>
            <InputRadio type="radio" name="gender" id="other" value="other" />
            <LabelRadio htmlFor="other">Other</LabelRadio>
          </NewUserGender>
        </NewUserItem>
        <NewUserItem>
          <Label>Active</Label>
          <NewUserSelect name="active" id="active">
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </NewUserSelect>
        </NewUserItem>
        <NewUserButton>Create</NewUserButton>
      </NewUserForm>
    </NewUserContainer>
  );
}

export default NewUser;
