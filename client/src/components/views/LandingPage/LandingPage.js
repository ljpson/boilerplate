import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta'
import ImageSlider from "../../utils/ImageSlider";
import Checkbox from "./Sections/CheckBox";
import Radiobox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import { continents, price } from './Sections/Datas';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] =  useState("")
    // 화면 시작할 때 목록 출력
    useEffect(() =>{

        let body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body);
    },[])
    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore){
                        setProducts([...Products, ...response.data.productInfo])
                    } else{
                        setProducts((response.data.productInfo))
                    }
                    setPostSize(response.data.postSize)
                    console.log(Limit + ":" + PostSize)
                } else {
                    alert("상품을 가져오는 데 실패함")
                }
            })
    }

    // 더보기 버튼을 눌렀을 때 목록 출력
    const loadMoreHandler = () => {
        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore:true
        }
        getProducts(body);
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) =>{
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
            >
                <Meta
                    title={product.title}
                    description={`${product.price}원`}
                />
            </Card>
        </Col>
    })
    const showFilteredResults = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for (let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array;
            }
        }
        return array;
    }
    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        console.log('filters', filters)

        if(category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        setFilters(newFilters)
        showFilteredResults(newFilters)
    }
    // 검색어 입력해서 상품목록 출력
    const updateSearchTerm = (newSearchTerm) =>{
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }

    return (
        <div style={{width:'75%',margin:'3rem auto'}}>
            <div style={{textAlign:'center'}}>
                <h2>Let's Travel Anywhere<Icon type={"rocket"} /></h2>
            </div>
            {/*Filter*/}
            <Row gutter={[16,16]}>
                <Col lg={12} xs={24}>
                    {/* CheckBox */}
                    <Checkbox list={continents} handleFilters={filters => handleFilters(filters,"continents")}/>
                </Col>
                <Col lg={12} xs={24}>
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters,"price")} />
                </Col>
            </Row>
            {/*Search*/}
            <div style={{ display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
                <SearchFeature
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/*Cards*/}

            <Row gutter={[16,16]}>
                {renderCards}
            </Row>
            <br />
            <div>{PostSize} : {Limit}</div>
            {PostSize < Limit ||
                <div style={{display:'flex', justifyContent:'center'}}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }

        </div>
    )
}

export default LandingPage
