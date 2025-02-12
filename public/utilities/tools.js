// Keep only the tools array and remove toolMapping and getActiveTools
const tools = [
    {
        type: "function",
        function: {
            name: "open_google",
            description: "Opens Google with a search query.",
            parameters: {
                type: "object",
                properties: {
                    query: {
                        type: "string",
                        description: "The search query to open Google with.",
                    },
                },
                required: ["query"],
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "display_component",
            description: "Displays a component.",
            parameters: {
                type: "object",
                properties: {
                    component_id: {
                        type: "string",
                        description: "The ID of the component to display.",
                    },
                    message: {
                        type: "string",
                        description: "The message to display before the component. Structured only in HTML with no markdown.",
                    },
                    data: {
                        type: "array",
                        description: "An array of objects that contain data to display in the component",
                        items: {
                            type: "object",
                            properties: {
                                main_text: {
                                    type: "string",
                                    description: "The main text or product title to display if the component needs it",
                                },
                                image: {
                                    type: "string",
                                    description: "URL of the image to display if the component requires an image",
                                },
                                price: {
                                    type: "number",
                                    description: "The price to display if the component requires a price",
                                },
                                description: {
                                    type: "string",
                                    description: "A description to display if the component requires a description",
                                },
                                button_text: {
                                    type: "string",
                                    description: "Text to display on the button if the component requires a button",
                                },
                                button_link: {
                                    type: "string",
                                    description: "URL the button should link to if the component requires a button",
                                },
                            },
                            additionalProperties: false,
                        },
                    },
                },
                required: ["component_id", "message", "data"],
                additionalProperties: false,
            },
        },
    },
    {
        type: "function",
        function: {
            name: "show_carousel",
            description: "Shows a carousel.",
            parameters: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description: "The message to display with the carousel.",
                    },
                },
                required: ["message"],
                additionalProperties: false,
            },
        },
    },
];

// Make tools available globally
window.toolsModule = {
    tools
};
