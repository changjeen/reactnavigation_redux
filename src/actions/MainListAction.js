
import Data from '../../instructions.json';
import {MAIN_LIST} from './ActionTypes';

export const getData = () => {
    const responseJson = Data.instructions;
    return {
        type: MAIN_LIST,
        payload:responseJson
    };
};
