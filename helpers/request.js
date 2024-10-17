import request from "supertest"
require('dotenv').config()
const { addMsg } = require("jest-html-reporters/helper")

export async function requestPOST({ path, headers, payload, status = 200, contentType = 'application/json; charset=utf-8' }) {
    const _response = await request(process.env.BASE_URL)
        .post(path)
        .set(headers)
        .send(payload)
        .set('Accept', 'application/json')
    await addMsg({ message: JSON.stringify({ response: _response }, null, 2) })
    expect(_response.status).toEqual(status)
    return _response.body
}

export async function requestGET({ path, status = 200, contentType = 'application/json; charset=utf-8' }) {
    const _response = await request(process.env.BASE_URL)
        .get(path)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
    await addMsg({ message: JSON.stringify({ response: _response }, null, 2) })
    expect(_response.status).toEqual(status)
    return _response
}

export async function requestPUT({ path, payload, status = 200, contentType = 'application/json; charset=utf-8' }) {
    const _response = await request(process.env.BASE_URL)
        .put(path)
        .send(payload)
        .set('Accept', 'application/json')
        .set('Content-type', 'application/json')
    await addMsg({ message: JSON.stringify({ response: _response }, null, 2) })
    expect(_response.status).toEqual(status)
    return _response
}