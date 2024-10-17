import { faker } from '@faker-js/faker'

export async function fakerTime() {
    return {
        tecnico: faker.person.fullName(),
        nome: faker.company.name(),
        estadio: faker.location.street(),
        pais: faker.location.country(),
        local: faker.location.city(),
        anoFundacao: faker.date.past().getFullYear(),
        torcida: faker.company.name()
    }
}