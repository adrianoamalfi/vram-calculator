# VRAM Calculator

VRAM Calculator is a free and open-source tool designed to help researchers, developers, and enthusiasts estimate the VRAM requirements for running Large Language Models (LLMs).

## Features

- Accurate VRAM estimation for various LLM sizes and configurations
- Support for different precision types (float32, float16, int8, etc.)
- Consideration of optimization techniques like PagedAttention and Tensor Parallelism
- Responsive design for desktop and mobile use

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/adrianoamalfi/vram-calculator.git
    ```
2. Install the dependencies:
    ```sh
    cd vram-calculator
    npm install
    ```

### Running the Application

To start the application in development mode:
```sh
npm run dev
```

To build the application for production:
```sh
npm run build
```

## Contributing

We welcome contributions from the community! Here’s how you can contribute:

### Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by opening a new issue.

### Proposing Changes

We use GitHub Flow, so all code changes happen through pull requests. Here’s how to propose changes:

1. Fork the repository and create your branch from `main`.
2. If you’ve added code that should be tested, add tests.
3. If you’ve changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Ensure your code lints.
6. Submit your pull request!

### Code Style

- Use 2 spaces for indentation rather than tabs.
- You can run `npm run lint` to unify the style.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## References

This document was adapted from the open-source contribution guidelines of Facebook's Draft.

## Contact

For any questions or concerns, feel free to contact the project maintainers.

## Author

Adriano Amalfi - [GitHub](https://github.com/adrianoamalfi)

## Links

- GitHub Repository: [https://github.com/adrianoamalfi/vram-calculator](https://github.com/adrianoamalfi/vram-calculator)
- Calculator URL: [https://adrianoamalfi.github.io/vram-calculator/](https://adrianoamalfi.github.io/vram-calculator/)

Thank you for your interest in contributing to VRAM Calculator!