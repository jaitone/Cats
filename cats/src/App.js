import React, { Component } from "react";
import { Container, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
// import Search from "./components/search";
import Cats from "./components/cats";
import Paginate from "./components/pagination";
const api = "c9ec6e51-269f-4979-a0c7-4d42c125f570";

class App extends Component {
  state = {
    cats: [],
    currentPage: 1,
    catsPerPage: 5,
    search: ""
  };

  componentDidMount() {
    this.getCats();
  }

  getCats() {
    fetch(`https://api.thecatapi.com/v1/breeds?${api}`)
      .then(response => response.json())
      .then(result => this.setState({ cats: result }))
      .then(result => console.log(this.state.cats))
      .catch(err => console.log(err));
  }

  paginateAlgorithm() {
    const indexLastCat = this.state.currentPage * this.state.catsPerPage;
    const indexFirstCat = indexLastCat - this.state.catsPerPage;
    const currentCats = this.state.cats.slice(indexFirstCat, indexLastCat);
    return currentCats;
  }

  render() {
    const { catsPerPage, cats, search } = this.state;

    const handlePageChange = number => {
      this.setState({ currentPage: number });
    };

    const handleSearch = word => {
      this.setState({ search: word.target.value });
    };

    return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{ margin: "20px 0" }}>The Purrfect Cattionary</h1>
          </Col>
        </Row>
        <Form>
          <FormGroup>
            <Label style={{ margin: "10px 0" }}>Search</Label>
            <Input
              type="text"
              value={search}
              onChange={word => handleSearch(word)}
              // name="email"
              // id="exampleEmail"
              // placeholder="with a placeholder"
            />
          </FormGroup>
        </Form>
        {/* <Search onSearch={handleSearch} totalCats={cats} search={search} /> */}
        <Row>
          <Col>
            <Cats
              totalCats={this.state.cats}
              cats={this.paginateAlgorithm()}
              search={this.state.search}
            />
          </Col>
        </Row>
        <Paginate
          catsPerPage={catsPerPage}
          totalCats={cats.length}
          passPage={handlePageChange}
        />
      </Container>
    );
  }
}

export default App;
