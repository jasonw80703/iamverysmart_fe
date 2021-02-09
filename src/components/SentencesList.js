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
    this.copyToClipboard = this.copyToClipboard.bind(this);

    this.state = {
      sentences: [],
      id: null,
      original: '',
      translated: null,
      copySuccess: false,
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
    const { original } = this.state;

    if (original == '') {
      return;
    }

    var data = {
      original: original,
    };

    SentenceDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          original: response.data.original,
          translated: response.data.translated,
          copySuccess: false,
        });
        console.log(response.data);
        this.fetchSentences();
      })
      .catch(e => {
        console.log(e);
      });
  }

  copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = this.state.translated;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.setState({
      copySuccess: true
    });
  }

  render() {
    const { sentences, original, translated, copySuccess } = this.state;

    return (
      <div className="container">
        <h1 className='main-header'>iamverysmart</h1>
        <div className="row input-row mb-5">
          <div className="col-md-8 offset-md-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control sentence-input mr-2"
                aria-label="text input"
                placeholder="Sentence to translate"
                value={original}
                onChange={this.onChangeSentence}
                maxLength='100'
              />
              <button className="btn btn-outline-primary" type="button" onClick={this.findOrCreateSentence}>Translate</button>
            </div>
          </div>
        </div>
        {translated && (
          <div>
            <div className="row justify-content-center">
              <h4 id="translated" onClick={this.copyToClipboard}>{translated}</h4>
            </div>
            <div className="row justify-content-center">
              {copySuccess && <p>Copied!</p>}
            </div>
          </div>
        )}
        <div className="row mt-3">
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
