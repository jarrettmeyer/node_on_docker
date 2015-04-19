#!/usr/bin/env bash
curl -X POST http://localhost:3000/messages \
    --header "Content-type: application/json" \
    --data '{ "message": "This is a test message" }'
