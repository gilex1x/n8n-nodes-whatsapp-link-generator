# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an n8n community nodes starter template for creating custom n8n integrations. The project provides example nodes and credentials that can be modified or replaced to build custom nodes for the n8n workflow automation platform.

## Commands

### Development
- `npm run dev` - Start TypeScript compilation in watch mode
- `npm run build` - Build the project (cleans dist, compiles TypeScript, copies icons)
- `npm run lint` - Check code with ESLint
- `npm run lintfix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier

### Testing & Publishing
- `npm run prepublishOnly` - Build and lint before publishing to npm

## Architecture

### Project Structure
```
nodes/                     # Node implementations
├── ExampleNode/          # Basic example node
├── HttpBin/             # HTTP testing node with API calls
└── WhatsAppLinkGenerator/ # Custom WhatsApp link generator

credentials/              # Credential type definitions
├── ExampleCredentialsApi.credentials.ts
└── HttpBinApi.credentials.ts

dist/                    # Build output (TypeScript compiled + icons)
```

### Node Development Patterns

**Node Structure**: Each node is a TypeScript class implementing `INodeType` with:
- `description: INodeTypeDescription` - Node metadata, UI properties, inputs/outputs
- `execute()` method - Main execution logic that processes input data

**Credential Structure**: Credential types implement `ICredentialType` with:
- `properties` - User input fields for authentication
- `authenticate` - How to use credentials in requests
- `test` - Endpoint to validate credentials

### Build System

The build process:
1. Compiles TypeScript from `nodes/` and `credentials/` to `dist/`
2. Copies SVG/PNG icons to maintain directory structure in `dist/`
3. The `package.json` n8n configuration references compiled files in `dist/`

### ESLint Configuration

Uses `eslint-plugin-n8n-nodes-base` with strict rules for:
- Node naming conventions and file structure
- Parameter validation and descriptions
- Credential field requirements
- n8n-specific best practices

The ESLint config has specific rule overrides for:
- `package.json` - Community package validation
- `credentials/**/*.ts` - Credential-specific rules
- `nodes/**/*.ts` - Node-specific rules with extensive parameter validation

## Key Development Notes

- Node files must follow naming convention: `NodeName.node.ts`
- Credential files: `CredentialName.credentials.ts`
- Icons (SVG/PNG) are automatically copied during build
- All nodes and credentials must be registered in `package.json` under the `n8n` field
- TypeScript compilation targets ES2019 with strict mode enabled
- The project uses n8n workflow types from the `n8n-workflow` peer dependency