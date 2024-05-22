import Popup from 'reactjs-popup'
import { Circles } from 'react-loader-spinner'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useProduct } from '../../context/furrlContext';
import './index.css'

const Cards = () => {
    const { onChange } = useProduct();
    const [data1, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef(null);

    const fetchProduct = (id) => {
        data1.map(each => {
            if (each.id === id) {
                onChange(each);
            }
            return "";
        })
    }

    const url = 'https://api.furrl.in/api/v2/listing/getListingProducts';
    const fetchData = async (page) => {
        //console.log(page);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ "input": { "page": page, "pageSize": 10, "filters": [], "id": "#HomeHunts", "entity": "vibe" } })

        }
        const response = await fetch(url, options);
        if (response.ok) {
            const data3 = await response.json();
            const data4 = data3.data.getListingProducts;

            //console.log(data4);
            return data4.products;
            //console.log(pr);
        }

    }


    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            const initialData = await fetchData(page);
            setData(initialData);
            setLoading(false);
        };
        loadInitialData();
    }, []);


    const loadMoreData = async () => {
        setLoading(true);
        const newData = await fetchData(page);
        setData(prevData => [...prevData, ...newData]);
        setHasMore(newData.length > 0);
        setLoading(false);
    };

    useEffect(() => {
        if (page > 1) {
            loadMoreData();
        }
    }, [page]);

    const lastDataElementRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && hasMore) {
                    setPage(prevPage => prevPage + 1);
                } else {
                    console.log('Last element not in view:', entry.isIntersecting);
                }
            });
        });

        if (node) {
            //console.log('Observing new node:', node);
            observer.current.observe(node);
        }
    }, [loading, hasMore]);

    return (
        <div>
            <div className="card-container">
                {data1.map((data, index) => {
                    return (

                        <div className="card1 " key={data.id} onClick={() => { fetchProduct(data.id) }} ref={index === data1.length - 1 ? lastDataElementRef : null}>
                            <Link to={`productitem/${data.id}`}>
                                <img src={data.images[0].src} alt={data.vendor} className="image" />
                            </Link>
                            <div className='share-icon'>
                                <Popup
                                    modal
                                    trigger={

                                        <div className='trigger-button'>
                                            <svg width="34" height="34" viewBox="0 0 44 45" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" >
                                                <g filter="url(#filter0_d_6238_38939)">
                                                    <rect x="4" y="4.82983" width="36" height="36" rx="18" fill="#4B5563">
                                                    </rect>
                                                    <path
                                                        d="M17.3895 19.8139H16.4565C14.4215 19.8139 12.7715 21.4639 12.7715 23.4989V28.3739C12.7715 30.4079 14.4215 32.0579 16.4565 32.0579H27.5865C29.6215 32.0579 31.2715 30.4079 31.2715 28.3739V23.4889C31.2715 21.4599 29.6265 19.8139 27.5975 19.8139H26.6545"
                                                        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M22.0215 13.0204V25.0614" stroke="white" strokeWidth="1.5"
                                                        strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M19.1064 15.9486L22.0214 13.0206L24.9374 15.9486" stroke="white"
                                                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </g>
                                                <defs>
                                                    <filter id="filter0_d_6238_38939" x="0" y="0.829834" width="44" height="44"
                                                        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                                                        <feColorMatrix in="SourceAlpha" type="matrix"
                                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                                                        <feOffset></feOffset>
                                                        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                                                        <feComposite in2="hardAlpha" operator="out"></feComposite>
                                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
                                                        <feBlend mode="normal" in2="BackgroundImageFix"
                                                            result="effect1_dropShadow_6238_38939"></feBlend>
                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6238_38939"
                                                            result="shape"></feBlend>
                                                    </filter>
                                                </defs>
                                            </svg>
                                        </div>

                                    }
                                >
                                    {close => (
                                        <>
                                            <div className="confirmation">
                                                <button
                                                    type="button"
                                                    className="button1 cross"
                                                    onClick={() => close()}
                                                    data-testid="close"
                                                >
                                                    Close
                                                </button>
                                                <div className="card1 ">
                                                    <img src={data.images[0].src} alt={data.vendor} className="share-image" />
                                                    <p className="vendor">{data.vendor}</p>
                                                    <p className="title">{data.title}</p>
                                                    <div className='price-container'>
                                                        <p className='sp'>Rs {data.price.value}</p>
                                                        <p className='cp'>Rs {data.MRP.value}</p>
                                                        <p className='dis'>{data.discountPercent}%</p>
                                                    </div>
                                                </div>
                                                <div className="button-container">
                                                    <button
                                                        type="button"
                                                        className="cancel-button button1"
                                                        onClick={() => close()}
                                                    >
                                                        Share
                                                    </button>
                                                </div>
                                            </div>

                                        </>
                                    )}
                                </Popup>
                            </div>
                            <div className='home-data'>
                                <p className="vendor">{data.vendor}</p>
                                <p className="title">{data.title}</p>
                                <div className='price-container'>
                                    <p className='sp'>Rs {data.price.value}</p>
                                    <p className='cp'>Rs {data.MRP.value}</p>
                                    <p className='dis'>{data.discountPercent}%</p>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>
            {loading &&
                <div className="loader-container" data-testid="loader">
                    < Circles type="ThreeDots" color="#3b82f6" height="50" width="50" />
                </div>
            }
        </div>
    )
}

export default Cards;