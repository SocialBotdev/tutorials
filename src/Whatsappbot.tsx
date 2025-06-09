import  { useState } from 'react';
import type { ChangeEvent } from 'react';

import Badge from './components/Badge';
import Card from './components/Card';
import AccordionItem from './components/AccordianItem';
import Tabs from './components/Tabs';
import Input from './components/Input';
import Button from './components/Button';
import Textarea from './components/Textarea';
import CodeBlock from './components/CodeBlock';
import ReadingProgressBar from './components/ReadingProgressBar';



// Main App Component
const Whatsappbot = () => {
  const [activeCodeTab, setActiveCodeTab] = useState('python');
  const [userMessage, setUserMessage] = useState('');
  const [chatOutput, setChatOutput] = useState('');

  // Simulate a simple chatbot response based on the message
  const handleSendMessage = () => {
    if (userMessage.trim() === '') {
      setChatOutput('Please type a message.');
      return;
    }
    const message = userMessage.toLowerCase();
    let reply;
    if (message === "hello") {
      reply = "Hi! How can I help you? (This is a simulated response)";
    } else {
      reply = `You said: "${userMessage}". (Simulated reply based on your input)`;
    }
    setChatOutput(`User: ${userMessage}\nBot: ${reply}`);
    setUserMessage(''); // Clear input after sending
  };
  return (
    <div className="font-sans antialiased bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <ReadingProgressBar />
        <header className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
          Mastering the WhatsApp Cloud API <Badge className="bg-blue-200 text-blue-800 ml-2 align-middle p-4">Interactive Tutorial</Badge>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
          Unlock the power of WhatsApp messaging for your applications. This step-by-step tutorial will guide you through building your first chatbot.
        </p>
        <div className="flex items-center justify-center mt-6 text-sm text-gray-600">
          <span className="flex items-center mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            20 min read
          </span>
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Beginner friendly
          </span>
        </div>
      </header>      <main className="max-w-5xl mx-auto">
        <div className="lg:flex lg:gap-10 relative">
          {/* Sticky Table of Contents - Hidden on mobile */}
          {/* <div className="hidden lg:block sticky top-24 self-start w-64 flex-shrink-0">
            <TableOfContents className="bg-white bg-opacity-75 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-100" />
          </div> */}
        </div>
          
          {/* Main Content */}
          <div className="flex-grow space-y-10">
            {/* Core Concepts Section */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            Core Concepts <span className="ml-3 text-blue-500">💡</span>
          </h2>
          <AccordionItem title="What is WhatsApp Cloud API?">
            <p className="mb-2">
              The WhatsApp Cloud API is Meta’s official, cloud-hosted API that allows businesses to integrate WhatsApp messaging directly into their own applications and systems.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>It enables you to send and receive messages programmatically.</li>
              <li>You can automate replies, build sophisticated chatbots, and integrate with CRM systems.</li>
              <li>Crucially, it eliminates the need for you to host your own WhatsApp Business API client or rely solely on third-party Business Solution Providers (BSPs) for basic functionality.</li>
            </ul>
          </AccordionItem>
          <AccordionItem title="How Does It Work?">
            <p className="mb-2">
              Think of it like a highly efficient post office for your application's WhatsApp messages.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Your Application ↔ WhatsApp Cloud API:</strong> Your backend (e.g., Python, Node.js) communicates securely with WhatsApp Cloud API endpoints over HTTPS. You send messages by making API calls.</li>
              <li><strong>Webhooks (The "Mailbox"):</strong> When a user sends a message to your WhatsApp Business number, Meta doesn't send it directly to your application. Instead, it sends an HTTP POST request (a "webhook") containing the message data to a specific URL you've configured on your server. This URL acts as your dedicated "mailbox" for incoming messages.</li>
              <li><strong>Replying to Messages:</strong> Once your server receives and processes an incoming message via the webhook, it constructs a reply. This reply is then sent back to the user by making another API call to the WhatsApp Cloud API's message endpoint, authenticated with your unique access token.</li>
            </ul>
            <p className="mt-3 text-sm text-gray-500 italic">
              This asynchronous webhook-based communication is fundamental to building responsive chatbots.
            </p>
          </AccordionItem>
        </Card>

        {/* Requirements Section */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            Essential Requirements <span className="ml-3 text-green-500">✅</span>
          </h2>
          <ul className="space-y-4 text-gray-700">
            <li>
              <strong className="text-gray-800">Meta Developer Account & Facebook App:</strong> This is your gateway to Meta's developer tools, where you'll manage your apps and access various Meta products, including WhatsApp.
            </li>
            <li>
              <strong className="text-gray-800">WhatsApp Business Account & Phone Number:</strong> You need a dedicated WhatsApp Business Account and an associated phone number that will be used for sending and receiving messages via the API. This number cannot be your personal WhatsApp number.
            </li>
            <li>
              <strong className="text-gray-800">Cloud API Access Token:</strong> This is a crucial security credential obtained from your Meta dashboard. It authenticates your application's requests to the WhatsApp Cloud API. <Badge className="bg-red-100 text-red-800">Keep this token secret!</Badge>
            </li>
            <li>
              <strong className="text-gray-800">Publicly Accessible Webhook Endpoint:</strong> Your server needs a URL that WhatsApp can reach over the internet to send you incoming messages. For local development, tools like <a href="https://ngrok.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">ngrok</a> are indispensable as they create a secure tunnel from the internet to your local machine.
            </li>
          </ul>
        </Card>

        {/* Step-by-Step Section */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            Step-by-Step: Building Your First Chatbot <span className="ml-3 text-yellow-500">🚀</span>
          </h2>

          <h3 className="text-2xl font-semibold text-gray-700 mb-4">1. Set Up WhatsApp Cloud API in Meta</h3>
          <p className="mb-4 text-gray-700 leading-relaxed">
            This is the initial configuration you'll do on the Meta Developer platform.
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 pl-4">
            <li>Go to <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Meta for Developers</a> and log in.</li>
            <li>Create a new application if you don't have one.</li>
            <li>Add the "WhatsApp" product to your newly created or existing app.</li>
            <li>Follow the prompts to set up a WhatsApp Business Account (or select an existing one).</li>
            <li>From your WhatsApp dashboard within the Meta Developer App, you'll find your <strong>temporary access token</strong> and <strong>phone number ID</strong>. Copy these as you'll need them for your server.</li>
            <li>Configure your <strong>webhook URL</strong> in the Meta dashboard. During local development, this will be the URL provided by ngrok.</li>
          </ol>

          <h3 className="text-2xl font-semibold text-gray-700 my-6">2. Basic Chatbot Logic (Backend Implementation)</h3>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Now, let's build the backend that will respond to WhatsApp messages. The core idea is simple: your server receives a message, processes it, and sends a reply.
          </p>
          <div className="bg-gray-100 p-5 rounded-lg shadow-inner mb-6">
            <h4 className="font-semibold text-gray-800 mb-3 text-lg">The Chatbot Flow:</h4>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              <li>User sends a message to your WhatsApp Business number.</li>
              <li>Meta receives the message and sends an HTTP POST request (webhook) to your configured webhook URL.</li>
              <li>Your server receives and parses this JSON payload to extract the message content and sender's number.</li>
              <li>Your server applies simple logic (e.g., if the message is "hello", reply "Hi!") to decide on a response.</li>
              <li>Your server sends an HTTP POST request to the WhatsApp Cloud API's messages endpoint with the reply text, using your access token for authentication.</li>
            </ol>
          </div>

          <h3 className="text-2xl font-semibold text-gray-700 my-6">Code Examples: Python (Flask) vs. Node.js (Express)</h3>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Choose your preferred language and follow the steps to build your webhook server.
          </p>
          <Tabs
            activeTab={activeCodeTab}
            onTabChange={setActiveCodeTab}
            tabs={[
              {
                id: 'python',
                label: 'Python (Flask)',
                content: (
                  <>
                    <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-xl">Step 2.1: Basic Setup & Environment Variables</h4>
                    <p className="mb-3 text-gray-700">
                      Start by importing necessary modules and setting up your Flask app. It's crucial to load sensitive tokens from environment variables, especially for production.
                    </p>
                    <CodeBlock language="python" title="Flask Initial Setup">
                      {`from flask import Flask, request
import requests
import os
from dotenv import load_dotenv # Import to load .env file

load_dotenv() # Load environment variables from .env file

app = Flask(__name__)

# Load your credentials from environment variables
WHATSAPP_TOKEN = os.getenv("WHATSAPP_TOKEN")
PHONE_NUMBER_ID = os.getenv("PHONE_NUMBER_ID")
VERIFY_TOKEN = os.getenv("VERIFY_TOKEN") # Custom token for webhook verification

print(f"Loaded PHONE_NUMBER_ID: {PHONE_NUMBER_ID}")
# For security, avoid printing WHATSAPP_TOKEN directly
`}
                    </CodeBlock>

                    <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-xl">Step 2.2: Handle Incoming Messages (POST Webhook)</h4>
                    <p className="mb-3 text-gray-700">
                      This is the main endpoint where WhatsApp will send user messages. Your app will parse the incoming JSON and decide on a reply.
                    </p>
                    <CodeBlock language="python" title="Flask POST Webhook for Messages">
                      {`# ... (previous code for setup) ...

@app.route('/webhook', methods=['POST'])
def webhook():
    """
    Handles incoming webhook requests from WhatsApp.
    Parses messages and sends a simple reply.
    """
    data = request.get_json()
    print("Incoming WhatsApp Webhook Data:", data) # Log data for debugging

    # Ensure webhook is from WhatsApp and contains messages
    if not data or 'entry' not in data or not data['entry']:
        print("Webhook data malformed or not an entry.")
        return "OK", 200 # Acknowledge non-message webhooks (e.g., status updates)

    try:
        # Navigate through the complex JSON structure to find the message
        # This structure is standard for WhatsApp Cloud API webhooks
        message_entry = data['entry'][0]['changes'][0]['value']
        if 'messages' not in message_entry:
            print("No messages found in webhook entry.")
            return "OK", 200 # Acknowledge status updates, etc.

        message = message_entry['messages'][0]
        from_number = message['from'] # The user's WhatsApp number
        text_body = message['text']['body'] # The actual message text

        print(f"Message from {from_number}: {text_body}")

        # --- Simple Chatbot Logic ---
        if text_body.lower() == "hello":
            reply_text = "Hi! How can I help you today? (from Python chatbot)"
        elif "api" in text_body.lower():
            reply_text = "The WhatsApp Cloud API helps you integrate messaging. Ask me about requirements!"
        else:
            reply_text = f"You said: '{text_body}'. I'm a simple bot, try saying 'hello'!"

        # --- Send Reply via WhatsApp Cloud API ---
        url = f"https://graph.facebook.com/v19.0/{PHONE_NUMBER_ID}/messages"
        headers = {
            "Authorization": f"Bearer {WHATSAPP_TOKEN}", # Authenticate with your token
            "Content-Type": "application/json"
        }
        payload = {
            "messaging_product": "whatsapp", # Specifies the messaging product
            "to": from_number,              # Recipient's WhatsApp number
            "type": "text",                 # Type of message (e.g., text, image, template)
            "text": {"body": reply_text}    # The message content
        }

        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status() # Raise an exception for bad status codes (4xx or 5xx)
        print("Message sent successfully:", response.json())

    except KeyError as e:
        print(f"KeyError: Missing expected JSON key: {e}. Check webhook payload structure.")
    except requests.exceptions.RequestException as e:
        print(f"HTTP Request failed: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    
    return "OK", 200 # Always return 200 OK to WhatsApp, even on error (to avoid retry loops)
`}
                    </CodeBlock>

                    <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-xl">Step 2.3: Implement Webhook Verification (GET Request)</h4>
                    <p className="mb-3 text-gray-700">
                      Before Meta sends any messages, it verifies your webhook URL by sending a `GET` request. You must respond with the `hub.challenge` token.
                    </p>
                    <CodeBlock language="python" title="Flask GET Webhook for Verification">
                      {`# ... (previous code for POST webhook) ...

@app.route('/webhook', methods=['GET'])
def verify_webhook():
    """
    Handles the webhook verification GET request from WhatsApp.
    """
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")

    # Check if a token and mode were sent
    if mode and token:
        # Check the mode and verify_token to make sure they are correct
        # The VERIFY_TOKEN should match what you set in Meta dashboard
        if mode == "subscribe" and token == VERIFY_TOKEN:
            print("WEBHOOK_VERIFIED")
            return challenge, 200 # Send back the challenge token
        else:
            # Responds with '403 Forbidden' if verify tokens do not match
            print("Verification token mismatch!")
            return "Verification token mismatch", 403
    print("Missing parameters for verification.")
    return "Missing parameters", 400

`}
                    </CodeBlock>

                    <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-xl">Step 2.4: Run Your Flask Application</h4>
                    <p className="mb-3 text-gray-700">
                      Finally, run your Flask application. For local development, port 5000 is common.
                    </p>
                    <CodeBlock language="python" title="Run Flask App">
                      {`# ... (all previous code) ...

if __name__ == "__main__":
    # For local development, run on port 5000
    # In production, use a WSGI server like Gunicorn/Waitress
    print("Starting Flask app on port 5000...")
    app.run(port=5000, debug=True) # debug=True enables auto-reloading and better error messages
`}
                    </CodeBlock>

                    <h4 className="font-semibold text-gray-700 mt-6 mb-4 text-xl">How to Test Your Python (Flask) App:</h4>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700">
                      <li><strong>Install Flask and Requests:</strong> Open your terminal and navigate to your project directory.
                        <CodeBlock language="bash" title="Install Dependencies">
                          pip install Flask requests python-dotenv
                        </CodeBlock>
                      </li>
                      <li><strong>Create a `.env` file:</strong> In the same directory as your Python script (e.g., `app.py`), create a file named `.env` and add your credentials. Replace the placeholder values with your actual tokens from Meta.
                        <CodeBlock language="plaintext" title=".env Example">
                          WHATSAPP_TOKEN="YOUR_ACTUAL_WHATSAPP_CLOUD_API_TOKEN"
                          PHONE_NUMBER_ID="YOUR_ACTUAL_WHATSAPP_PHONE_NUMBER_ID"
                          VERIFY_TOKEN="YOUR_CHOSEN_VERIFY_TOKEN_FOR_WEBHOOK_SETUP"
                        </CodeBlock>
                      </li>
                      <li><strong>Run your Flask app:</strong> Execute your Python script from the terminal.
                        <CodeBlock language="bash" title="Run Flask App">
                          python app.py
                        </CodeBlock>
                      </li>
                      <li><strong>Expose your local server with ngrok:</strong> Open a *new* terminal window and run ngrok.
                        <CodeBlock language="bash" title="Run ngrok">
                          ngrok http 5000
                        </CodeBlock>
                        ngrok will give you a public URL (e.g., `https://abcdef12345.ngrok.io`).</li>
                      <li><strong>Set Webhook in Meta Dashboard:</strong> Go back to your WhatsApp product settings in <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Meta for Developers</a>. Set the `ngrok` URL (e.g., `https://abcdef12345.ngrok.io/webhook`) as your webhook URL. Also, ensure the "Verify token" field in the Meta dashboard matches the `VERIFY_TOKEN` you set in your `.env` file.</li>
                      <li><strong>Test!</strong> Send a message (e.g., "hello", "api", or anything else) to your WhatsApp Business number from your personal WhatsApp. Observe the output in your Flask terminal for logs and, if all is set up correctly, expect a reply!</li>
                    </ol>
                  </>
                ),
              },
              {
                id: 'nodejs',
                label: 'Node.js (Express)',
                content: (
                  <>
                    <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-xl">Step 2.1: Basic Setup & Environment Variables</h4>
                    <p className="mb-3 text-gray-700">
                      Start by importing necessary modules and setting up your Express app. It's crucial to load sensitive tokens from environment variables, especially for production.
                    </p>
                    <CodeBlock language="javascript" title="Node.js Initial Setup">
                      {`const express = require('express');
const axios = require('axios');

require('dotenv').config(); // Loads environment variables from .env file

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

// Load your credentials from environment variables
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN; // Custom token for webhook verification

console.log(\`Loaded PHONE_NUMBER_ID: \${PHONE_NUMBER_ID}\`);
// For security, avoid printing WHATSAPP_TOKEN directly
`}
                    </CodeBlock>

                    <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-xl">Step 2.2: Handle Incoming Messages (POST Webhook)</h4>
                    <p className="mb-3 text-gray-700">
                      This is the main endpoint where WhatsApp will send user messages. Your app will parse the incoming JSON and decide on a reply.
                    </p>
                    <CodeBlock language="javascript" title="Express POST Webhook for Messages">
                      {`// ... (previous code for setup) ...

app.post('/webhook', async (req, res) => {
  console.log("Incoming WhatsApp Webhook Body:", JSON.stringify(req.body, null, 2));

  // Ensure webhook is from WhatsApp and contains messages
  if (!req.body || !req.body.entry || !req.body.entry[0] || !req.body.entry[0].changes) {
    console.log("Webhook data malformed or not an entry.");
    return res.sendStatus(200); // Acknowledge non-message webhooks (e.g., status updates)
  }

  try {
    // Navigate through the complex JSON structure to find the message
    const change = req.body.entry[0].changes[0];
    if (change.field !== 'messages' || !change.value.messages) {
        console.log("No messages found in webhook entry.");
        return res.sendStatus(200); // Acknowledge status updates, etc.
    }

    const message = change.value.messages[0];
    const from = message.from;       // The user's WhatsApp number
    const textBody = message.text.body; // The actual message text

    console.log(\`Message from \${from}: \${textBody}\`);

    // --- Simple Chatbot Logic ---
    let replyText;
    if (textBody.toLowerCase() === "hello") {
      replyText = "Hi! How can I help you today? (from Node.js chatbot)";
    } else if (textBody.toLowerCase().includes("api")) {
      replyText = "The WhatsApp Cloud API helps you integrate messaging. Ask me about requirements!";
    } else {
      replyText = \`You said: "\${textBody}". I'm a simple bot, try saying 'hello'!\`;
    }

    // --- Send Reply via WhatsApp Cloud API ---
    await axios.post(
      \`https://graph.facebook.com/v19.0/\${PHONE_NUMBER_ID}/messages\`,
      {
        messaging_product: "whatsapp", // Specifies the messaging product
        to: from,                      // Recipient's WhatsApp number
        type: "text",                  // Type of message (e.g., text, image, template)
        text: { body: replyText }      // The message content
      },
      {
        headers: {
          Authorization: \`Bearer \${WHATSAPP_TOKEN}\`, // Authenticate with your token
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Message sent successfully!");

  } catch (error) {
    console.error("Error processing webhook or sending message:", error.response ? error.response.data : error.message);
  }
  res.sendStatus(200); // Always return 200 OK to WhatsApp, even on error
});
`}
                    </CodeBlock>

                    <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-xl">Step 2.3: Implement Webhook Verification (GET Request)</h4>
                    <p className="mb-3 text-gray-700">
                      Before Meta sends any messages, it verifies your webhook URL by sending a `GET` request. You must respond with the `hub.challenge` token.
                    </p>
                    <CodeBlock language="javascript" title="Express GET Webhook for Verification">
                      {`// ... (previous code for POST webhook) ...

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge); // Send back the challenge token
    } else {
      console.log("Verification token mismatch!");
      res.sendStatus(403); // Forbidden
    }
  } else {
    console.log("Missing parameters for verification.");
    res.sendStatus(400); // Bad Request
  }
});
`}
                    </CodeBlock>

                    <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-xl">Step 2.4: Run Your Node.js Application</h4>
                    <p className="mb-3 text-700">
                      Finally, run your Node.js application. For local development, port 5000 is common.
                    </p>
                    <CodeBlock language="javascript" title="Run Node.js App">
                      {`// ... (all previous code) ...

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server is running on port \${PORT}\`));
`}
                    </CodeBlock>

                    <h4 className="font-semibold text-gray-700 mt-6 mb-4 text-xl">How to Test Your Node.js (Express) App:</h4>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700">
                      <li><strong>Initialize Node.js project & install packages:</strong> Open your terminal and navigate to your project directory.
                        <CodeBlock language="bash" title="Initialize and Install">
                          npm init -y
                          npm install express axios dotenv
                        </CodeBlock>
                      </li>
                      <li><strong>Create a `.env` file:</strong> In the same directory as your Node.js script (e.g., `index.js`), create a file named `.env` and add your credentials. Replace the placeholder values with your actual tokens from Meta.
                        <CodeBlock language="plaintext" title=".env Example">
                          WHATSAPP_TOKEN="YOUR_ACTUAL_WHATSAPP_CLOUD_API_TOKEN"
                          PHONE_NUMBER_ID="YOUR_ACTUAL_WHATSAPP_PHONE_NUMBER_ID"
                          VERIFY_TOKEN="YOUR_CHOSEN_VERIFY_TOKEN_FOR_WEBHOOK_SETUP"
                        </CodeBlock>
                      </li>
                      <li><strong>Run your Node.js app:</strong> Execute your Node.js script from the terminal.
                        <CodeBlock language="bash" title="Run Node.js App">
                          node index.js
                        </CodeBlock>
                      </li>
                      <li><strong>Expose your local server with ngrok:</strong> Open a *new* terminal window and run ngrok.
                        <CodeBlock language="bash" title="Run ngrok">
                          ngrok http 5000
                        </CodeBlock>
                        ngrok will give you a public URL (e.g., `https://abcdef12345.ngrok.io`).</li>
                      <li><strong>Set Webhook in Meta Dashboard:</strong> Go back to your WhatsApp product settings in <a href="https://developers.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Meta for Developers</a>. Set the `ngrok` URL (e.g., `https://abcdef12345.ngrok.io/webhook`) as your webhook URL. Also, ensure the "Verify token" field in the Meta dashboard matches the `VERIFY_TOKEN` you set in your `.env` file.</li>
                      <li><strong>Test!</strong> Send a message (e.g., "hello", "api", or anything else) to your WhatsApp Business number from your personal WhatsApp. Observe the output in your Node.js terminal for logs and, if all is set up correctly, expect a reply!</li>
                    </ol>
                  </>
                ),
              },
            ]}
          />
        </Card>

        {/* Interactive Chatbot Simulator */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            Try It Out! (Simulated Chatbot) <span className="ml-3 text-purple-500">🤖</span>
          </h2>
          <p className="mb-5 text-gray-700 leading-relaxed">
            See the basic "if-else" logic in action. Type a message and hit "Send" to get a simulated bot response! This helps you understand the core of a message handler.
          </p>
          <div className="flex flex-col space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Type 'hello' or any other message..."
                value={userMessage}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUserMessage(e.target.value)}
                className="w-full text-base"
              />
              
            </div>
            <Button onClick={handleSendMessage} disabled={!userMessage.trim()}>
              Send Message (Simulated)
            </Button>
            <div>
              <Textarea
                placeholder="Bot's response will appear here..."
                value={chatOutput}
                onChange={() => {}} // Read-only
                className="w-full bg-gray-100 font-mono text-gray-800 text-base"
              />
              
            </div>
          </div>
          <p className="mt-5 text-sm text-gray-500 italic">
            This simulation runs entirely in your browser and does not connect to the actual WhatsApp Cloud API. It demonstrates the basic logic.
          </p>
        </Card>

        {/* Key Points & Best Practices Section */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            Key Points & Best Practices <span className="ml-3 text-indigo-500">✨</span>
          </h2>
          <ul className="list-disc list-inside space-y-4 text-gray-700">
            <li>
              <strong className="font-semibold text-gray-800">Security First:</strong> Always keep your WhatsApp Cloud API access token highly secure. Never expose it in client-side code or commit it directly to version control. Use environment variables (as demonstrated in the code).
            </li>
            <li>
              <strong className="font-semibold text-gray-800">Webhook Verification:</strong> Implement the `GET` challenge-response mechanism for webhook verification (as shown in Step 2.3 of the code examples). This is crucial for Meta to confirm your webhook URL is legitimate and secure.
            </li>
            <li>
              <strong className="font-semibold text-gray-800">Explore Message Types:</strong> Beyond simple text, the Cloud API supports rich message types like media messages (images, videos), templates (for outbound notifications and highly structured content), and interactive messages (lists, reply buttons). Diversify your chatbot's capabilities!
            </li>
            <li>
              <strong className="font-semibold text-gray-800">Scalability by Design:</strong> Since the WhatsApp Cloud API is hosted and managed by Meta, it handles the underlying infrastructure and scaling for you, allowing you to focus on your application logic rather than server management.
            </li>
            <li>
              <strong className="font-semibold text-gray-800">Robust Error Handling and Logging:</strong> Implement comprehensive `try-catch` blocks and detailed logging in your webhook server to diagnose issues quickly and understand message flow. The provided code includes basic logging.
            </li>
            <li>
              <strong className="font-semibold text-gray-800">Testing with Ngrok:</strong> For local development, `ngrok` is invaluable for exposing your local server to the internet, making it reachable by WhatsApp's webhooks.
            </li>
          </ul>
        </Card>

        {/* Further Resources Section */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            Further Resources <span className="ml-3 text-teal-500">📚</span>
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><a href="https://developers.facebook.com/docs/whatsapp/cloud-api" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Meta WhatsApp Cloud API Official Documentation</a></li>
            <li><a href="https://github.com/MetaFb/whatsapp-cloud-api-samples" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Sample Node.js and Python bots on GitHub (Official)</a></li>
            <li><a href="https://www.plivo.com/docs/whatsapp/how-to/send-messages-whatsapp-cloud-api/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Plivo WhatsApp Cloud API Guide (External Reference)</a></li>
          </ul>
        </Card>

        {/* Summary Section */}
        <Card>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            Summary <span className="ml-3 text-orange-500">📝</span>
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Building a WhatsApp chatbot with the Cloud API involves creating a webhook server (using frameworks like Flask for Python or Express for Node.js) that listens for incoming messages, processes them, and then uses the Cloud API to send replies. This robust approach provides a scalable, cost-effective, and officially supported way to leverage WhatsApp for business communication, enabling powerful automation and engagement with your customers.
          </p>
        </Card>
        </div>
      </main>

      <footer className="text-center text-gray-600 text-sm mt-12 pb-8">
        <p>&copy; 2023 WhatsApp Cloud API Tutorial. All rights reserved.</p>
        <p className="mt-1">Built with React, Tailwind CSS, and a passion for learning.</p>
      </footer>
    </div>
  );
};

export default Whatsappbot;
