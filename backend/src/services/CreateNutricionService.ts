import { DataProps } from "../controllers/CreateNutricionController";
import { GoogleGenerativeAI } from "@google/generative-ai";

class CreateNutricionService {
  async execute({
    name,
    age,
    gender,
    height,
    level,
    objective,
    weight,
  }: DataProps) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY!);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const response = await model.generateContent(
        // `Crie uma dieta completa para uma pessoa com nome: ${name} do sexo ${gender} com peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos e com foco e objetivo em ${objective}, atualmente nível de atividade: ${level} e ignore qualquer outro parametro que não seja os passados, retorne em json com as respectivas propriedades, propriedade nome o nome da pessoa, propriedade sexo com sexo, propriedade idade, propriedade altura, propriedade peso, propriedade objetivo com o objetivo atual, propriedade refeições com uma array contendo dentro cada objeto sendo uma refeição da dieta e dentro de cada refeição a propriedade horário com horário da refeição, propriedade nome com nome e a propriedade alimentos com array contendo os alimentos dessa refeição e pode incluir uma propreidade como suplementos contendo array com sugestão de suplemento que é indicado para o sexo dessa pessoa e o objetivo dela e não retorne nenhuma observação alem das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`
        `Crie uma dieta completa para uma pessoa com nome: ${name}, sexo: ${gender}, peso atual: ${weight}kg, altura: ${height}, idade: ${age} anos, nível de atividade: ${level} e objetivo: ${objective}. Antes de formular a dieta, faça um cálculo da TMB (Taxa Metabólica Basal) com base no peso, altura, idade e frequência de atividade física da pessoa, e utilize esse cálculo para formular a dieta personalizada. Retorne em JSON com as seguintes propriedades: nome, sexo, idade, altura, peso, objetivo e uma propriedade 'refeicoes', que é uma array contendo objetos para cada refeição da dieta. Cada objeto de refeição deve conter as propriedades: 'horario' (horário da refeição), 'nome' (nome da refeição), e 'alimentos' (array contendo os alimentos dessa refeição). Adicione também uma propriedade 'suplementos' contendo uma array de sugestões de suplemento de acordo com o sexo e objetivo da pessoa. Não retorne observações adicionais além das passadas no prompt `
      );
      console.log(JSON.stringify(response, null, 2));
      if (response.response && response.response.candidates) {
        const jsonText = response.response.candidates[0]?.content.parts[0]
          .text as string;

        //Extrair .JSON
        let jsonString = jsonText
          .replace(/```\w*\n/g, "")
          .replace(/\n```/g, "")
          .trim();
        let jsonObject = JSON.parse(jsonString);

        return { data: jsonObject };
      }

      return { ok: true };
    } catch (error) {
      console.error("Erro JSON: ", error);
      throw new Error("Failed create.");
    }
  }
}

export { CreateNutricionService };
