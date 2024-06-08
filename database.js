import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
}).promise()

export async function getMedias(){
    const [result] = await pool.query("SELECT * FROM media")
    return result
}


export async function getMedia(id){
    const [result] = await pool.query(
        `
        SELECT * FROM media 
        WHERE id = ?
        `,[id])
    return result
}

export async function createMedia(title){
    const [result] = await pool.query(
        `
        INSERT INTO media (title) VALUES (?)
        `,[title])

        const id = result.insertId
    return getMedia(id)
}


const media = await createMedia('teste')
console.log(media)



