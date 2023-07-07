# Hotel Reservation

This project demonstrates a Vue application that enables users to find the most affordable hotel option by specifying a set of dates while considering a loyalty program discount.
It showcases the integration of Vue with Pinia and Router, implementation of design patterns such as the 'Builder' pattern, adherence to the SOLID principles, reusable components, and the inclusion of easily understandable tests.
The codebase emphasizes clean architecture, maintainability, and testability to provide an optimal user experience and facilitate future development.

## Features

- Find the most affordable hotel option based on specified dates and loyalty program discount.
- Integration with Vue, Pinia, and Router.
- Implementation of the 'Builder' pattern and adherence to SOLID principles.
- Clean architecture and emphasis on code maintainability and testability.
- Includes reusable components and comprehensive tests.

## Deployment

The application is continuously deployed using Netlify. Pushing to main will automatically trigger the deploy. You can access the deployed version at: [https://hotel-reservation-example-leandro.netlify.app](https://hotel-reservation-example-leandro.netlify.app)

## Prerequisites

Make sure you have Node.js v20.4.0 installed on your machine before proceeding with the project setup.

## Project Setup

To set up the project, follow these steps:

1. Clone the repository: `git clone https://github.com/leandrodreamer/Hotel_Reservation.git`
2. Navigate to the project directory: `cd hotel-reservation`
3. Install dependencies: `npm install`

## Usage

### Run Tests

To run the tests, execute the following command:

```sh
npx vitest run
```

### Development Mode

To compile and hot-reload the project for development, use the following command:

```sh
npm run dev
```

### Production Build

To compile and minify the project for production, use the following command:

```sh
npm run build
```