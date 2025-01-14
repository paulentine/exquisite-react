import React, { Component } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissions: [],
      showPoem: false,
    }
  }

  addSubmission = (newSubmission) => {
    const newSentence = Object.values(newSubmission).join(" ")
    this.setState({
      submissions: [...this.state.submissions, newSentence],
    })
  }

  showFinalPoem = (event) => {
    event.preventDefault();

    this.setState({ showPoem: true })
  }

  render() {
    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");


    // const newestSub = (allSubmissions) => {
    //   if (allSubmissions.length > 0) {
    //     return allSubmissions[newestSubIndex]
    //   } else {
    //     return ""
    //   }
    // }

    // <RecentSubmission newestSubmission={newestSub(this.state.submissions)} />

    const mostRecentSubmission = () => {
      if ((this.state.submissions).length > 0) {
        const allSubmissions = this.state.submissions
        const newestSubIndex = allSubmissions.length - 1
        const newestSub = allSubmissions[newestSubIndex]

        return <RecentSubmission newestSubmission={newestSub} />
      } else {
        return ''
      }
    }

    return (
      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">
          { exampleFormat }
        </p>

          { mostRecentSubmission() }

          { this.state.showPoem ? "" : <PlayerSubmissionForm fields={FIELDS} addSubmissionCallback={this.addSubmission} playerID={this.state.submissions.length + 1} /> }

        <FinalPoem submissions={ this.state.submissions } showPoem={this.state.showPoem} showFinalPoem={this.showFinalPoem} />

      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

export default Game;
