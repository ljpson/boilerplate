import React, {useState} from 'react';
import {Typography, Button, Form, Input} from 'antd';

const { TextArea } = Input;

const Continents = [
    {key:1, value:"Africa"},
    {key:2, value:"Europe"},
    {key:3, value:"Asia"},
    {key:4, value:"North America"},
    {key:5, value:"South America"},
    {key:6, value:"Africa"},
    {key:7, value:"Africa"},

];
function UploadProductPage() {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(4)


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <h2> 여행 상품 업로드</h2>
            </div>
            <Form>

                {/* DropZone */}
                <br />
                <br />
                <lable>이름</lable>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br />
                <br />
                <lable>설명</lable>
                <TextArea onChange={descriptionChangeHandler}/>
                <br />
                <br />
                <lable>가격($)</lable>
                <Input type="number" onChange={priceChangeHandler} />
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button>
                    확인
                </Button>

            </Form>
        </div>
    );
}

export default UploadProductPage;