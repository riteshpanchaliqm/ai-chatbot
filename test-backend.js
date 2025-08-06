const axios = require('axios');

async function testBackend() {
  console.log('🔍 Testing Backend API...');
  
  try {
    // Test basic endpoint
    const response = await axios.get('https://ai-chatbot-backend-nmwf.onrender.com/');
    console.log('✅ Backend is responding:', response.data);
  } catch (error) {
    console.log('❌ Backend error:', error.message);
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    }
  }
}

testBackend(); 