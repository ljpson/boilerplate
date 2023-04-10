import React, {useEffect, useState} from 'react';
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {

    const [Images, setImages] = useState([])

    useEffect(() => {
        if(props.detail.images && props.detail.images.length >0){
            let images = []

            props.detail.images.map(item => {
                images.push({
                    original: `http://15.164.214.250:4003/${item}`,
                    thumbnail: `http://15.164.214.250:4003/${item}`,
                })
            })
            setImages(images)
        } else{

        }
    },[props.detail])
    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage;