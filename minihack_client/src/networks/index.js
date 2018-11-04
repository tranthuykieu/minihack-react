import axios from 'axios';

import { GAME_API } from '../statics';

export const createGame = (players) => {
    const newGame = {
        players,
        scores: [ [0], [0], [0], [0] ]
    }

    return axios.post(GAME_API, newGame);
}

export const getGameById = (gameId) => {
    return axios.get(`${GAME_API}/${gameId}`);
}