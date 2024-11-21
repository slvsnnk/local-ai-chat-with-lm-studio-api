# Local AI Chat powered by LM Studio API

This project allows you to run a local AI chat application using the LM Studio API. Follow the steps below to set up and start the application.

---

## 🚀 Installation and Setup

### 1. Clone the Repository
Clone this repository to your local directory:
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### 3. Start the Development Server
Start the development server with:
```bash
npm run dev
```

---

## 🧠 Setting Up LM Studio

1. **Start LM Studio**  
   Open the LM Studio application on your computer.

2. **Load a Model**  
   Load a model of your choice in LM Studio.

3. **Enable CORS**  
   Navigate to the LM Studio local server and enable Cross-Origin Resource Sharing (CORS) to allow requests from the chat application.

---

## 🏃‍♂️ Running the Server

After completing the above steps, your local server should be up and running, ready to handle requests.

---

## 🛠 Adjusting Roles

You can customize the roles used in the chat application by modifying the `glossary.ts` file. This file contains definitions and settings for different roles that the AI can assume during interactions.

To adjust the roles:

1. Open the `glossary.ts` file located in the project directory.
2. Modify the role definitions as needed.
3. Save the changes and restart the development server if it is running.

---

🎉 Enjoy exploring the local AI chat functionality!