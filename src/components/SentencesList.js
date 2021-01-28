import React, { Component } from "react";
import SentenceDataService from "../services/sentence.service";
import { Link } from "react-router-dom";

export default class SentencesList extends Component {
  constructor(props) {
    super(props);

    this.fetchSentences = this.fetchSentences.bind(this);

    this.state = {
      sentences: [],
    }
  }

  componentDidMount() {
    this.fetchSentences();
  }

  fetchSentences() {
    SentenceDataService.getAll()
      .then(response => {
        this.setState({
          sentences: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div>Sentences List</div>
    )
  }
}
