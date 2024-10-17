import { requestPUT } from "../helpers/request"
import { pathTimes } from "../environment/paths"
import { fakerTime } from "../helpers/utilidades"

let _fakerTimeNaoDeve
describe('PUT - Alterar time', () => {

    beforeAll(async () => {
        _fakerTimeNaoDeve = await fakerTime()
    })

    it('PUT - Deve alterar todas as informações do time', async function () {
        const _fakerTime = await fakerTime()
        const _response = await requestPUT({
            path: `${pathTimes}/66d30a256e61f61c21c33172`,
            payload: {
                tecnico: _fakerTime.tecnico,
                nome: _fakerTime.nome,
                estadio: _fakerTime.estadio,
                pais: _fakerTime.pais,
                local: _fakerTime.local,
                anoFundacao: _fakerTime.anoFundacao,
                torcida: _fakerTime.torcida
            }
        })
        expect(_response.body).toMatchObject({
            tecnico: _fakerTime.tecnico,
            nome: _fakerTime.nome,
            estadio: _fakerTime.estadio,
            pais: _fakerTime.pais,
            local: _fakerTime.local,
            anoFundacao: _fakerTime.anoFundacao,
            torcida: _fakerTime.torcida
        })
    })

    it('PUT - Não deve alterar time sem argumento tecnico no payload', async function () {
        const _response = await requestPUT({
            path: `${pathTimes}/66d311d56e61f61c21c3317b`,
            payload: {
                tecnico: "",
                nome: _fakerTimeNaoDeve.nome,
                estadio: _fakerTimeNaoDeve.estadio,
                pais: _fakerTimeNaoDeve.pais,
                local: _fakerTimeNaoDeve.local,
                anoFundacao: _fakerTimeNaoDeve.anoFundacao,
                torcida: _fakerTimeNaoDeve.torcida
            },
            status: 400
        })
        expect(_response.body).toEqual({
            error: "Todos os campos são obrigatórios"
        })
    })

    it('PUT - Não deve alterar time sem argumento nome no payload', async function () {
        const _response = await requestPUT({
            path: `${pathTimes}/66d311d56e61f61c21c3317b`,
            payload: {
                tecnico: _fakerTimeNaoDeve.tecnico,
                nome: "",
                estadio: _fakerTimeNaoDeve.estadio,
                pais: _fakerTimeNaoDeve.pais,
                local: _fakerTimeNaoDeve.local,
                anoFundacao: _fakerTimeNaoDeve.anoFundacao,
                torcida: _fakerTimeNaoDeve.torcida
            },
            status: 400
        })
        expect(_response.body).toEqual({
            error: "Todos os campos são obrigatórios"
        })
    })

    it('PUT - Não deve alterar time sem argumento estadio no payload', async function () {
        const _response = await requestPUT({
            path: `${pathTimes}/66d311d56e61f61c21c3317b`,
            payload: {
                tecnico: _fakerTimeNaoDeve.tecnico,
                nome: _fakerTimeNaoDeve.mome,
                estadio: "",
                pais: _fakerTimeNaoDeve.pais,
                local: _fakerTimeNaoDeve.local,
                anoFundacao: _fakerTimeNaoDeve.anoFundacao,
                torcida: _fakerTimeNaoDeve.torcida
            },
            status: 400
        })
        expect(_response.body).toEqual({
            error: "Todos os campos são obrigatórios"
        })
    })

    it('PUT - Não deve alterar time sem argumento pais no payload', async function () {
        const _response = await requestPUT({
            path: `${pathTimes}/66d311d56e61f61c21c3317b`,
            payload: {
                tecnico: _fakerTimeNaoDeve.tecnico,
                nome: _fakerTimeNaoDeve.mome,
                estadio: _fakerTimeNaoDeve.estadio,
                pais: "",
                local: _fakerTimeNaoDeve.local,
                anoFundacao: _fakerTimeNaoDeve.anoFundacao,
                torcida: _fakerTimeNaoDeve.torcida
            },
            status: 400
        })
        expect(_response.body).toEqual({
            error: "Todos os campos são obrigatórios"
        })
    })

    it('PUT - Não deve alterar time sem argumento local no payload', async function () {
        const _response = await requestPUT({
            path: `${pathTimes}/66d311d56e61f61c21c3317b`,
            payload: {
                tecnico: _fakerTimeNaoDeve.tecnico,
                nome: _fakerTimeNaoDeve.mome,
                estadio: _fakerTimeNaoDeve.estadio,
                pais: _fakerTimeNaoDeve.pais,
                local: "",
                anoFundacao: _fakerTimeNaoDeve.anoFundacao,
                torcida: _fakerTimeNaoDeve.torcida
            },
            status: 400
        })
        expect(_response.body).toEqual({
            error: "Todos os campos são obrigatórios"
        })
    })

    it('PUT - Não deve alterar time sem argumento ano fundação no payload', async function () {
        const _response = await requestPUT({
            path: `${pathTimes}/66d311d56e61f61c21c3317b`,
            payload: {
                tecnico: _fakerTimeNaoDeve.tecnico,
                nome: _fakerTimeNaoDeve.mome,
                estadio: _fakerTimeNaoDeve.estadio,
                pais: _fakerTimeNaoDeve.pais,
                local: _fakerTimeNaoDeve.local,
                anoFundacao: "",
                torcida: _fakerTimeNaoDeve.torcida
            },
            status: 400
        })
        expect(_response.body).toEqual({
            error: "Todos os campos são obrigatórios"
        })
    })

    it('PUT - Não deve alterar time sem argumento torcida no payload', async function () {
        const _response = await requestPUT({
            path: `${pathTimes}/66d311d56e61f61c21c3317b`,
            payload: {
                tecnico: _fakerTimeNaoDeve.tecnico,
                nome: _fakerTimeNaoDeve.mome,
                estadio: _fakerTimeNaoDeve.estadio,
                pais: _fakerTimeNaoDeve.pais,
                local: _fakerTimeNaoDeve.local,
                anoFundacao: _fakerTimeNaoDeve.anoFundacao,
                torcida: ""
            },
            status: 400
        })
        expect(_response.body).toEqual({
            error: "Todos os campos são obrigatórios"
        })
    })

    it('PUT - Não deve alterar time que não existe na base', async function () {
        const _response = await requestPUT({
            path: `${pathTimes}/76d311d56e61f61c21c3317a`,
            payload: {
                tecnico: _fakerTimeNaoDeve.tecnico,
                nome: _fakerTimeNaoDeve.nome,
                estadio: _fakerTimeNaoDeve.estadio,
                pais: _fakerTimeNaoDeve.pais,
                local: _fakerTimeNaoDeve.local,
                anoFundacao: _fakerTimeNaoDeve.anoFundacao,
                torcida: _fakerTimeNaoDeve.torcida
            },
            status: 404
        })
        expect(_response.body).toEqual({
            error: "Time não encontrado"
        })
    })
})