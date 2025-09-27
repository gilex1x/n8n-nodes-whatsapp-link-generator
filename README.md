# n8n-nodes-whatsapp-link-generator

An n8n community node that generates WhatsApp links with custom messages for easy integration into your workflows.

![n8n](https://img.shields.io/badge/n8n-community%20node-red)
![npm](https://img.shields.io/npm/v/n8n-nodes-whatsapp-link-generator)
![license](https://img.shields.io/npm/l/n8n-nodes-whatsapp-link-generator)

## What does this node do?

The WhatsApp Link Generator node creates WhatsApp chat links (`wa.me` URLs) that automatically open WhatsApp with a specific phone number and pre-filled message. This is useful for:

- Customer service automation
- Marketing campaigns
- Contact generation workflows
- Lead management systems
- Any workflow that needs to create direct WhatsApp conversation links

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Or install via npm:
```bash
npm install n8n-nodes-whatsapp-link-generator
```

## Node Configuration

### Inputs

The node accepts the following input parameters:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| **WhatsApp Number** | String | Yes | Phone number to generate WhatsApp link for. Accepts formats with or without country code (e.g., `+1234567890` or `1234567890`) |
| **Custom Message** | String | No | Pre-filled message for the WhatsApp conversation. Will be URL-encoded automatically |

### Outputs

The node outputs the original input data plus these additional fields:

| Field | Type | Description |
|-------|------|-------------|
| `phoneNumber` | String | The original phone number as entered |
| `message` | String | The original message as entered |
| `whatsappLink` | String | The generated WhatsApp link (format: `https://wa.me/{number}?text={encoded_message}`) |

### Example Output

```json
{
  "phoneNumber": "+1234567890",
  "message": "Hello! I'm interested in your services.",
  "whatsappLink": "https://wa.me/1234567890?text=Hello%21%20I%27m%20interested%20in%20your%20services."
}
```

## Usage Examples

### Basic Usage
1. Add the WhatsApp Link Generator node to your workflow
2. Enter a phone number (e.g., `+1234567890`)
3. Add your custom message (e.g., `Hello! I'm contacting you from our website.`)
4. The node will output a ready-to-use WhatsApp link

### Integration with Other Nodes
- **Webhooks**: Generate WhatsApp links from form submissions
- **Google Sheets**: Process contact lists and generate bulk WhatsApp links
- **HTTP Request**: Send the generated links via email or SMS
- **Slack/Discord**: Share WhatsApp contact links in team channels

## Phone Number Format

The node automatically cleans phone numbers by removing:
- Spaces
- Dashes (`-`)
- Parentheses `()`
- Plus signs (`+`)

**Supported formats:**
- `+1234567890` ✅
- `1234567890` ✅
- `+1 (234) 567-890` ✅
- `+1-234-567-890` ✅

**Note**: The phone number must contain only digits after cleaning. International format is recommended.

## Error Handling

The node includes built-in error handling:
- **Invalid phone numbers**: Will throw a `NodeOperationError` if the phone number contains non-numeric characters after cleaning
- **Continue on fail**: Can be configured to continue processing other items if one fails

## Compatibility

- **n8n version**: 1.0.0+
- **Node.js version**: 20.15+

## Development

This node is built with TypeScript and follows n8n community node standards.

### Building locally
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## License

[MIT](LICENSE.md)

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/gilex1x/n8n-nodes-whatsapp-link-generator).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.