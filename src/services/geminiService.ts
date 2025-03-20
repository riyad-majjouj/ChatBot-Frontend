
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const API_URL = 'http://localhost:5000/api/gemini/chat';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Backend API error:', errorData);
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error calling backend API:', error);
    return "Sorry, there was an error processing your request. Please try again later.";
  }
};
