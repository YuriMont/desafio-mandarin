import axios from "axios";

export const api = axios.create({
    baseURL: "https://dev-api-teste.mandarin.com.br/pokemons"
});