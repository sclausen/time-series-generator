export const CONFIG_SCHEMA = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "schema for the configuration",
  "type": "object",
  "required": [
    "start-date",
    "end-date",
    "resolution",
    "limits",
    "template"
  ],
  "properties": {
    "start-date": {
      "type": "string",
      "pattern": "^\\d\\d\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$"
    },
    "end-date": {
      "type": "string",
      "pattern": "^\\d\\d\\d\\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$"
    },
    "resolution": {
      "type": "string",
      "pattern": "^\\d* (second(s?)|minute(s?)|hour(s?))$"
    },
    "limits": {
      "type": "array",
      "minItems": 2,
      "maxItems": 2,
      "items": {
        "type": "number"
      }
    },
    "template": {
      "type": "object"
    }
  }
};
