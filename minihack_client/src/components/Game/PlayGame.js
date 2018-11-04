import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

import { getGameById } from 'networks';

class PlayGame extends Component {

    state = { 
        game: null,
        totalScore: [ 0, 0, 0, 0]
    }

    componentDidMount(){
        const gameId = this.props.match.params.gameId;
        getGameById(gameId)
            .then(response => {
                if(response.data.game && response.data.game._id){
                    const game = response.data.game;
                    const totalScore = game.scores.map(playerScore => {
                        return playerScore.reduce((total, score) => {
                            return total + score;
                        }, 0)
                    });
                    this.setState({ game, totalScore });
                }
            })
            .catch(err => console.log(err));
    }

    renderPlayerName = (players) => {
        return players.map((player, index) => {
            return <th key={index}>{player}</th>});
    }

    renderTotalPlayerScore() {
        const { totalScore } = this.state;
        const sumOfScore = totalScore.reduce((total,item) => {
            return total + item;
        }, 0);
        const totalPlayerScore = totalScore.map((score, index) => <th key={index}>{score}</th>)

        return(
            <tr>
                <th>Sum of Score ({sumOfScore})</th>
                {totalPlayerScore}
            </tr>
        );
    }

    renderPlayRow(scores){
        let rows = [];
        scores.forEach((playerScore, playerIndex) => { 
            playerScore.forEach((score, rowIndex) => {
                if(rows[rowIndex]){
                    rows[rowIndex][playerIndex] = score;
                } else rows[rowIndex] = [ score ]
            });
        });

        return rows.map((row, index) => {
            let rowData = row.map((score, index) =>  <td key={index}>{score}</td>);
            return (
                <tr key={index}>
                    <th>Round {index + 1}</th>
                    { rowData }
                </tr>
            )
        })
    }

    handleAddNewRow = () => {
        let { game } = this.state;
        let { scores } = game
        game.scores.forEach((score, index) => {
            score.push(0);
            game.scores[index] = score;
        });
        game.scores = scores;
        this.setState({ game });
    }

    render() {
        //todo: render game play
        const { game } = this.state;
        const { players, scores } = game || {};
        console.log(game);
        console.log(players);

        if(game && players && scores){
            return (

                <div>
                    <Table striped>
                    <thead>
                    <tr>
                        <th></th>
                        { players ? this.renderPlayerName(players) : ''}
                    </tr>
                    { this.renderTotalPlayerScore() }
                    </thead>
                    <tbody>
                        { this.renderPlayRow(scores) }
                    </tbody>
                        
                    
                    </Table>
                    <div className='text-center'>
                    <Button color='danger' onClick={this.handleAddNewRow}>Add row</Button>
                    </div>
                </div>

            );
        } else return "Loading..."
    }
        
}
    


export default PlayGame;