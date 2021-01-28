import React, { Component } from "react";
import SentenceDataService from "../services/sentence.service";
import './SentencesList.css';
import { Link } from "react-router-dom";

export function SentencesTable({ sentences }) {
  return (
    <tbody>
      {
        sentences.map((sentence) => {
          return (
            <tr>
              <td>{sentence.original}</td>
              <td>{sentence.translated}</td>
            </tr>
          );
        })
      }
    </tbody>
  );
}

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
    const { sentences } = this.state;

    return (
      <div class="container">
        <h1>iamverysmart</h1>
        <div class="row input-row">
          <div class="col-md-8 offset-md-2">
            <div class="input-group">
              <input type="text" class="form-control sentence-input mr-2" aria-label="text input" placeholder="Sentence to translate" maxLength='100' />
              <button class="btn btn-outline-primary" type="button">Translate</button>
            </div>
          </div>
        </div>

        <div class="row">
          <table className="table table-sm table-bordered">
            <thead>
              <tr>
                <th scope="col">Original</th>
                <th scope="col">Translated</th>
              </tr>
            </thead>
            <SentencesTable sentences={sentences} />
          </table>
        </div>
      </div>
    );
  }
}
