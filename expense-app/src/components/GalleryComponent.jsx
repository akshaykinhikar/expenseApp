import React, { useState } from 'react';
import useMutation from '../hooks/useMutation';
import CONSTANTS from '../constants';
import useQuery from '../hooks/useQuery';


const GalleryComponent = () => {
    const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

    const [error, setError] = useState('');

    const {
        mutate: uploadImage,
        isLoading: uploading,
        error: uploadError } = useMutation();


    const {
        data: imageUrls = [],
        isLoading: imagesLoading,
        error: fetchError } = useQuery(CONSTANTS.IMAGE_UPLOAD);

    const updateResp = (data) => {
        data.then((data) => {
            console.log('res data', data);
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
        });

    }


    return (<>

        <div className="container my-3">
            <div className="row">
                <div className="col-sm-12">
                    <input id="imageInput" type="file" alt="" onChange={handleImage} />
                    {uploadError ? <p>{uploadError}</p> : ''}
                    {uploading ? <p>uploading</p> : ''}
                </div>
                {imageUrls && imageUrls.length > 0 ?
                    imageUrls.map(img => (
                        <div className="col-sm-12">
                            <img src={img} alt="" />
                        </div>
                    ))
                    : <p>Please upload image</p>

                }
            </div>
        </div>
    </>)
}

export default GalleryComponent