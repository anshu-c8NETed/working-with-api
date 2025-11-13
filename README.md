# Working with APIs - Complete Guide

## Table of Contents
1. [What is an API?](#what-is-an-api)
2. [Understanding Endpoints and JSON](#understanding-endpoints-and-json)
3. [HTTP Methods (CRUD Operations)](#http-methods-crud-operations)
4. [HTTP Status Codes](#http-status-codes)
5. [Testing APIs with Postman](#testing-apis-with-postman)
6. [JavaScript Fetch API](#javascript-fetch-api)
7. [Axios Library](#axios-library)
8. [Authentication & Authorization](#authentication--authorization)
9. [Error Handling Best Practices](#error-handling-best-practices)
10. [Practice Exercises](#practice-exercises)



## What is an API?

### Definition
**API** = **Application Programming Interface**

An API is a set of rules and protocols that allows different software applications to communicate with each other.

### Real-World Analogy (Restaurant)
```
You (Customer/Frontend)
    ↓
Waiter (API) ← Takes your order, brings food
    ↓
Kitchen (Backend/Server) ← Prepares the food
    ↓
Waiter brings back food (Data/Response)
    ↓
You receive food (Frontend displays data)
```

### Types of APIs
1. **REST API** (Most Common) - Uses HTTP methods
2. **SOAP API** - Uses XML format
3. **GraphQL** - Flexible query language
4. **WebSocket API** - Real-time communication

### Why Use APIs?
✅ Data sharing between applications  
✅ Separation of frontend and backend  
✅ Reusability of code  
✅ Security (controlled access)  
✅ Scalability

---

## Understanding Endpoints and JSON

### What is an Endpoint?
An endpoint is a specific URL where an API can access resources.

**Structure:**
```
https://api.example.com/users
   ↓         ↓          ↓
Protocol  Domain    Resource
```

**Examples:**
```
GET    https://api.example.com/users           - Get all users
GET    https://api.example.com/users/123       - Get user with ID 123
POST   https://api.example.com/users           - Create new user
PUT    https://api.example.com/users/123       - Update user 123 completely
PATCH  https://api.example.com/users/123       - Update specific fields of user 123
DELETE https://api.example.com/users/123       - Delete user 123
```

### What is JSON?

**JSON** = **JavaScript Object Notation**

A lightweight data format for storing and transporting data.

**Example JSON:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "isActive": true,
  "hobbies": ["reading", "coding", "gaming"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipcode": "10001"
  }
}
```

**JavaScript Operations:**
```javascript
// Object to JSON String
const user = { name: "John", age: 25 };
const jsonString = JSON.stringify(user);
console.log(jsonString); // '{"name":"John","age":25}'

// JSON String to Object
const jsonData = '{"name":"John","age":25}';
const userObject = JSON.parse(jsonData);
console.log(userObject.name); // John
```

---

## HTTP Methods (CRUD Operations)

### CRUD = Create, Read, Update, Delete

| HTTP Method | CRUD Operation | Purpose | Body Required? |
|-------------|---------------|---------|----------------|
| **GET** | Read | Retrieve data | ❌ No |
| **POST** | Create | Add new data | ✅ Yes |
| **PUT** | Update (Full) | Replace entire resource | ✅ Yes |
| **PATCH** | Update (Partial) | Update specific fields | ✅ Yes |
| **DELETE** | Delete | Remove data | ❌ No |

### Detailed Explanation

#### 1. GET - Retrieve Data
```
Purpose: Fetch data from server
Body: Not used
Example: Get list of all users
```

#### 2. POST - Create New Data
```
Purpose: Send data to create new resource
Body: Required (contains new data)
Example: Register new user
```

#### 3. PUT - Replace Entire Resource
```
Purpose: Update by replacing ALL fields
Body: Required (must include ALL fields)
Example: Update complete user profile
Note: Missing fields will be set to null/default
```

#### 4. PATCH - Update Specific Fields
```
Purpose: Update only specified fields
Body: Required (only fields to update)
Example: Change only user email
Note: Other fields remain unchanged
```

#### 5. DELETE - Remove Data
```
Purpose: Delete resource from server
Body: Not used
Example: Delete user account
```

### PUT vs PATCH - Critical Difference

**PUT Example:**
```json
// Original Data
{
  "id": 1,
  "name": "John",
  "email": "john@example.com",
  "phone": "1234567890"
}

// PUT Request (Must send ALL fields)
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890"
}

// If you forget a field with PUT:
{
  "id": 1,
  "name": "John Doe"
}
// Result: email and phone become null!
```

**PATCH Example:**
```json
// Original Data (same as above)

// PATCH Request (Send only what you want to change)
{
  "name": "John Doe"
}

// Result: Only name changes, email and phone stay the same!
```

---

## HTTP Status Codes

### Categories

| Range | Category | Meaning |
|-------|----------|---------|
| 1xx | Informational | Request received, continuing |
| 2xx | Success | Request successful |
| 3xx | Redirection | Further action needed |
| 4xx | Client Error | Problem with request |
| 5xx | Server Error | Server failed to fulfill request |

### Important Status Codes (Remember for Exams!)

#### 2xx - Success Codes ✅
- **200 OK** - Request successful, response has data
- **201 Created** - New resource created successfully (POST)
- **204 No Content** - Successful but no response body (often DELETE)

#### 4xx - Client Error Codes ❌
- **400 Bad Request** - Invalid syntax or data format
- **401 Unauthorized** - Authentication required or failed
- **403 Forbidden** - Authenticated but no permission
- **404 Not Found** - Resource doesn't exist
- **422 Unprocessable Entity** - Validation failed

#### 5xx - Server Error Codes ⚠️
- **500 Internal Server Error** - General server problem
- **502 Bad Gateway** - Invalid response from upstream server
- **503 Service Unavailable** - Server temporarily down

### When Do You See Each Code?

```
200 - GET/POST/PUT/PATCH successful with data
201 - POST successfully created resource
204 - DELETE successful (no content to return)
400 - Malformed JSON, missing required fields
401 - No auth token or invalid token
404 - Wrong endpoint URL or resource deleted
422 - Data fails validation (e.g., invalid email format)
500 - Server crashed or database error
```

---

## Testing APIs with Postman

### What is Postman?
A tool for testing APIs without writing code.

### Installation
1. Download from: https://www.postman.com/downloads/
2. Install and open
3. Create free account (optional but recommended)

### Complete Request Examples

#### Example 1: GET Request
```
Step 1: Select Method → GET
Step 2: Enter URL → https://jsonplaceholder.typicode.com/users
Step 3: Click "Send"
Step 4: Check Response (Status: 200, Body: array of users)
```

#### Example 2: POST Request
```
Step 1: Select Method → POST
Step 2: Enter URL → https://jsonplaceholder.typicode.com/posts

Step 3: Add Headers
   Key: Content-Type
   Value: application/json

Step 4: Select Body → raw → JSON
Step 5: Enter data:
{
  "title": "My First Post",
  "body": "This is the content",
  "userId": 1
}

Step 6: Click "Send"
Step 7: Check Response (Status: 201, returns created post with id)
```

#### Example 3: PUT Request
```
Step 1: Method → PUT
Step 2: URL → https://jsonplaceholder.typicode.com/posts/1

Headers: Content-Type = application/json

Body (raw JSON):
{
  "id": 1,
  "title": "Updated Complete Post",
  "body": "Completely new content",
  "userId": 1
}

Send → Status: 200, returns updated post
```

#### Example 4: PATCH Request
```
Step 1: Method → PATCH
Step 2: URL → https://jsonplaceholder.typicode.com/posts/1

Headers: Content-Type = application/json

Body (raw JSON):
{
  "title": "Only Title Updated"
}

Send → Status: 200, only title changed
```

#### Example 5: DELETE Request
```
Step 1: Method → DELETE
Step 2: URL → https://jsonplaceholder.typicode.com/posts/1
Step 3: Click "Send"
Step 4: Status: 200 (JSONPlaceholder returns empty object)
```

### Postman Tips for Exams
- Always check status code first
- Headers tab shows request/response headers
- Body can be: raw (JSON), form-data, x-www-form-urlencoded
- Save requests in Collections for reuse
- Use Environment Variables for API URLs

---

## JavaScript Fetch API

### What is Fetch?
Built-in JavaScript function for making HTTP requests.

### Basic Syntax
```javascript
fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### GET Request
```javascript
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    // Check if request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Call the function
getUsers();
```

### POST Request
```javascript
async function createPost(title, body) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Created:', data);
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

// Usage
createPost('My Title', 'My Content');
```

### PUT Request (Replace Entire Resource)
```javascript
async function updatePost(id, newData) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        title: newData.title,
        body: newData.body,
        userId: newData.userId
      })
    });
    
    const data = await response.json();
    console.log('Updated (PUT):', data);
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
  }
}

// Usage
updatePost(1, {
  title: 'New Title',
  body: 'New Body',
  userId: 1
});
```

### PATCH Request (Update Specific Fields)
```javascript
async function patchPost(id, updates) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    
    const data = await response.json();
    console.log('Updated (PATCH):', data);
    return data;
  } catch (error) {
    console.error('Error patching post:', error);
  }
}

// Usage - only update title
patchPost(1, { title: 'Only Title Changed' });
```

### DELETE Request
```javascript
async function deletePost(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    console.log('Deleted successfully, Status:', response.status);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}

// Usage
deletePost(1);
```

---

## Axios Library

### What is Axios?
A popular JavaScript library that makes HTTP requests cleaner and easier than Fetch.

### Why Use Axios?
✅ Cleaner syntax  
✅ Automatic JSON transformation  
✅ Better error handling  
✅ Request/response interceptors  
✅ Browser and Node.js support

### Installation

**In HTML:**
```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

**In Node.js/React:**
```bash
npm install axios
```

### Axios vs Fetch Comparison

```javascript
// Fetch
fetch(url)
  .then(response => response.json())  // Extra step
  .then(data => console.log(data));

// Axios
axios.get(url)
  .then(response => console.log(response.data));  // Direct access
```

### GET Request
```javascript
async function getUsers() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(response.data);  // Direct access to data
    console.log('Status:', response.status);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### POST Request
```javascript
async function createPost(postData) {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: postData.title,
      body: postData.body,
      userId: 1
    });
    
    console.log('Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Usage
createPost({ title: 'New Post', body: 'Content here' });
```

### PUT Request
```javascript
async function updatePost(id, newData) {
  try {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        id: id,
        title: newData.title,
        body: newData.body,
        userId: 1
      }
    );
    
    console.log('Updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### PATCH Request
```javascript
async function patchPost(id, updates) {
  try {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      updates
    );
    
    console.log('Patched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Usage
patchPost(1, { title: 'Only title changed' });
```

### DELETE Request
```javascript
async function deletePost(id) {
  try {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    
    console.log('Deleted, Status:', response.status);
    return true;
  } catch (error) {
    console.error('Error:', error.message);
    return false;
  }
}
```

### Axios with Headers (Authentication)
```javascript
// Setting headers for single request
axios.get('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer your_token_here',
    'Content-Type': 'application/json'
  }
});

// Setting default headers for all requests
axios.defaults.headers.common['Authorization'] = 'Bearer your_token_here';
```

---

## Authentication & Authorization

### Key Differences

| Aspect | Authentication | Authorization |
|--------|---------------|---------------|
| **Question** | Who are you? | What can you do? |
| **Purpose** | Verify identity | Check permissions |
| **Example** | Login with username/password | Admin can delete, users can only view |
| **HTTP Code** | 401 (Unauthorized) | 403 (Forbidden) |
| **When** | First step | After authentication |

### Example with Fetch
```javascript
async function getProtectedData() {
  try {
    const response = await fetch('https://api.example.com/protected', {
      headers: {
        'Authorization': 'Bearer your_token_here',
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 401) {
      console.log('Not authenticated - please login');
      return;
    }
    
    if (response.status === 403) {
      console.log('Authenticated but no permission');
      return;
    }
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}


## Practice Exercises

See separate exercise files:
- `exercise1.html` - Display Users (GET)
- `exercise2.html` - Create Post Form (POST)
- `exercise3.html` - PUT vs PATCH Demo
- `exercise4.html` - Complete CRUD App
- `exercise5.html` - Error Handling Practice
- `exercise6.html` - Authentication Demo



## Quick Reference Cheat Sheet

### Fetch Template
```javascript
// GET
const res = await fetch(url);
const data = await res.json();

// POST
await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// PUT
await fetch(url, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(completeData)
});

// PATCH
await fetch(url, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(partialData)
});

// DELETE
await fetch(url, { method: 'DELETE' });
```

### Axios Template
```javascript
// GET
const res = await axios.get(url);
const data = res.data;

// POST
await axios.post(url, data);

// PUT
await axios.put(url, completeData);

// PATCH
await axios.patch(url, partialData);

// DELETE
await axios.delete(url);
```

### Status Codes to Remember
```
✅ 200 - OK (Success)
✅ 201 - Created
✅ 204 - No Content
❌ 400 - Bad Request
❌ 401 - Unauthorized (auth required)
❌ 403 - Forbidden (no permission)
❌ 404 - Not Found
❌ 422 - Validation Failed
⚠️  500 - Server Error
```

