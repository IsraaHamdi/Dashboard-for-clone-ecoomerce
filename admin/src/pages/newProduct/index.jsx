import React, { useState } from "react";
import { useDispatch} from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../../firebase'
import styled from "styled-components";
import { addProduct } from "../../Redux/Reducer/apiCalls";
import { Redirect, useHistory } from "react-router-dom";

const NewProductContainer = styled.div`
  flex: 4;
  padding: 20px;
`;
const AddProductTitle = styled.h1``;
const AddProductForm = styled.form`
  margin-top: 10px;
`;
const AddProductItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
const Label = styled.label`
  color: gray;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Input = styled.input`
  padding: 10px;
`;
const Select = styled.select`
  padding: 10px;
`;
const Option = styled.option``;
const AddProductButton = styled.button`
  margin-top: 10px;
  padding: 7px 10px;
  border: none;
  border-radius: 10px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

function NewProduct() {
  const history = useHistory();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const addNewProduct = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = { ...inputs, img: downloadURL, categories: cat };
          addProduct(product, dispatch);
          history.push( '/products');
        });
      }
    );
  };
  return (
    <NewProductContainer>
      <AddProductTitle>New Product</AddProductTitle>
      <AddProductForm>
        <AddProductItem>
          <Label>Image</Label>
          <Input type="file" id="file"  onChange={(e) => setFile(e.target.files[0])} />
        </AddProductItem>
        <AddProductItem>
          <Label>Name</Label>
          <Input type="text" name="title" placeholder="Apple Airpods" onChange={handleChange} />
        </AddProductItem>
        <AddProductItem>
          <Label>Description</Label>
          <Input type="text" name="desc" placeholder="Description" onChange={handleChange} />
        </AddProductItem>
        <AddProductItem>
          <Label>Categories</Label>
          <Input type="text" placeholder="Jeans,Skirts, T-shirt " onChange={handleCat} />
        </AddProductItem>
        <AddProductItem>
          <Label>Price</Label>
          <Input type="number" name="price" placeholder="100" onChange={handleChange} />
        </AddProductItem>
        <AddProductItem>
          <Label>Stock</Label>
          <Select name="inStock" id="stock" onChange={handleChange}>
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
        </AddProductItem>
        <AddProductButton onClick={addNewProduct}>Create</AddProductButton>
      </AddProductForm>
    </NewProductContainer>
  );
}

export default NewProduct;
