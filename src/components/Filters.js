
import { Button, FormCheck } from 'react-bootstrap';
import { CartState } from '../context/Context';
import Rating from './Rating';

const Filters = () => {



    const { productState: { byStock, byFastDelivery, sort, byRating, searchQuery }, productDispatch } = CartState()

    console.log(byStock, byFastDelivery, sort, byRating, searchQuery);
    return (
        <div className="filters">
            <span className="title">Filter Products </span>
            <span>
                <FormCheck
                    inline
                    label="Acending"
                    name="group1"
                    type="radio"
                    id={`inline-1`}
                    onChange={() => {
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "lowToHigh"
                        })
                        }
                    }
                    checked={sort === "lowToHigh" ? true : false}
                />

                <FormCheck
                    inline
                    label="Descending"
                    name="group1"
                    type="radio"
                    id={`inline-2`}
                    onChange={() => {
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "highToLow"
                        })
                        }
                    }
                    checked={sort === "highToLow" ? true : false}
                />

                <FormCheck
                    inline
                    label="Include Out of Stock"
                    name="group1"
                    type="checkbox"
                    id={`inline-3`}
                    onChange={() => {
                        productDispatch({
                            type: "FILTER_BY_STOCK",      
                        })
                        }
                    }
                    checked={byStock}
                />

                <FormCheck
                    inline
                    label="Fast Delivery Only"
                    name="group1"
                    type="checkbox"
                    id={`inline-4`}
                    onChange={() => {
                        productDispatch({
                            type: "FILTER_BY_DELIVERY",      
                        })
                        }
                    }
                    checked={byFastDelivery}
                />

            </span>
            <span>
                <label style={{ paddingRight: 10 }}> Ratings: </label>
                <Rating rating={byRating} onClick={(i) => 
                    productDispatch({ 
                            type: "FILTER_BY_RATING",
                            payload: i + 1 
                        })}
                     style={{ cursor: "pointer" }} />
            </span>
            <Button variant="light" 
            onClick={(i) => 
                productDispatch({ 
                        type: "CLEAR_FILTERS",
                    })}
                 style={{ cursor: "pointer" }}
            >Clear Filters</Button>
        </div>
    )
};

export default Filters;
