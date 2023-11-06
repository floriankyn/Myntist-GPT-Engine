
# Myntist-GPT-Engine

Myntist GPT Engige is an api which aims to handle the creation of vectorial embedded data as well as retrieving them and using it with Chat GPT.



## Table of content
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
## Tech Stack

**Server:** Node, Express, Typescript, Chromadb, Prisma

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org/).
- npm: npm is included with Node.js. Ensure it is installed by running `npm -v`.
- Python: python is requited to run chromadb

### Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/global-tech-dev/myntist-gpt-engine.git
   cd myntist-gpt-engine
   ```
2. Install the dependencies:
   ```sh
    npm install
   ```
3. Copy the example environment file and make the required configuration changes in the .env file:
   ```sh
   cp src/api/config/.env.example src/api/config/.env
   ```
4. Install chromadb
    ```sh
    pip install chromadb
    ```
5. Start the chroma backend serve:
    ```sh
    chroma run --path /db_path
    ```
5. Start the development server:
   ```ssh
    npm run dev
    ```
   The myntist gpt engine should now be running on http://localhost:3000.
## Configuration

To configure the application, you need to set up environment variables. Copy the `.env.example` file in the `src/api/config/` directory to a new file named `.en``, and fill in the values as described below:

- `PORT`: The port number on which the Express server will run. For example, 3000.
- `JWT_SECRE`: A secret key for signing JSON Web Tokens. Ensure this is a secure and unique string.
- `OPENAI_API_KE`: The secret key for Openai API.
## API Reference

#### Create a token

```sh
curl --request GET \
  --url http://localhost:3000/api/v1/auth/token \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MiwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMDJUMTk6MzE6MjMuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTExLTAyVDE5OjMxOjIzLjAwMFoifSwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiaWF0IjoxNjk4OTUzNDgyfQ.yxQUAOu8__bJKsxUoWDZ6DCYjSjyhwuPT1LXy0rBPxc' \
  --header 'User-Agent: insomnia/8.3.0'
```

#### Verify a token

```sh
curl --request GET \
  --url http://localhost:3000/api/v1/auth/token \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MiwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMDJUMTk6MzE6MjMuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTExLTAyVDE5OjMxOjIzLjAwMFoifSwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiaWF0IjoxNjk4OTUzNDgyfQ.yxQUAOu8__bJKsxUoWDZ6DCYjSjyhwuPT1LXy0rBPxc' \
  --header 'User-Agent: insomnia/8.3.0'
```

#### Create Vectors

```sh
curl --request POST \
  --url http://localhost:3000/api/v1/vectors/save \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MiwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMDJUMTk6MzE6MjMuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTExLTAyVDE5OjMxOjIzLjAwMFoifSwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiaWF0IjoxNjk4OTUzNDgyfQ.yxQUAOu8__bJKsxUoWDZ6DCYjSjyhwuPT1LXy0rBPxc' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
  "input": [
    {
      "id": "48-building-oppertunity-and-momentum",
      "content": "\"In the Myntist ecosystem, we introduce a groundbreaking concept: Consumer Leverage. Every branded product you buy not only serves your immediate needs but also becomes a lasting asset, contributing to your continuous value cycle. As these products are resold within our community, the value returns to you, the consumer, amplifying your purchasing power and financial freedom. With Myntist, every purchase is an investment in your future, ensuring that you always get more out of what you buy. Experience the power of Consumer Leverage, only at Myntist.\" This message underscores the idea that consumers are not just spending money but making an investment each time they purchase a product on Myntist, enhancing their financial well-being in the long term."
    }
  ]
}'
```

#### List Vectors

```sh
curl --request GET \
  --url http://localhost:3000/api/v1/vectors/list/myntist \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MiwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMDJUMTk6MzE6MjMuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTExLTAyVDE5OjMxOjIzLjAwMFoifSwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiaWF0IjoxNjk4OTUzNDgyfQ.yxQUAOu8__bJKsxUoWDZ6DCYjSjyhwuPT1LXy0rBPxc' \
  --header 'Content-Type: multipart/form-data' \
  --header 'User-Agent: insomnia/8.3.0' \
  --form =
```

#### Compute Vectors

```sh
curl --request POST \
  --url http://localhost:3000/api/v1/vectors/compute \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MiwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMDJUMTk6MzE6MjMuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTExLTAyVDE5OjMxOjIzLjAwMFoifSwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiaWF0IjoxNjk4OTUzNDgyfQ.yxQUAOu8__bJKsxUoWDZ6DCYjSjyhwuPT1LXy0rBPxc' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"input": "how could myntist manage a subscription income for my ecommerce store",
	"results": 4,
	"source": "myntist"
}'
```

#### Asking Pepper

```sh
curl --request POST \
  --url http://localhost:3000/api/v1/vectors/chat \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MiwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMDJUMTk6MzE6MjMuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIzLTExLTAyVDE5OjMxOjIzLjAwMFoifSwibmFtZSI6IkZsb3JpYW4iLCJjcmVkZW50aWFsX2xldmVsIjotMSwiaWF0IjoxNjk4OTUzNDgyfQ.yxQUAOu8__bJKsxUoWDZ6DCYjSjyhwuPT1LXy0rBPxc' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.3.0' \
  --data '{
	"input": "What is assetization?",
	"results": 4,
	"source": "myntist"
}'
```

