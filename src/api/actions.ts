'use server'

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function searchCVES(query: string) {
  try {

    const response_format = {
      type: "json_schema" as const,
      json_schema: {
        name: "api_response",
        schema: {
          type: "object",
          properties: {
            start_from: {
              type: ["number", "null"],
              description: "Number of elements to skip"
            },
            limit: {
              type: ["number", "null"],
              description: "Number of elements to return. If None, it will return the max number of elements allowed by the service"
            },
            sort_order: {
              type: ["object", "null"],
              description: "Dictionary of all the fields name and sorting order (-1 for Descending, 1 for Ascending)",
              properties: {
                name: { type: "number" },
                severity: { type: "number" },
                api_created: { type: "number" },
                api_last_modified: { type: "number" }
              },
              additionalProperties: true
            },
            since_date: {
              type: ["string", "null"],
              format: "date-time",
              description: "Date from which to start the search"
            },
            to_date: {
              type: ["string", "null"],
              format: "date-time",
              description: "Date until which to search"
            },
            vendor: {
              type: ["string", "null"],
              description: "Filter to a specific Vendor name"
            },
            product: {
              type: ["string", "null"],
              description: "Filter to a specific Product name"
            }
          },
          additionalProperties: false
        },
      }
    }
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: 'developer',
          content: 'You are a helpful assistant that converts natural language queries into search parameters'
        },
        {
          role: 'developer',
          content: 'The current date is ' + new Date().toISOString()
        },
        {
          role: 'user',
          content: `${query}`
        }
      ],
      "response_format": response_format
  });

    const filterParams = completion.choices[0].message.parsed
    console.log(filterParams)

    const cves = await fetch("https://transilience-prod--backend-api-web.modal.run/cves", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 89asdcu09qeWSDVsd8jijdnxmieWEDwe8vuf98uvjdEFSDvj9vEDWEmqpqSF2feA`
      },
      body: JSON.stringify(filterParams)
    }).then(res => res.json())
    console.log(cves)

    return { cves }
  } catch (error) {
    console.log(error)
    return { error: 'Failed to search cves' }
  }
}

