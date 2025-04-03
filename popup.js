document.getElementById("check-button").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = new URL(tab.url);
    const domain = url.hostname;
  
    
    const API_KEY = "your api key goes here"; // Replace securely in production
    const apiUrl = `https://api.ip2whois.com/v2?key=${API_KEY}&domain=${domain}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Extract relevant data
      const creationDate = data.created || "N/A";
      const expirationDate = data.expires || "N/A";
      const registrar = data.registrar || "N/A";
  
      // Determine if the domain is suspicious
      const isFresh = new Date().getFullYear() - new Date(creationDate).getFullYear() < 1;
  
      // Display results
      const resultElement = document.getElementById("result");
      resultElement.innerHTML = `
        <strong>Domain:</strong> ${domain}<br>
        <strong>Created:</strong> ${creationDate}<br>
        <strong>Expires:</strong> ${expirationDate}<br>
        <strong>Registrar:</strong> ${registrar}<br>
        <strong>Fresh Domain (Likely Scam):</strong> ${isFresh ? "Yes" : "No"}
      `;
    } catch (error) {
      console.error("Error fetching IP2WHOIS data:", error);
      document.getElementById("result").textContent = "Error fetching data. Please try again.";
    }
  });
  