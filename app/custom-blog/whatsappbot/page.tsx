"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-python";
import "prismjs/components/prism-javascript";

// Define the CodeBlockProps interface
interface CodeBlockProps {
  language: string;
  title: string;
  children: string;
}

// Shadcn UI Components
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import GoBackButton from "@/components/Back"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CodeBlock = ({ language, title, children }: CodeBlockProps) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [children]);

  return (
    <Card className="overflow-hidden bg-neutralbg-11 rounded-lg shadow-xl mb-6 border-coral-4/20">
        {/* <GoBackButton/> */}
      <div className="bg-neutralbg-11/90 p-3 border-b border-coral-4/20 flex items-center justify-between">
        <span className="text-sm font-medium text-coral-2">{title}</span>
        <Badge variant="secondary" className="px-2 py-1 text-xs uppercase bg-coral-4 text-white">
          {language}
        </Badge>
      </div>
      <ScrollArea className="h-[300px] w-full">
        <div className="p-4">
          {/* Added overflow-x-auto to the pre tag */}
          <pre className={`language-${language} p-4 rounded-md text-sm overflow-x-auto`}>
            <code className={`language-${language}`}>{children.trim()}</code>
          </pre>
        </div>
      </ScrollArea>
    </Card>
  );
};

const WhatsappbotPage = () => {
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
    if (message === 'hello') {
      reply = 'Hi! How can I help you? (This is a simulated response)';
    } else {
      reply = `You said: "${userMessage}". (Simulated reply based on your input)`;
    }
    setChatOutput(`User: ${userMessage}\nBot: ${reply}`);
    setUserMessage(''); // Clear input after sending
  };

  return (
    <div className="font-sans antialiased bg-neutralbg-3 min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-12 animate-fade-in">
        <h1 className="font-serif-display text-neutralbg-11 mb-4 leading-tight tracking-tight">
          Mastering the WhatsApp Cloud API{" "}
          <Badge className="bg-coral-2 text-coral-8 ml-2 align-middle px-3 py-1 text-base hover:bg-coral-3 transition-colors">
            Interactive Tutorial
          </Badge>
        </h1>
        <p className="text-base sm:text-lg text-coral-7 max-w-3xl mx-auto font-light leading-relaxed">
          Unlock the power of WhatsApp messaging for your applications. This step-by-step tutorial
          will guide you through building your first chatbot.
        </p>
      </header>

      <main className="max-w-5xl mx-auto space-y-8">
        <Card className="p-6 bg-neutralbg-1 border border-coral-4/20 shadow-sm hover:shadow-coral-5/10 transition-all duration-300">
          <h2 className="text-2xl font-serif-display text-neutralbg-11 mb-6 flex items-center">
            Core Concepts <span className="ml-3 text-coral-6">💡</span>
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-semibold text-coral-8 hover:text-coral-6 transition-colors">
                What is WhatsApp Cloud API?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-coral-7">
                              <p className="mb-2">
                                The WhatsApp Cloud API is Meta’s official, cloud-hosted API
                                that allows businesses to integrate WhatsApp messaging
                                directly into their own applications and systems.
                              </p>
                              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                <li>
                                  It enables you to send and receive messages
                                  programmatically.
                                </li>
                                <li>
                                  You can automate replies, build sophisticated chatbots,
                                  and integrate with CRM systems.
                                </li>
                                <li>
                                  Crucially, it eliminates the need for you to host your own
                                  WhatsApp Business API client or rely solely on
                                  third-party Business Solution Providers (BSPs) for basic
                                  functionality.
                                </li>
                              </ul>
              </AccordionContent>
            </AccordionItem>
             <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-semibold text-coral-8 hover:text-coral-6 transition-colors">
                How Does It Work?
              </AccordionTrigger>
              <AccordionContent className="text-sm text-gray-700">
                <p className="mb-2">
                  Think of it like a highly efficient post office for your application's WhatsApp messages.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  <li>
                    <strong>Your Application ↔ WhatsApp Cloud API:</strong> Your backend (e.g., Python, Node.js)
                    communicates securely with WhatsApp Cloud API endpoints over HTTPS. You send messages by making
                    API calls.
                  </li>
                  <li>
                    <strong>Webhooks (The &quot;Mailbox&quot;):</strong> When a user sends a message to your WhatsApp Business
                    number, Meta doesn't send it directly to your application. Instead, it sends an HTTP POST request
                    (a &quot;webhook&quot;) containing the message data to a specific URL you've configured on your server.
                    This URL acts as your dedicated &quot;mailbox&quot; for incoming messages.
                  </li>
                  <li>
                    <strong>Replying to Messages:</strong> Once your server receives and processes an incoming message
                    via the webhook, it constructs a reply. This reply is then sent back to the user by making
                    another API call to the WhatsApp Cloud API's message endpoint, authenticated with your unique
                    access token.
                  </li>
                </ul>
                                <p className="mt-3 text-xs text-coral-7 italic">
                  This asynchronous webhook-based communication is fundamental to building responsive chatbots.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card className="p-6 bg-neutralbg-1 border border-coral-4/20 shadow-sm hover:shadow-coral-5/10 transition-all duration-300">
          <h2 className="text-2xl font-serif-display text-neutralbg-11 mb-6 flex items-center">
            Try It Out! <span className="ml-3 text-coral-6">🤖</span>
          </h2>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Type 'hello' or any other message..."
              value={userMessage}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUserMessage(e.target.value)}
              className="border-coral-4/20 focus:ring-coral-5 focus:border-coral-5 text-sm"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!userMessage.trim()}
              className="bg-coral-6 hover:bg-coral-7 text-white transition-colors text-sm"
            >
              Send Message
            </Button>
            <Textarea
              placeholder="Bot's response will appear here..."
              value={chatOutput}
              readOnly
              className="bg-coral-1 border-coral-4/20 font-mono text-sm text-coral-8"
            />
          </div>
        </Card>

        <Card className="p-6 bg-neutralbg-1 border border-coral-4/20 shadow-sm hover:shadow-coral-5/10 transition-all duration-300">
          <h2 className="text-2xl font-serif-display text-neutralbg-11 mb-6">Code Examples</h2>
          <Tabs defaultValue="python" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-coral-2">
              <TabsTrigger 
                value="python"
                className="data-[state=active]:bg-coral-4 data-[state=active]:text-white text-sm"
              >
                Python
              </TabsTrigger>
              <TabsTrigger 
                value="nodejs"
                className="data-[state=active]:bg-coral-4 data-[state=active]:text-white text-sm"
              >
                Node.js
              </TabsTrigger>
            </TabsList>
              <TabsContent value="python">
                <>
                  <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-lg">
                    Step 2.1: Basic Setup & Environment Variables
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    Start by importing necessary modules and setting up your
                    Flask app. It&apos;s crucial to load sensitive tokens from
                    environment variables, especially for production.
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

                  <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-lg">
                    Step 2.2: Handle Incoming Messages (POST Webhook)
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    This is the main endpoint where WhatsApp will send user
                    messages. Your app will parse the incoming JSON and decide
                    on a reply.
                  </p>
                  <CodeBlock
                    language="python"
                    title="Flask POST Webhook for Messages"
                  >
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

                  <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-lg">
                    Step 2.3: Implement Webhook Verification (GET Request)
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    Before Meta sends any messages, it verifies your webhook URL
                    by sending a `GET` request. You must respond with the{' '}
                    `hub.challenge` token.
                  </p>
                  <CodeBlock
                    language="python"
                    title="Flask GET Webhook for Verification"
                  >
                    {`# ... (previous code for POST webhook) ...

@app.route('/webhook', methods=['GET'])
def verify_webhook():
    """
    Handles the webhook verification GET request from WhatsApp.
    """
    mode = request.args.get("hub.mode")
    L
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

                  <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-lg">
                    Step 2.4: Run Your Flask Application
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    Finally, run your Flask application. For local development,
                    port 5000 is common.
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

                  <h4 className="font-semibold text-gray-700 mt-6 mb-4 text-lg">
                    How to Test Your Python (Flask) App:
                  </h4>
                  <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
                    <li>
                      <strong>Install Flask and Requests:</strong> Open your
                      terminal and navigate to your project directory.
                      <CodeBlock language="bash" title="Install Dependencies">
                        pip install Flask requests python-dotenv
                      </CodeBlock>
                    </li>
                    <li>
                      <strong>Create a `.env` file:</strong> In the same
                      directory as your Python script (e.g., `app.py`), create
                      a file named `.env` and add your credentials. Replace the
                      placeholder values with your actual tokens from Meta.
                      <CodeBlock language="plaintext" title=".env Example">
                        {`WHATSAPP_TOKEN="YOUR_ACTUAL_WHATSAPP_CLOUD_API_TOKEN"
PHONE_NUMBER_ID="YOUR_ACTUAL_WHATSAPP_PHONE_NUMBER_ID"
VERIFY_TOKEN="YOUR_CHOSEN_VERIFY_TOKEN_FOR_WEBHOOK_SETUP"`}
                      </CodeBlock>
                    </li>
                    <li>
                      <strong>Run your Flask app:</strong> Execute your Python
                      script from the terminal.
                      <CodeBlock language="bash" title="Run Flask App">
                        python app.py
                      </CodeBlock>
                    </li>
                    <li>
                      <strong>Expose your local server with ngrok:</strong> Open
                      a *new* terminal window and run ngrok.
                      <CodeBlock language="bash" title="Run ngrok">
                        ngrok http 5000
                      </CodeBlock>
                      ngrok will give you a public URL (e.g.,
                      `https://abcdef12345.ngrok.io`).
                    </li>
                    <li>
                      <strong>Set Webhook in Meta Dashboard:</strong> Go back to
                      your WhatsApp product settings in{' '}
                      <a
                        href="https://developers.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Meta for Developers
                      </a>
                      . Set the `ngrok` URL (e.g.,
                      `https://abcdef12345.ngrok.io/webhook`) as your webhook
                      URL. Also, ensure the &quot;Verify token&quot; field in the Meta
                      dashboard matches the `VERIFY_TOKEN` you set in your{' '}
                      `.env` file.
                    </li>
                    <li>
                      <strong>Test!</strong> Send a message (e.g., &quot;hello&quot;,
                      &quot;api&quot;, or anything else) to your WhatsApp Business
                      number from your personal WhatsApp. Observe the output in
                      your Flask terminal for logs and, if all is set up
                      correctly, expect a reply!
                    </li>
                  </ol>
                </>
              </TabsContent>
              <TabsContent value="nodejs">
                <>
                  <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-lg">
                    Step 2.1: Basic Setup & Environment Variables
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    Start by importing necessary modules and setting up your
                    Express app. It&apos;s crucial to load sensitive tokens from
                    environment variables, especially for production.
                  </p>
                  <CodeBlock
                    language="javascript"
                    title="Node.js Initial Setup"
                  >
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

                  <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-lg">
                    Step 2.2: Handle Incoming Messages (POST Webhook)
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    This is the main endpoint where WhatsApp will send user
                    messages. Your app will parse the incoming JSON and decide
                    on a reply.
                  </p>
                  <CodeBlock
                    language="javascript"
                    title="Express POST Webhook for Messages"
                  >
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
    const from = message.from;      // The user's WhatsApp number
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

                  <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-lg">
                    Step 2.3: Implement Webhook Verification (GET Request)
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    Before Meta sends any messages, it verifies your webhook URL
                    by sending a `GET` request. You must respond with the{' '}
                    `hub.challenge` token.
                  </p>
                  <CodeBlock
                    language="javascript"
                    title="Express GET Webhook for Verification"
                  >
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

                  <h4 className="font-semibold text-gray-800 mt-6 mb-3 text-lg">
                    Step 2.4: Run Your Node.js Application
                  </h4>
                  <p className="mb-3 text-sm text-gray-700">
                    Finally, run your Node.js application. For local
                    development, port 5000 is common.
                  </p>
                  <CodeBlock
                    language="javascript"
                    title="Run Node.js App"
                  >
                    {`// ... (all previous code) ...

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server is running on port \${PORT}\`));
`}
                  </CodeBlock>

                  <h4 className="font-semibold text-gray-700 mt-6 mb-4 text-lg">
                    How to Test Your Node.js (Express) App:
                  </h4>
                  <ol className="list-decimal list-inside space-y-3 text-sm text-gray-700">
                    <li>
                      <strong>Initialize Node.js project & install packages:</strong>{' '}
                      Open your terminal and navigate to your project directory.
                      <CodeBlock language="bash" title="Initialize and Install">
                        {`npm init -y
npm install express axios dotenv`}
                      </CodeBlock>
                    </li>
                    <li>
                      <strong>Create a `.env` file:</strong> In the same
                      directory as your Node.js script (e.g., `index.js`),
                      create a file named `.env` and add your credentials.
                      Replace the placeholder values with your actual tokens
                      from Meta.
                      <CodeBlock language="plaintext" title=".env Example">
                        {`WHATSAPP_TOKEN="YOUR_ACTUAL_WHATSAPP_CLOUD_API_TOKEN"
PHONE_NUMBER_ID="YOUR_ACTUAL_WHATSAPP_PHONE_NUMBER_ID"
VERIFY_TOKEN="YOUR_CHOSEN_VERIFY_TOKEN_FOR_WEBHOOK_SETUP"`}
                      </CodeBlock>
                    </li>
                    <li>
                      <strong>Run your Node.js app:</strong> Execute your
                      Node.js script from the terminal.
                      <CodeBlock language="bash" title="Run Node.js App">
                        node index.js
                      </CodeBlock>
                    </li>
                    <li>
                      <strong>Expose your local server with ngrok:</strong> Open
                      a *new* terminal window and run ngrok.
                      <CodeBlock language="bash" title="Run ngrok">
                        ngrok http 5000
                      </CodeBlock>
                      ngrok will give you a public URL (e.g.,
                      `https://abcdef12345.ngrok.io`).
                    </li>
                    <li>
                      <strong>Set Webhook in Meta Dashboard:</strong> Go back to
                      your WhatsApp product settings in{' '}
                      <a
                        href="https://developers.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Meta for Developers
                      </a>
                      . Set the `ngrok` URL (e.g.,
                      `https://abcdef12345.ngrok.io/webhook`) as your webhook
                      URL. Also, ensure the &quot;Verify token&quot; field in the Meta
                      dashboard matches the `VERIFY_TOKEN` you set in your{' '}
                      `.env` file.
                    </li>
                    <li>
                      <strong>Test!</strong> Send a message (e.g., &quot;hello&quot;,
                      &quot;api&quot;, or anything else) to your WhatsApp Business
                      number from your personal WhatsApp. Observe the output in
                      your Node.js terminal for logs and, if all is set up
                      correctly, expect a reply!
                    </li>
                  </ol>
                </>
              </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default WhatsappbotPage;