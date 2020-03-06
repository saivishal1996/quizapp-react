import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import he from 'he';

export class Response {
    constructor(public question: String, public correct: String ,public selected: String) {}
}

export interface Question {
    category : String; 
    type : String;
    difficulty: String;
    question : String;
    correct_answer: String;
    incorrect_answers: Array<String>;   
}

export interface QuestionState {
    currentQNo : number;
}

export interface QuestionProps {
    questions: Question[];
    callbackwithResponses : (responses: Response[]) => void;
}

export class QuestionComponent extends React.Component<QuestionProps,QuestionState> {
    
    state = {
        currentQNo : 0
    } as QuestionState;

    options : Array<String> = [];
    quizResponses: Array<Response> = [];
    response = {}  as Response;
    value;

    constructor(props: any){
        super(props);
    }
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement> , value : String) => {
        event.preventDefault();
        event.stopPropagation();

        this.value = value;
    };

    nextQuestion = (event : any) => {
        event.preventDefault();
        event.stopPropagation();

        if(!!this.value) {
            this.response = new Response(this.props.questions[this.state.currentQNo].question,this.props.questions[this.state.currentQNo].correct_answer,this.value)
            this.quizResponses.push(this.response);
            this.value = null;
            this.setState((prevState: any )  => {
                return {currentQNo : prevState.currentQNo + 1}
            });    
        } else {
            alert ("please select any one option");
        }

        if(this.state.currentQNo === (this.props.questions.length - 1)) {
            this.props.callbackwithResponses(this.quizResponses);
        }
    }
    
    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex     
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {     
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;     
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
    }
    
    render() {

        this.options = this.props.questions[this.state.currentQNo].incorrect_answers;
        this.options.push((this.props.questions[this.state.currentQNo].correct_answer));
        this.shuffle(this.options);

        return (
            <div>
                <div>
                    <p> {he.decode(this.props.questions[this.state.currentQNo].category)} </p>
                    <p> {he.decode(this.props.questions[this.state.currentQNo].question)} </p>
                </div>
                <div>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="options" name="option" value={this.value} onChange={this.handleChange}>
                            <FormControlLabel value={he.decode(this.options[0])} control={<Radio />} label={he.decode(this.options[0])} />
                            <FormControlLabel value={he.decode(this.options[1])} control={<Radio />} label={he.decode(this.options[1])} />
                            <FormControlLabel value={he.decode(this.options[2])} control={<Radio />} label={he.decode(this.options[2])} />
                            <FormControlLabel value={he.decode(this.options[3])} control={<Radio />} label={he.decode(this.options[3])} />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div>
                    <button onClick = {this.nextQuestion}>Next</button>
                </div>
            </div>
        );    
    }
}
