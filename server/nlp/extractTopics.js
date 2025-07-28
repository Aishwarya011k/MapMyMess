
const nlp = require('compromise');

function extractTopics(text) {
  // Use compromise to extract noun phrases
  const doc = nlp(text);
  // Get all noun phrases
  let nounPhrases = doc.nouns().out('array');

  // Remove duplicates and stopwords
  const stopwords = [
    'maybe', 'or', 'also', 'too', 'the', 'a', 'an', 'and', 'but', 'if', 'then', 'so', 'of', 'for', 'to', 'in', 'on', 'at', 'by', 'with', 'from', 'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'it', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'my', 'your', 'his', 'her', 'our', 'their', 'me', 'him', 'them', 'us', 'do', 'does', 'did', 'will', 'would', 'can', 'could', 'should', 'shall', 'may', 'might', 'must', 'not', 'no', 'yes', 'just', 'very', 'more', 'most', 'some', 'such', 'own', 'same', 'other', 'another', 'each', 'every', 'any', 'all', 'both', 'few', 'many', 'much', 'one', 'two', 'three', 'first', 'second', 'next', 'last', 'new', 'old', 'good', 'bad', 'great', 'best', 'worst', 'big', 'small', 'large', 'little', 'long', 'short', 'high', 'low', 'early', 'late', 'young', 'old', 'right', 'left', 'up', 'down', 'out', 'over', 'under', 'again', 'once', 'here', 'there', 'when', 'where', 'why', 'how'
  ];
  nounPhrases = nounPhrases
    .map(p => p.trim().toLowerCase())
    .filter(p => p && !stopwords.includes(p));

  // Remove duplicates
  nounPhrases = [...new Set(nounPhrases)];

  // Limit to top 8 phrases for clarity
  nounPhrases = nounPhrases.slice(0, 8);

  // Build nodes
  const nodes = nounPhrases.map((phrase, i) => ({ data: { id: phrase, label: phrase } }));

  // Build edges based on co-occurrence (simple: connect each phrase to the next)
  const edges = [];
  for (let i = 0; i < nounPhrases.length - 1; i++) {
    edges.push({ data: { source: nounPhrases[i], target: nounPhrases[i + 1] } });
  }

  return { nodes, edges };
}

module.exports = extractTopics;
