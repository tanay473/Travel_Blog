// travel-blog-backend/src/services/geminiService.js

let GoogleGenAI;
try {
  const genai = require('@google/genai');
  GoogleGenAI = genai.GoogleGenAI;
} catch (e) {
  console.log('Using standard AI fallback for Gemini service:', e.message);
}

/**
 * Heuristic fallback NLP tagging generator when Gemini API key is unconfigured or call fails
 */
function generateFallbackMetadata(title, excerpt = '', content = '') {
  const combinedText = `${title} ${excerpt} ${content}`.toLowerCase();
  
  // Extract key travel words
  const words = combinedText
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['this', 'that', 'with', 'from', 'have', 'were', 'which', 'their', 'there', 'about'].includes(w));
  
  const uniqueWords = Array.from(new Set(words));
  
  // Infer category
  let category = 'Adventure Travel';
  if (/beach|ocean|sea|coastal|island/i.test(combinedText)) category = 'Coastal & Islands';
  else if (/mountain|hike|trek|trail|peak|climb/i.test(combinedText)) category = 'Mountain & Outdoor';
  else if (/city|street|food|museum|culture|heritage|historic/i.test(combinedText)) category = 'Culture & Heritage';
  else if (/budget|backpacker|hostel|cheap/i.test(combinedText)) category = 'Budget Backpacking';
  else if (/resort|hotel|luxury|spa|villa/i.test(combinedText)) category = 'Luxury Getaways';

  // Capitalize top tags
  const nlpTags = uniqueWords.slice(0, 6).map(w => w.charAt(0).toUpperCase() + w.slice(1));
  if (!nlpTags.includes('Travel')) nlpTags.push('Travel');
  if (!nlpTags.includes(category.split(' ')[0])) nlpTags.push(category.split(' ')[0]);

  const seoKeywords = [
    `${title.toLowerCase()} travel guide`,
    `${category.toLowerCase()} tips`,
    `best places to visit in ${title.split(' ')[0] || 'destination'}`,
    `wanderlust travel blog`,
    `top travel recommendations`
  ];

  const cleanExcerpt = excerpt || content.slice(0, 150).replace(/\s+/g, ' ').trim();
  const metaDescription = `${title}: ${cleanExcerpt.slice(0, 140)}... Discover top local tips and recommendations.`;

  const wordCount = combinedText.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return {
    nlpTags: Array.from(new Set(nlpTags)),
    seoKeywords: Array.from(new Set(seoKeywords)),
    category,
    metaDescription,
    readingTime
  };
}

/**
 * Generate NLP tags and SEO metadata using Gemini API
 */
async function generateNlpMetadata(title, excerpt = '', content = '') {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || !GoogleGenAI) {
    console.log('[GeminiService] GEMINI_API_KEY not set or @google/genai unavailable. Using fallback NLP generator.');
    return generateFallbackMetadata(title, excerpt, content);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
You are an expert NLP content tagging and SEO optimization system for a high-traffic Travel Blog.
Analyze the following travel blog post and extract rich metadata to maximize search engine crawler indexing relevance:

TITLE: ${title}
EXCERPT: ${excerpt}
CONTENT: ${content}

Return ONLY a raw JSON object (no markdown formatting, no code block backticks) with the following structure:
{
  "nlpTags": ["5-8 specific semantic topic tags e.g. Alpine Hiking, Culinary Tour, Hidden Gems, Eco Tourism"],
  "seoKeywords": ["6-10 search query keywords/phrases e.g. best hiking trails in switzerland, budget europe travel 2026"],
  "category": "One overarching travel category (e.g. Adventure, Culture & Heritage, Beach & Coastal, Luxury & Wellness, Road Trip, Food & Culinary, Budget Backpacking)",
  "metaDescription": "A compelling 1-2 sentence search snippet (max 155 characters) packed with target keywords",
  "readingTime": integer read time in minutes
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const responseText = response.text.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '');
    const parsedData = JSON.parse(responseText);

    return {
      nlpTags: Array.isArray(parsedData.nlpTags) ? parsedData.nlpTags : ['Travel', 'Exploration'],
      seoKeywords: Array.isArray(parsedData.seoKeywords) ? parsedData.seoKeywords : ['travel guide'],
      category: parsedData.category || 'Adventure',
      metaDescription: parsedData.metaDescription || excerpt || title,
      readingTime: parsedData.readingTime || Math.max(1, Math.ceil((content.length + title.length) / 800))
    };
  } catch (error) {
    console.error('[GeminiService] Error calling Gemini API:', error.message);
    return generateFallbackMetadata(title, excerpt, content);
  }
}

module.exports = {
  generateNlpMetadata
};
