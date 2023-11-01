import axios from 'axios';
import {adminurl} from '../Constans/Url'

const adminaxios = axios.create({
    baseURL:adminurl,
});

export default adminaxios