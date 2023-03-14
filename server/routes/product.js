const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage }).single("file")

// 이미지 전달
router.post("/image", (req, res) => {

    //가져온 이미지를 저장
    upload(req, res, err => {
        if (err){
            return req.json({ success: false, err})
        }
        return res.json({success: true, filePath:res.req.file.path, fileNaem:res.req.file.filename})
    })
});

// 상품등록
router.post("/", (req, res) => {

    //받아온 정보를 DB에 저장한다
    const product = new Product(req.body)
    product.save((err)=>{
        if (err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true})
    })
})

// 상품 리스트 조회
router.post("/products", (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 3;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    //product collection에 들어 있는 모든 상품 정보를 가져오기
    Product.find()
        .populate("writer") //writer와 관련된 테이블을 조인하여 모든 정보를 가져온다.
        .skip(skip)
        .limit(limit)
        .exec((err,productInfo)=>{
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success:true, productInfo})
        })
})

module.exports = router;
