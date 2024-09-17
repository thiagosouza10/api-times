const TIMES = [
  {
    id: "66d1c322d32b4f3ed8a5208a",
    tecnico: "Ramón Díaz",
    nome: "Sport Club Corinthians Paulista",
    estadio: "Neo Química Arena",
    pais: "Brasil",
    local: "São Paulo",
    anoFundacao: "1910",
    torcida: "Gaviões da Fiel",
    __v: 0
  },
  {
    id: "66d1c4d2a19d1570eaa51f9c",
    tecnico: "Abel Ferreira",
    nome: "Palmeiras",
    estadio: "Allianz Parque",
    pais: "Brasil",
    local: "São Paulo",
    anoFundacao: "1914",
    torcida: "Mancha Verde",
    __v: 0
  },
];

module.exports = [
  {
    id: "get-times",
    url: "/api/times",
    method: "GET", 
    variants: [
      {
        id: "success", 
        type: "json", 
        options: {
          status: 200,
          body: TIMES,
        },
      },
      {
        id: "error",
        type: "json",
        options: {
          status: 400,
          body: {
            message: "Error",
          },
        },
      },
    ],
  },
  {
    id: "get-time",
    url: "/api/times/:id",
    method: "GET",
    variants: [
      {
        id: "success", 
        type: "middleware",
        options: {
          middleware: (req, res) => {
            const timeId = req.params.id;
            const time = TIMES.find((userData) => userData.id === String(timeId));
            if (time) {
              res.status(200);
              res.send(time);
            } else {
              res.status(404);
              res.send({
                message: "Time não encontrado",
              });
            }
          },
        },
      },
    ],
  },
];
