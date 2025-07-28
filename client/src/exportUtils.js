// Utility for exporting Cytoscape mind map as PNG
export function exportCytoscapePng(cy, filename = 'mindmap.png') {
  if (!cy) return;
  const png = cy.png({ full: true, scale: 2 });
  const link = document.createElement('a');
  link.href = png;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Utility for exporting as JSON
export function exportMindMapJson(mindMap, filename = 'mindmap.json') {
  const blob = new Blob([JSON.stringify(mindMap, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
