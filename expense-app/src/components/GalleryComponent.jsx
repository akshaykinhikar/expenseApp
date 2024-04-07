import React, { useState } from 'react';
import useMutation from '../hooks/useMutation';
import CONSTANTS from '../constants';
import useQuery from '../hooks/useQuery';


const GalleryComponent = () => {
    const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    const [error, setError] = useState('');
    const [imageCount, setImageCount] = useState(0)


    const {
        mutate: uploadImage,
        isLoading: uploading,
        error: uploadError } = useMutation();

    const {
        data: imageUrls = [],
        isLoading: imagesLoading,
        error: fetchError } = useQuery(CONSTANTS.IMAGE_UPLOAD, imageCount);



    const updateResp = (data) => {
        data.then((data) => {
            console.log('res data', data);
            setTimeout(() => {
                setImageCount(() => imageCount + 1);
            }, 1000);
        })
    }

    const handleImage = async (e) => {
        const file = e.target.files[0];
        console.log(file);

        if (!validFileTypes.find(type => type === file.type)) {
            setError('File format not supported');
            return;
        }

        const form = new FormData();
        form.append('image', file);

        await uploadImage({
            url: CONSTANTS.IMAGE_UPLOAD, method: 'POST', data: form, action: updateResp
        })

    }


    return (<>

        <div className="container my-3">
            <div className="row">
                <div className="col-sm-12">
                    <label htmlFor="imageUpload" className='mb-3'>Select Image to upload to s3 bucket</label> <br />
                    <input name="imageUpload" id="imageInput" type="file" className="mb-3" alt="" onChange={handleImage} />
                    {uploadError ? <p>{uploadError}</p> : ''}
                    {uploading ? <p>uploading</p> : ''}
                </div>
                <div className="row-img-grid">
                    {imageUrls && imageUrls.length > 0 ?
                        imageUrls.map((img, i) => (
                            <div key={i} className="column-img-grid">
                                <img src={img} alt="" style={{ width: '100%' }} />
                            </div>
                        ))
                        : <p>Please upload image</p>

                    }
                </div>
            </div>
        </div>
    </>)
}

export default GalleryComponent