#!/usr/bin/env bash
curl -X POST http://localhost:3000/messages \
    --data '{ "message": "This is a test message" }' \
    --header "Content-type: application/json"
