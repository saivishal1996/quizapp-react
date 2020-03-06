import React from 'react';
import { Response } from './QuestionComponent';

export interface ResultProps {
    resultSet : Response[];
    time : TimeTaken;
}

export interface TimeTaken {
    mts : number;
    sec : number;
}

export class ResultComponent extends React.Component<ResultProps> {

    correctCount : number = 0;
    wrongCount : number = 0;
    percentage : number = 0;

    constructor(props) {
        super(props);
        this.calculateResults();
    }

    // converts to two digits
    format(num) {
        return (num + '').length === 1 ? '0' + num : num + '';
    }

    calculateResults() {
        this.props.resultSet.forEach((res) => {
            (res.selected === res.correct) ? this.correctCount++ : this.wrongCount++
        })
        this.percentage = (this.correctCount/(this.correctCount + this.wrongCount))*100;
        this.setState({});
    }

    render()  {
        return (
            <div> 
                <p> Total Correct Answers : {this.correctCount}</p>         
                <p> Total Wrong Answers : {this.wrongCount}</p>
                <p> Percentage : {this.percentage} % </p>
                <p> Time Taken : {this.format(this.props.time.mts)} : {this.format(this.props.time.sec)} </p>
            </div>
        );
    }
}