import React, { Component } from 'react';
import { Container, Form, FormGroup, Input, Button } from 'reactstrap';

import { createGame } from 'networks';


class NewGame extends Component {

    state = {
        players: ["", "", "", ""]
    }

    handleInputChange = (e) => {
        let p = this.state.players;
        p[e.target.name] = e.target.value;
        this.setState({ players: p });
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        createGame(this.state.players)
            .then(response => {
                this.props.history.push(`game/${response.data.game._id}`);
            })
            .catch(err => console.log(err))
    }

    render() {
        // const { players } = this.state;
        console.log(this.state);
        return (
            <Container>
                
                
                <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup>
                        <Input onChange={this.handleInputChange} type="text" name="0" placeholder="Player 1..."/>
                    </FormGroup>

                    <FormGroup>
                        <Input onChange={this.handleInputChange} type="text" name="1" placeholder="Player 2..."/>
                    </FormGroup>

                    <FormGroup>
                        <Input onChange={this.handleInputChange} type="text" name="2" placeholder="Player 3..."/>
                    </FormGroup>

                    <FormGroup>
                        <Input onChange={this.handleInputChange} type="text" name="3" placeholder="Player 4..."/>
                    </FormGroup>

                    <FormGroup className="text-center">
                        <Button type="submit" color="danger">SUBMIT</Button>
                    </FormGroup>
                </Form>
            </Container>
        )
    }
}

export default NewGame;