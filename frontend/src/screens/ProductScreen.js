import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Image, ListGroup, Row, Col, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(()=> {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    return (
        <>
            <Link className="btn btn-dark my-3 rounded" to="/">
               Back
            </Link>
            {loading 
                ? <Loader /> 
                : error 
                    ? <Message variant="danger">{error}</Message>
                    : 
                    <>
                        <Meta title={product.name} />
                        <Row>
                            <Col md={5}>
                                <Image src={product.image} alt={product.name} className="border border-secondary rounded" fluid />
                            </Col>
                            <Col md={4}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ${product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col> 
                            <Col>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    ${product.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty:</Col>
                                                    <Col>
                                                        <Form.Control 
                                                            as="select" 
                                                            alue={qty} 
                                                            onChange={e => setQty(e.target.value)}>
                                                                {[...Array(product.countInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item> 
                                        )}
                                        <ListGroup.Item>
                                            <Button 
                                                onClick={addToCartHandler}
                                                className="btn-block rounded" 
                                                type="button" 
                                                disabled={product.countInStock === 0 ? true : false}>
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </>
            }
        </>
    )
}

export default ProductScreen
