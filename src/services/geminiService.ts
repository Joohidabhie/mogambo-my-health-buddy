import { GoogleGenAI, GenerateContentResponse, VideoGenerationReferenceImage, VideoGenerationReferenceType } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateImage(prompt: string, aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "1:1") {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio,
          imageSize: "1K"
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  }

  async editImage(base64Image: string, prompt: string, mimeType: string = "image/png") {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType,
            },
          },
          { text: prompt },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  }

  async generateVideo(prompt: string, imageBase64?: string) {
    const config: any = {
      model: 'veo-3.1-fast-generate-preview',
      prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    };

    if (imageBase64) {
      config.image = {
        imageBytes: imageBase64.split(',')[1],
        mimeType: 'image/png',
      };
    }

    let operation = await this.ai.models.generateVideos(config);

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 5000));
      operation = await this.ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("Video generation failed");

    const response = await fetch(downloadLink, {
      method: 'GET',
      headers: {
        'x-goog-api-key': (this.ai as any).apiKey,
      },
    });

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
}

export const analyzeMeal = async (prompt: string, audioData?: string, imageData?: string) => {
  const apiKey = process.env.GEMINI_API_KEY || '';
  const ai = new GoogleGenAI({ apiKey });
  
  const contents: any = [];
  if (audioData) {
    contents.push({
      inlineData: {
        data: audioData.split(',')[1],
        mimeType: audioData.split(';')[0].split(':')[1],
      }
    });
    contents.push({ text: "Analyze the Indian meal described in this audio. Provide nutritional insights in JSON format." });
  } else if (imageData) {
    contents.push({
      inlineData: {
        data: imageData.split(',')[1],
        mimeType: imageData.split(';')[0].split(':')[1],
      }
    });
    contents.push({ text: "Analyze the Indian meal shown in this image. Provide nutritional insights in JSON format." });
  } else {
    contents.push({ text: `Analyze this Indian meal: "${prompt}". Provide nutritional insights in JSON format.` });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts: contents },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "object",
        properties: {
          dishName: { type: "string" },
          nutritionalScore: { type: "number" },
          proteinStatus: { type: "string" },
          fiberStatus: { type: "string" },
          carbQuality: { type: "string" },
          suggestions: { type: "array", items: { type: "string" } },
          familyInsights: {
            type: "object",
            properties: {
              mom: { type: "string" },
              dad: { type: "string" },
              child: { type: "string" },
              grandparent: { type: "string" }
            }
          }
        },
        required: ["dishName", "nutritionalScore", "proteinStatus", "fiberStatus", "carbQuality", "suggestions", "familyInsights"]
      }
    }
  });

  return JSON.parse(response.text);
};
