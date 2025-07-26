const natural = require('natural');

function extractTopics(text) {
  const tokenizer = new natural.WordTokenizer();
  const words = tokenizer.tokenize(text.toLowerCase());
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(words);

  // Get top 5 keywords
  let keywords = [];
  tfidf.listTerms(0).slice(0, 5).forEach(item => {
    keywords.push(item.term);
  });

  // Simple node/edge structure
  const nodes = keywords.map((k, i) => ({ data: { id: k, label: k } }));
  const edges = [];
  for (let i = 1; i < keywords.length; i++) {
    edges.push({ data: { source: keywords[0], target: keywords[i] } });
  }

  return { nodes, edges };
}

module.exports = extractTopics;
