import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export default class GeneratorColor {
    static async generatorColor (ctx) {
        if (!configuration.apiKey) {
            ctx.status = 400
            ctx.body = json({
                code: 0,
                error: {
                    message: "OpenAI API key is required",
                }
            })
            return;
        }

        const color = ctx.request.body || '';
        if (color.trim().length === 0) {
            ctx.status = 400
            ctx.body = json({
                code: 0,
                error: {
                    message: "Please enter a valid color",
                }
            });
            return;
        }

        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: generateColorAsk(color),
                temperature: 0.6,
            });
            ctx.status = 200
            ctx.body = json({ result: completion.data.choices[0].text })
        } catch (error) {
            if (error.response) {
                console.error(error.response.status, error.response.data);
                ctx.status = error.response.status
                ctx.body = json(error.response.data)
            } else {
                console.error(`Error with OpenAI API request: ${error.message}`);
                ctx.status = 500
                ctx.body = json({
                    error: {
                        message: 'An error occurred during your request.',
                    }
                });
            }
        }
    }
}


function generateColorAsk (animal) {
    const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
