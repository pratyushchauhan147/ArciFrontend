// This helper function is dedicated to generating the SVG.
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

/**
 * Calls the Gemini API to generate an SVG floor plan from a text prompt.
 * @param {string} prompt The user's description of the floor plan.
 * @returns {Promise<string>} A promise that resolves with the clean SVG string.
 */
export const generateSvg = async (prompt) => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your .env file.");
  }

  const masterPrompt = `You are an expert architectural AI designer and SVG illustrator. Your task is to convert a user's request into a single, clean, professional, and readable 2D floor plan SVG, following strict architectural principles.

**User's Design Request:**
"${prompt}"

**Strict Architectural & Design Principles (You MUST follow all of these):**
1.  **Core Layout:** Create a central hub (Living Room). All bedrooms and the entrance must connect to it.
2.  **Mandatory Rooms:** Must include one "Kitchen" and one "Bathroom".
3.  **Visual Style:** White background, black walls, and professional pastel colors for rooms.
4.  **SVG Technical Rules:** Must be a complete SVG tag with xmlns, width, height, viewBox, and centered text labels for each room.
5.  **Final Output:** Your response MUST be ONLY the raw SVG code. No explanations or markdown.`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: masterPrompt }] }] }),
  });

  if (!response.ok) {
    const result = await response.json();
    const errorDetails = result?.error?.message || JSON.stringify(result);
    throw new Error(`API error: ${response.status} - ${errorDetails}`);
  }

  const result = await response.json();
  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  
  const match = text?.match(/<svg.*?>.*?<\/svg>/s);
  if (match && match[0]) {
    return match[0];
  } else {
    throw new Error("Could not extract a valid SVG from the API response.");
  }
};