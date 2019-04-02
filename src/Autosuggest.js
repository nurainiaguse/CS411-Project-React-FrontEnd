import _ from "lodash";
import React, { Component } from "react";
import axios from 'axios'
import { Search, Grid, Header, Segment, Form } from "semantic-ui-react";


class SearchSuggest extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({
      isLoading: false,
      results: [],
      value: "",
      license:0
    });

  onClickHandler = (e, { result }) => {
    if (this.state.license === 0){
      this.props.onSearchHandler([], 0)
      return
    }
    let url = 'http://dwzhong2.web.illinois.edu/api/license/' + this.state.license;
    axios.get(url).then((response) => {
        // const map1 = response.data.map(x => JSON.parse(x));
        this.props.onSearchHandler(response.data, this.state.license)
      }).catch((error) => {
        console.log(error);
      });
  }

  handleResultSelect = (e, { result }) =>{
    this.setState({ value: result.title, license: result.key, results: [result]});
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ license: 0, isLoading: true, value }, console.log("value:",this.state.value))

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      let url = 'http://dwzhong2.web.illinois.edu/api/restaurant/' + this.state.value;

      axios.get(url).then((response) => {
        // const map1 = response.data.map(x => JSON.parse(x));
        this.setState({
          isLoading: false,
          results: response.data,
        }, console.log("done", response.data, this.state.results));
        
      }).catch((error) => {
        console.log(error);
      });
    }, 300)
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column>
          <Search
            aligned='center'
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
            fluid='true'
            {...this.props}
          />
          <Form onSubmit={this.onClickHandler} style={{padding: '2em 0em'}}>      
            <Form.Button content='Search'/>   
          </Form> 
        </Grid.Column>
      
      </Grid>
    );
  }
}

export default SearchSuggest