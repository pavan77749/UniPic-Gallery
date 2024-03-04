import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';


const API_URL = 'https://api.unsplash.com/search/photos';
const IMAGE_PER_PAGE = 20;

export default function SearchComponent() {
    const [searchValue, setSearchValue] = useState('');
    const [images, setImages] = useState([]);
    const [page, setPage ] = useState(0)
    const [totalPages, setTotalPages] = useState(0);

    useEffect(()=>{
        fetchImages();
    },[page])

    const fetchImages = async () => {
        try {
            const response = await axios.get(`${API_URL}?query=${searchValue}&page=${page}&per_page=${IMAGE_PER_PAGE}&client_id=OkQCTC56aZ81spxSDxpOKzX_dR3QBSmUJD3_KP4zkrw`);
            
            // Check if response.data exists and has the required properties
            if (response.data && response.data.results && response.data.total_pages) {
                setImages(response.data.results);
                setTotalPages(response.data.total_pages);
            } else {
                console.error('Invalid response data format:', response.data);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };
    
    const resetSearch = () =>{
        fetchImages()
        setPage(0)
    }

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        resetSearch()
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        resetSearch()
    };

    const handleSelection = (selection) => {
        setSearchValue(selection);
        fetchImages();
    };

    return (
        <div className="containers">
            <h1><span style={{ color: 'red', fontFamily: 'monospace' }}>UniPic</span> Gallery</h1>
            <div className="search-bar">
                <div className="search-Container">
                    <Form onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            id="search-input"
                            className='search-Input'
                            placeholder="Search the Picture ..."
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </Form>
                </div>
            </div>
            <div className="filters">
                <div onClick={() => handleSelection('car')}>Cars</div>
                <div onClick={() => handleSelection('foods')}>Foods</div>
                <div onClick={() => handleSelection('coding')}>Coding</div>
                <div onClick={() => handleSelection('bike')}>Bike</div>
                <div onClick={() => handleSelection('hardware')}>Hardware</div>
                <div onClick={() => handleSelection('planets')}>Planets</div>
            </div>
            <div className="images">
                {images.map((image) => (
                    <img key={image.id} src={image.urls.small} alt={image.alt_description} className='image' />
                ))}
            </div>
            <div className="buttons">
                {page > 1 && <button onClick={()=>setPage(page -1)}>Previous</button>}
                {page < totalPages && <button onClick={()=>setPage(page +1)}>Next</button>}
            </div>
        </div>
    );
}
