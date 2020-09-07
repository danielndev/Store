import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Navbar, Nav, Card, Button, Accordion, InputGroup, FormControl} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import Item from './components/Item';
import './App.css';



function App() {

  const defaultItemList = [
    {
      image: "https://i1.adis.ws/i/washford/168898/Halfords-Ball-Pein-Hammer.webp?$sfcc_tile$&w=260",
      price: 9.99,
      name: "Hammer",
      quantity: 0,
      index: 0
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT88hlKTy1FOoyA3PC5YAore8ztmSBGRVI7XQ&usqp=CAU",
      price: 4.99,
      name: "Screwdriver",
      quantity: 0,
      index: 0
    },
    {
      image: "https://media.screwfix.com/is/image//ae235?src=ae235/621HP_P&$prodImageMedium$",
      price: 49.99,
      name: "Drill",
      quantity: 0,
      index: 0
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZM71bD9VwFFmMmOFvuxER3u4m_r4rzaRyGq2JnhHIZHIQZB-B3VBCdLPjpI3AXWZrAFmS6xKY&usqp=CAc",
      price: 29.99,
      name: "Toolkit",
      quantity: 0,
      index: 0
    },
    {
      image: "https://www.stanleytools.com/NA/product/images/3000x3000x96/20-045/20-045_1.jpg",
      price: 8.99,
      name: "Saw",
      quantity: 0,
      index: 0
    },
    {
      image: "https://media.screwfix.com/is/image//ae235?src=ae235/81610_P&$prodImageMedium$",
      price: 4.99,
      name: "Spirit Level",
      quantity: 0,
      index: 0
    },
    {
      image: "https://i.ebayimg.com/images/g/3Z0AAOSw-89eQ5Ns/s-l600.jpg",
      price: 4.99,
      name: "Wrench",
      quantity: 0,
      index: 0
    }
  ];
  


  var [basketList, setBasket] = useState([...defaultItemList]);
  var [ordersList, setOrders] = useState([]);
  var [promoCode, setPromoCode] = useState("");

  useEffect(()=>{
    console.log("Update")
  }, []); 

  var changeBasket = (item, quantity) => {
    console.log("Adding");
    var temp = [...basketList];
    let containsItem = false;
    
    for(let i = 0; i < temp.length; i ++){
      if(temp[i].name == item.name){
        temp[i].quantity += quantity;
        containsItem = true;
        
        break
      }
    }

    if(!containsItem){
      temp.push({
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }
    
    setBasket(temp);
   
  }

  var checkout = (price, list) => {
    console.log(list);
    let temp = [...ordersList];
    
    temp.push({
      itemList: [...list],
      totalPrice: price
    })
    
    setOrders(temp);
    setBasket([...defaultItemList]);
    setPromoCode("");
  }
  

  var Store = () => {
    return (
    
      <Container fluid style={{padding:"50px"}}>
        <Row>
        {basketList.map((item, index) => (
          <Col xl={2} xs={6} className="mb-4">    
            <Item 
            key={index}
            image={item.image}
            price={item.price}
            name={item.name}
            quantity={item.quantity}
            addToBasket={changeBasket}
            />
        </Col>
      ))}
        </Row>
      </Container>
    
      
    )
  }
  
  var Basket = () => {
    let totalPrice = 0;
    let renderedList = [];
    let promoCodeInput = "";

  

    for(let i = 0; i < basketList.length; i ++){
      totalPrice += basketList[i].price * basketList[i].quantity;
      if(basketList[i].quantity > 0){
        renderedList.push(basketList[i]);
      }
    }


    

    let CodeEntered = () =>{
      if(promoCode.toLowerCase() === "tools"){
        return <h2 style={{color:"green"}}>Your promo code worked, here's 25% off</h2>
      }else{
        return <h2>Enter promo code <span style={{fontWeight:"bold"}}>TOOLS</span> for 25% off</h2>
      }
    }
    let checkoutButtonVariant = "outline-secondary";
    if(renderedList.length > 0){
      checkoutButtonVariant = "outline-success";
    }

    if(promoCode.toLowerCase() === "tools"){
      totalPrice *= 0.75;
    }
    totalPrice = Math.round(totalPrice * 100) / 100
    

    let CheckoutButton = () =>{
      if(renderedList.length > 0){
        return(
      
          <Button variant="outline-success"  onClick={() => checkout(totalPrice, renderedList)}><h2>Checkout</h2></Button>
       
        )
      }else{
        return(
          <Button variant="outline-secondary" disabled ><h2>Checkout</h2></Button>
        )
      }
    }

    return (
      <div>
        <Container>
          <Row className="justify-content-md-center mb-3">
            <Col xs={2}></Col>
            <Col xs={4}><h3>Name</h3></Col>
            <Col xs={2}><h4>Price</h4></Col>
            <Col xs={2}><h4>Quantity</h4> </Col>
            <Col xs={2}></Col>
          </Row>
        {renderedList.map((item, index) => (     
          <Row key={index} className="justify-content-md-center">
            <Col xs={2}><Button variant="danger" onClick={()=>changeBasket(item, -1)}>-</Button></Col>
            <Col xs={4}><h3>{item.name}</h3></Col>
            <Col xs={2}><h4>{item.price}</h4></Col>
            <Col xs={2}><h4>{item.quantity}</h4> </Col>
            <Col xs={2}><Button variant="success" onClick={()=>changeBasket(item, 1)}>+</Button></Col>
          </Row>
          ))
          }
          <h3 className="m-4">Total Price: £{totalPrice}</h3>
          <CheckoutButton></CheckoutButton>
          
        </Container>
        
        <Container>
          <InputGroup className="m-3" onChange={e => {
            promoCodeInput = e.target.value;
          }}>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">Promo Code</InputGroup.Text>
            </InputGroup.Prepend>
            
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
            <InputGroup.Append>
              <Button variant="outline-success" onClick={() => setPromoCode(promoCodeInput)}>Submit</Button>
            </InputGroup.Append>
          </InputGroup>
        </Container>
        
        <Container style={{backgroundColor:"#dbdbdb", marginTop:"10px"}}>
          
          <CodeEntered></CodeEntered>
          
        </Container>

   
      </div>
    )
  }
  
  let Orders = () => {
    return (
      <Container>
        <Accordion>
          {ordersList.map((order, index) => (  
            
               <Card key={index}>
                 
               <Card.Header>
                 <Accordion.Toggle as={Button} variant="" eventKey={index.toString()}>
                    <h2>View your £{order.totalPrice} order.</h2>
                 </Accordion.Toggle>
               </Card.Header>
               <Accordion.Collapse eventKey={index.toString()}>
                 <Card.Body>
                   {order.itemList.map((item, index)=>(
                     <h4 key={index}>{item.name} x {item.quantity}</h4>
                   ))}
                   </Card.Body>
               </Accordion.Collapse>
             </Card>
              ))
              }
      </Accordion>
    </Container>
    )
  }

  var Checkout = () => {
    let totalPrice = 0;
    for(let i = 0; i < basketList.length; i ++){
      totalPrice += basketList[i].price * basketList[i].quantity;
    }

    

    return (
      <div >
        <h1 style={{
        color:"green",
        textDecoration: "underline bold"
        }}>Order Complete</h1>

      </div>
    )
  }

  return (
    <div className="App">
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand><h2>Tool Store</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="nav-drop">
            <Nav className="ml-5">
              <Nav.Link className="ml-5"><Link to ="/"><h2 style={{color:"gray"}}>Store</h2></Link></Nav.Link>
              <Nav.Link className="ml-5"><Link to ="/basket"><h2 style={{color:"gray"}}>Basket</h2></Link></Nav.Link>
              <Nav.Link className="ml-5"><Link to ="/orders"><h2 style={{color:"gray"}}>Orders</h2></Link></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> 

        <Switch>
          <Route exact path="/">
            <Store/>
          </Route>
          <Route path="/basket">
            <Basket/>
          </Route>
          <Route path="/orders">
            <Orders/>
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}



export default App;
