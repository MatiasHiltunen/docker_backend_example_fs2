
import postgres from "postgres";


const sql = postgres({
    database: "example",
    username: "postgres",
    password: "super_salainen_salasana",
    host: "127.0.0.1",
    port: 5432
})



export default sql