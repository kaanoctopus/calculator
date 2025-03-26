export async function evaluateExpression(expression) {
    const response = await fetch('https://calcbackend.netlify.app/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expression }),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Calculation error');
    return data.result;
  }
  