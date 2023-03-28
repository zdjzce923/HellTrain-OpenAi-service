import { Configuration, OpenAIApi } from "openai";
import json from 'koa-json'
const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);
export default class GeneratorColor {
    static async generatorColor (ctx) {
        if (!configuration.apiKey || !ctx.request.body) {
            ctx.status = 400
            ctx.body = {
                code: 0,
                error: {
                    message: "OpenAI API key is required",
                }
            }
            return;
        }
        const { color, colorType } = ctx.request.body
        if (!colorType) {
            ctx.status = 400
            ctx.body = {
                code: 0,
                error: {
                    message: "colorType is required",
                }
            };
            return;
        }

        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: generateColorAsk(color, colorType),
                temperature: 0.6,
            });
            ctx.status = 200
            ctx.body = { result: completion.data.choices[0].text }
        } catch (error) {
            if (error.response) {
                console.error(error.response.status, error.response.data);
                ctx.status = error.response.status
                ctx.body = error.response.data
            } else {
                console.error(`Error with OpenAI API request: ${error.message}`);
                ctx.status = 500
                ctx.body = {
                    code: 0,
                    error: {
                        message: 'An error occurred during your request.',
                    }
                };
            }
        }
    }
}


function generateColorAsk (color, colorType) {
    return `请生成一组与${color}颜色相近的${colorType}色调`;
}
