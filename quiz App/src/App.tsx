import React from 'react';
import logo from './logo.svg';
import './App.css';
import { QuestionComponent, QuestionProps , Response } from './QuestionComponent';
import { ResultComponent , ResultProps , TimeTaken } from './ResultComponent';

export class App extends React.Component {

  state = {
    dataReceived  : false,
    startQuiz : false,
    endQuiz : false,
    responses : []
  };

  quesProps = {} as QuestionProps;
  resProps = {} as ResultProps;
  timeTaken  = {} as TimeTaken;
  timer : any;

  componentDidMount() {  
    fetch("https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(
        (response) => {
          this.quesProps.questions = response.results;
          this.quesProps.callbackwithResponses = this.end;
          this.setState({
            dataReceived: true
          });
        },
        (error) => {
          this.setState({
            dataReceived: false,
            startQuiz: false
          });
          alert("error connecting to server");
          console.log(error);
        }
      )
  }

  start = (event : React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.dataReceived === true) {
      this.setState({
        startQuiz : true
      })
      this.startTimer();
    } else{
      console.log("Error while getting questions from the API");
      alert("Problem starting the quiz ,try again");
    }
  }

  end = (responses : Response[]) => {
    clearInterval(this.timer);
    this.resProps.resultSet = responses;
    this.resProps.time = this.timeTaken;
    this.setState({
      startQuiz : false,
      endQuiz : true,
    })
  }

  startTimer = () => {
    this.timeTaken.sec = 0;
    this.timeTaken.mts = 0;
    this.timer = setInterval(() => {
      this.timeTaken.sec++;
      if (this.timeTaken.sec >= 60) {
        this.timeTaken.mts++;
        this.timeTaken.sec=0;
      }
    }, 1000);
  }

  render() {
    return (
      <div className="App">

        { !this.state.startQuiz && !this.state.endQuiz ?
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={this.start}>Start Quiz</button>
          </header> : null
        }

        <div>
          { !!this.state.startQuiz === true ? <QuestionComponent {...this.quesProps}></QuestionComponent> : null }
          { !!this.state.endQuiz === true ? <ResultComponent {...this.resProps}></ResultComponent> : null }
        </div>   
      </div>
    );
  };
}

export default App;
