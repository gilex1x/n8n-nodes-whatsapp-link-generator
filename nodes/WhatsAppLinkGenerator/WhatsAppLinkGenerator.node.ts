import {
    type IExecuteFunctions,
    type INodeExecutionData,
    type INodeType,
    type INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';


export class WhatsAppLinkGenerator implements INodeType {
    description: INodeTypeDescription = {
        // Basic node details will go here
        displayName: 'WhatsAppLinkGenerator',
        name: 'whatsAppLinkGenerator',
        icon: 'file:whatsAppLinkGenerator.svg',
        group: ['transform'],
        version: 1,
        description: 'Generate Whatsapp link to a chat witha custom message',
        defaults: {
            name: 'WhatsAppLinkGenerator',
        },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [],
        properties: [
            // Resources and operations will go here
            {
                displayName: 'WhatsApp Number',
                name: 'phoneNumber',
                type: 'string',
                default: '',
                placeholder: '+1234567890 or 1234567890',
                required: true,
                description: 'Phone number to generate WhatsApp link for (with or without country code)',
            },
            {
                displayName: 'Custom Message',
                name: 'message',
                type: 'string',
                default: '',
                typeOptions: {
                    rows: 4
                },
                placeholder: 'Hello! I found your contact...',
                description: 'Pre-filled message for the WhatsApp conversation',
            },
        ],
    };
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                const phoneNumber = this.getNodeParameter('phoneNumber', itemIndex, '') as string;
                const message = this.getNodeParameter('message', itemIndex, '') as string;

                // Clean phone number (remove spaces, dashes, parentheses, plus signs)
                const cleanPhoneNumber = phoneNumber.replace(/[\s\-\(\)\+]/g, '');

                // Validate phone number (should contain only digits after cleaning)
                if (!/^\d+$/.test(cleanPhoneNumber)) {
                    throw new NodeOperationError(this.getNode(), `Invalid phone number format: ${phoneNumber}`);
                }

                // Encode the message for URL
                const encodedMessage = encodeURIComponent(message);

                // Generate WhatsApp link
                const whatsappLink = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;

                // Add the result to the item
                const newItem: INodeExecutionData = {
                    json: {
                        phoneNumber: phoneNumber,
                        message: message,
                        whatsappLink: whatsappLink
                    },
                    pairedItem: itemIndex,
                };

                returnData.push(newItem);

            } catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: (error as Error).message
                        },
                        error: error as NodeOperationError,
                        pairedItem: itemIndex,
                    });
                } else {
                    if (error !== undefined && error !== null && typeof error === 'object' && 'context' in error) {
                        (error as any).context.itemIndex = itemIndex;
                        throw error;
                    }
                    throw new NodeOperationError(this.getNode(), error as Error, {
                        itemIndex,
                    });
                }
            }
        }

        return [returnData];
    }
}