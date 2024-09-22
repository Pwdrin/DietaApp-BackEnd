import fastify, {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import { CreateNutricionController } from "./controllers/CreateNutricionController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get("/teste", (request: FastifyRequest, reply: FastifyReply) => {
    let responseText =
      '```json\n{\n  "nome": "Pedro",\n  "sexo": "Masculino",\n  "idade": 21,\n  "altura": 1.80,\n  "peso": 60,\n  "objetivo": "Hipertrofia",\n  "refeiçoes": [\n    {\n      "horario": "08:00",\n      "nome": "Café da Manhã",\n      "alimentos": [\n        "2 fatias de pão integral",\n        "2 ovos mexidos",\n        "1 banana",\n        "200ml de leite desnatado"\n      ]\n    },\n    {\n      "horario": "10:00",\n      "nome": "Lanche da Manhã",\n        "alimentos": [\n          "1 iogurte grego natural",\n          "1 scoop de whey protein"\n        ]\n    },\n    {\n      "horario": "12:00",\n      "nome": "Almoço",\n      "alimentos": [\n        "150g de frango grelhado",\n        "1 xícara de arroz integral",\n        "1 xícara de brócolis cozido",\n        "Salada verde a vontade"\n      ]\n    },\n    {\n      "horario": "15:00",\n      "nome": "Lanche da Tarde",\n        "alimentos": [\n          "1 batata doce média",\n          "1 scoop de whey protein"\n        ]\n    },\n    {\n      "horario": "18:00",\n      "nome": "Jantar",\n      "alimentos": [\n        "150g de peixe grelhado",\n        "1 xícara de batata doce cozida",\n        "1 xícara de espinafre cozido",\n        "Salada verde a vontade"\n      ]\n    },\n    {\n      "horario": "21:00",\n      "nome": "Lanche da Noite",\n        "alimentos": [\n          "1 scoop de caseína"\n        ]\n    }\n  ],\n  "suplementos": [\n    "Whey Protein",\n    "Creatina",\n    "BCAA"\n  ]\n}\n```';

    try {
      //Extrair .JSON

      let jsonString = responseText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();
      let jsonObject = JSON.parse(jsonString);
      return reply.send({ data: jsonObject });
    } catch (error) {
      console.log(error);
    }

    reply.send({ ok: true });
  });
  fastify.post(
    "/create",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateNutricionController().handle(request, reply);
    }
  );
}
