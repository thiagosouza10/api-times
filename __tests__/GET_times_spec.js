import { requestGET } from "../helpers/request"
import { pathTimes } from "../environment/paths"


describe('GET - Obter times', () => {

    it('GET - Deve obter todos os times', async function () {
        await requestGET({
            path: pathTimes
        })
    })

    it('GET - Deve retornar os dados do time do Coringão pelo ID', async function () {
        const _IdCorinthians = '66d1c322d32b4f3ed8a5208a'
        const _response = await requestGET({
            path: `${pathTimes}/${_IdCorinthians}`
        })
        expect(_response.body).toEqual(
            {
                _id: _IdCorinthians,
                tecnico: "Ramón Díaz",
                nome: "Sport Club Corinthians Paulista",
                estadio: "Neo Química Arena",
                pais: "Brasil",
                local: "São Paulo",
                anoFundacao: 1910,
                torcida: "Gaviões da Fiel",
                __v: 0
            }
        )
    })

    it('GET - Não deve retorna time que não existe na base', async function () {
        const _IdInexistente = '66d1c322d32b4f3ed8a5208b'
        const _response = await requestGET({
            path: `${pathTimes}/${_IdInexistente}`,
            status: 404
        })
        expect(_response.body).toEqual(
            {
                error: "Time não encontrado",
                id: _IdInexistente,
                message: `O time com o ID ${_IdInexistente} não foi encontrado na base de dados.`
            }
        )
    })

    it('GET - Não deve retorna time com ID incorreto', async function () {
        const _IdInexistente = '66d1c322d32b4f3ed8a5208bbbbbbbbbbbb'
        const _response = await requestGET({
            path: `${pathTimes}/${_IdInexistente}`,
            status: 500
        })
        expect(_response.body).toEqual(
            {
                error: "Erro ao buscar time"
            }
        )
    })
})