
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const API_KEY = "AIzaSyBUji4ieGWpZT8Qvi2LfHr5nmvPlP6tAMM";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini API response:', JSON.stringify(data, null, 2));
    
    // Extract the response text from the Gemini API response
    if (data.candidates && 
        data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('Unexpected response structure:', data);
      return "I'm sorry, I couldn't generate a response. Please try again.";
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "Sorry, there was an error processing your request. Please try again later.";
  }
};
