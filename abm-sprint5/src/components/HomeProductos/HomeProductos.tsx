import {Card, CardGroup}  from "react-bootstrap";

const HomeProductos = () => {
return (
    <CardGroup>
      <Card>
        <Card.Img variant="top" src="src/assets/images/card1.jpg" />
        <Card.Body>
          <Card.Title>Pizza Calabresa</Card.Title>
          <Card.Text>
            Salsa de tomate, mozzarella y salami suave
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">$3000</small>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Img variant="top" src="src/assets/images/card2.jpg" />
        <Card.Body>
          <Card.Title>Pizza Original</Card.Title>
          <Card.Text>
            Salsa de tomate, pimiento y rucula
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">$3000</small>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Img variant="top" src="src/assets/images/card3.jpg" />
        <Card.Body>
          <Card.Title>Pizza Pollo</Card.Title>
          <Card.Text>
            Salsa de tomate, mozzarella, pollo y salsa bbq
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">$3500</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  )
}

  export default HomeProductos
