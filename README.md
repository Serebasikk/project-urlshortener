# URL Shortener Project

URL Shortener Project is a simple web service that allows users to create shortened URLs for original URLs.

## Usage

1. First, clone this repository:

```bash
git clone https://github.com/Serebasikk/project-urlshortener.git
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
npm run start
```

Now you can visit http://localhost:3000 in your browser to see the project's homepage.

## API

### POST /api/shorturl

Creates a shortened URL for the given original URL.

### GET /api/shorturl/:short_url

Redirects the user to the corresponding original URL for the given shortened URL.

## License

This project is licensed under the MIT License.