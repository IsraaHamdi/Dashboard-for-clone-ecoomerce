import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from '../../firebase';
import { useDispatch} from 'react-redux';
import { updateProduct } from "../../Redux/Reducer/apiCalls";

const ProductContainer = styled.div`
  flex: 4;
  padding: 20px;
`;
const ProductTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProductTitle = styled.h1``;
const ProductAddButton = styled.button`
  width: 80px;
  border: none;
  padding: 5px;
  background-color: teal;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
`;
const ProductTop = styled.div`
  display: flex;
`;
const ProductTopLeft = styled.div`
  flex: 1;
`;
const ProductTopRight = styled.div`
  flex: 1;
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const ProductInfoTop = styled.div`
  display: flex;
  align-items: center;
`;
const ProductInfoImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;
const ProductName = styled.span`
  font-weight: 600;
`;
const ProductInfoBottom = styled.div`
  margin-top: 10px;
`;
const ProductInfoItem = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-between;
`;
const ProductInfoKey = styled.span``;
const ProductInfoValue = styled.span`
  font-weight: 300;
`;
const ProductBottom = styled.div`
  padding: 20px;
  margin: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const ProductForm = styled.form`
  display: flex;
  justify-content: space-between;
`;
const ProductFormLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputLeft = styled.input`
  margin-bottom: 10px;
  border: none;
  padding: 5px;
  border-bottom: 1px solid gray;
`;
const LabelLeft = styled.label`
  margin-bottom: 10px;
  color: gray;
`;
const Input = styled.input``;
const Label = styled.label``;
const Select = styled.select`
  margin-bottom: 10px;
`;
const Option = styled.option``;
const ProductFormRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductUpload = styled.div`
  display: flex;
  align-items: center;
`;
const ProductUploadImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;
const ProductButton = styled.button`
  border: none;
  padding: 5px;
  border-radius: 5px;
  background-color: darkblue;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

function Product() {
  const { productId } = useParams();
  const [pStatus,setPStatus] = useState([]);
  const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
  const product = useSelector((state) =>
  state.product.products.find((product) => product._id === productId)
);

const MONTHS = useMemo(
  () => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  []
);
useEffect(() => {
  const cancelTokenSource = axios.CancelToken.source();
  axios
    .get(`/api/v1/order/income?pid=${productId}`, {
      cancelToken: cancelTokenSource.token,
      headers: { token: `Bearer ${TOKEN}` },
    })
    .then(({ data }) => {
      const list = data.sort((a,b)=> { return a._id - b._id })
      list.map((item) => 
       setPStatus((prev)=>[
        {name : MONTHS[item._id - 1], Sales: item.total}
       ])
      )
    })
    .catch((error) => {
      console.log(error, "erge");
    });

  return () => cancelTokenSource.cancel();
}, [productId, MONTHS,TOKEN]);

const [inputs, setInputs] = useState(product);
const [file, setFile] = useState(null);
const [image, setImage]= useState(product.img)
const dispatch = useDispatch();
const handleChange = (e) => {
  setInputs((prev) => {
    return { ...prev, [e.target.name]: e.target.value };
  });
};
const handleImage = () => {
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if(downloadURL) {
            console.log(downloadURL)
            setImage(downloadURL)
            console.log(image,'after update')
          }
        });
      }
    )
}
console.log(image,'before')
const updatedProduct = async(e) => {
  e.preventDefault();
  await handleImage();
  console.log(image,'from update')
  updateProduct(productId,{ ...inputs, img: image  },dispatch)
};
  return (
    <ProductContainer>
      <ProductTitleContainer>
        <ProductTitle>Product</ProductTitle>
        <Link to="/newProduct">
          <ProductAddButton>Create</ProductAddButton>
        </Link>
      </ProductTitleContainer>
      <ProductTop>
        <ProductTopLeft>
          <Chart data={pStatus} dataKey="Sales" title="Sales Performance" />
        </ProductTopLeft>
        <ProductTopRight>
          <ProductInfoTop>
            <ProductInfoImg
              src={product.img}
              alt={product.title}
            />
            <ProductName>{product.title}</ProductName>
          </ProductInfoTop>
          <ProductInfoBottom>
            <ProductInfoItem>
              <ProductInfoKey>id:</ProductInfoKey>
              <ProductInfoValue>{product._id}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>sales:</ProductInfoKey>
              <ProductInfoValue>5123</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>price:</ProductInfoKey>
              <ProductInfoValue>${product.price}</ProductInfoValue>
            </ProductInfoItem>
            <ProductInfoItem>
              <ProductInfoKey>in stock:</ProductInfoKey>
              <ProductInfoValue>{product.inStock? "true": "false"}</ProductInfoValue>
            </ProductInfoItem>
          </ProductInfoBottom>
        </ProductTopRight>
      </ProductTop>
      <ProductBottom>
        <ProductForm>
          <ProductFormLeft>
            <LabelLeft>Product Name</LabelLeft>
            <InputLeft type="text" name="title" defaultValue={product.title} onChange={handleChange} />
            <LabelLeft>Product Description</LabelLeft>
            <InputLeft type="text" name="desc" defaultValue={product.desc} onChange={handleChange} />
            <LabelLeft>Price</LabelLeft>
            <InputLeft type="number" name="price" defaultValue={product.price} onChange={handleChange} />
            <LabelLeft>In Stock</LabelLeft>
            <Select name="inStock" id="idStock" defaultValue={product.inStock} onChange={handleChange}>
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </ProductFormLeft>
          <ProductFormRight>
            <ProductUpload>
              <ProductUploadImg
                src={product.img}
                alt={product.title}
              />
              <Label htmlFor="file">
                <Publish />
              </Label>
              <Input type="file" id="file" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])} />
            </ProductUpload>
            <ProductButton onClick={updatedProduct}>Update</ProductButton>
          </ProductFormRight>
        </ProductForm>
      </ProductBottom>
    </ProductContainer>
  );
}

export default Product;
