import React from 'react';
import {Container, Row, Col, Card, Button} from "react-bootstrap";
var Item = ({
    image,
    name,
    price,
    addToBasket,
    quantity
}) => {

    var itemObject = {
        name: name,
        price: price,
        image: image
    }

    let ItemButton = () => {
        if(quantity == 0){
            return(
            <Button onClick={()=>{addToBasket(itemObject, 1)}}>Add To Basket</Button>
            )
        }else{
            return(
                <Container>
                    <Row className="justify-content-center align-items-center">
                    <Col xs={4}><Button variant="danger" onClick={(e)=>{e.stopPropagation(); addToBasket(itemObject, -1)}}>-</Button></Col>
                    <Col xs={4}><p>{quantity}</p> </Col>
                    <Col xs={4}><Button variant="success" onClick={(e)=>{e.stopPropagation(); addToBasket(itemObject, 1)}}>+</Button></Col>
                    </Row>
                </Container>
                
            )
        }
    }
    return(
        <div>
            <Card className="text-center">
                <Card.Img variant="top" src={image}/>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
                <Card.Text>
                    £{price}
                </Card.Text>
                <Card.Footer>
                    <ItemButton></ItemButton>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default Item;