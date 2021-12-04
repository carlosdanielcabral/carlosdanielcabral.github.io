// endpoint: "https://api.mercadolibre.com/sites/MLB/search?q=$QUERY"

const fetchProducts = async (query) => {
  const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
