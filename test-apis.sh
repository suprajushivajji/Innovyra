#!/bin/bash
# Test script for AI Career Execution Engine API endpoints

echo "Testing AI Career Execution Engine APIs..."
echo "Server: http://localhost:3001"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Execution Plan (Master Orchestration)
echo -e "${BLUE}Test 1: Master Execution Plan${NC}"
curl -s -X POST http://localhost:3001/api/execution-plan \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Become a Machine Learning Engineer",
    "timeline": "6 months",
    "skillLevel": "Beginner",
    "domain": "Technology"
  }' | jq '.' || echo "Error testing execution-plan"

echo ""
echo ""

# Test 2: Research Endpoint
echo -e "${BLUE}Test 2: Market Research API${NC}"
curl -s -X POST http://localhost:3001/api/research \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Become a Python Developer",
    "timeline": "3 months",
    "skillLevel": "Beginner"
  }' | jq '.' || echo "Error testing research"

echo ""
echo ""

# Test 3: Roadmap Endpoint
echo -e "${BLUE}Test 3: Career Roadmap API${NC}"
curl -s -X POST http://localhost:3001/api/roadmap \
  -H "Content-Type: application/json" \
  -d '{
    "goal": "Become a Data Engineer",
    "timeline": "4 months",
    "skillLevel": "Intermediate"
  }' | jq '.' || echo "Error testing roadmap"

echo ""
echo ""

echo -e "${GREEN}✅ API tests completed!${NC}"
echo "For detailed documentation, see: API_DOCUMENTATION.md"
