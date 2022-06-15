import express from "express";
import cors from "cors";
import dayjs from "dayjs";

import "dayjs/locale/pt-br.js";

const server = express();
server.use(cors());
console.log("Server initiated with CORS.");

const holidays = [
    { date: "1/1/2022", name: "Confraternização mundial" },
    { date: "3/1/2022", name: "Carnaval" },
    { date: "4/17/2022", name: "Páscoa" },
    { date: "4/21/2022", name: "Tiradentes" },
    { date: "5/1/2022", name: "Dia do trabalho" },
    { date: "6/16/2022", name: "Corpus Christi" },
    { date: "9/7/2022", name: "Independência do Brasil" },
    { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
    { date: "11/2/2022", name: "Finados" },
    { date: "11/15/2022", name: "Proclamação da República" },
    { date: "12/25/2022", name: "Natal" }
];

dayjs.locale("pt-br");

server.get("/holidays", (request, response) => {
    console.log("GET request made to route /holidays");
    response.send(holidays);
    response.status(200);
    console.log("Response sent.");
});

server.get("/holidays/:month", (request, response) => {
    const month = request.params.month;
    console.log("GET request made to route /is-today-holiday/" + month);
    const monthHolidays = holidays.filter(holiday => holiday.date.split('/', 1)[0] === month);
    console.log("Computed holidays for the month of the request:");
    console.log(monthHolidays);
    response.send(monthHolidays);
    response.status(200);
    console.log("Response sent.");
});

server.get("/is-today-holiday", (request, response) => {
    console.log("GET request made to route /is-today-holiday");
    const today = dayjs();
    const todayHolidays = holidays.filter(holiday => dayjs(holiday.date).isSame(today, 'date'));
    console.log("Computed holidays for the day of the request:");
    console.log(todayHolidays);
    if (todayHolidays.length > 0) {
        response.send("Sim, hoje é " + todayHolidays[0].name);
        response.status(200);
        console.log("Response sent.");
    } else {
        response.send("Não, hoje não é feriado");
        response.status(200);
        console.log("Response sent.");
    }
});

server.listen(4000);
console.log("Listening to PORT 4000.");