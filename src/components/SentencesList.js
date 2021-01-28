import React, { Component } from "react";
import SentenceDataService from "../services/sentence.service";
import './SentencesList.css';

export function SentencesTable({ sentences }) {
  return (
    <tbody>
      {
        sentences.slice(0).reverse().slice(0, 10).map((sentence) => {
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
    this.onChangeSentence = this.onChangeSentence.bind(this);
    this.findOrCreateSentence = this.findOrCreateSentence.bind(this);

    this.state = {
      sentences: [],
      id: null,
      original: '',
      translated: null,
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
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  onChangeSentence(e) {
    this.setState({
      original: e.target.value
    });
  }

  findOrCreateSentence() {
    var data = {
      original: this.state.original,
    };

    SentenceDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          original: response.data.original,
          translated: response.data.translated,
        });
        console.log(response.data);
        this.fetchSentences();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { sentences, original, translated } = this.state;

    return (
      <div class="container">
        <h1 class='main-header'>iamverysmart</h1>
        <div class="row input-row mb-5">
          <div class="col-md-8 offset-md-2">
            <div class="input-group">
              <input
                type="text"
                class="form-control sentence-input mr-2"
                aria-label="text input"
                placeholder="Sentence to translate"
                value={original}
                onChange={this.onChangeSentence}
                maxLength='100'
              />
              <button class="btn btn-outline-primary" type="button" onClick={this.findOrCreateSentence}>Translate</button>
            </div>
          </div>
        </div>
        {translated && (
          <div class="row justify-content-center">
            <h4 class="mb-5">{translated}</h4>
          </div>
        )}
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
