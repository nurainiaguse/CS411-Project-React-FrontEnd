import _ from "lodash";
import React, { Component } from "react";
import axios from 'axios'
import { Search, Grid, Header, Segment } from "semantic-ui-react";


export default class SearchExampleStandard extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({
      isLoading: false,
      results: [],
      value: ""
    });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value }, console.log("value:",this.state.value))

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      let url = 'http://localhost:5000/api/restaurant/' + this.state.value;

      axios.get(url).then((response) => {
        // const map1 = response.data.map(x => JSON.parse(x));
        this.setState({
          isLoading: false,
          results: response.data,
        }, console.log("done", response.data, ));
        
      }).catch((error) => {
        console.log(error);
      });
    }, 300)
  };

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      
      </Grid>
    );
  }
}
