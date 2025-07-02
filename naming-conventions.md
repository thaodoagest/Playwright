## TypeScript Naming Conventions ✅

Following consistent naming conventions is crucial for writing readable, maintainable, and professional TypeScript code. This guide outlines the most widely adopted conventions.

### General Principles

  * **Clarity and descriptiveness**: Names should clearly describe the entity's purpose. Avoid overly short or cryptic names.
  * **Consistency**: Stick to the same naming style throughout your project.


-----

### Variables and Functions

Use **camelCase** for variables, functions, and method parameters.

**Variables** should be descriptive nouns or short phrases that represent the data they hold.

```typescript
let userProfile: string = "default_profile.png";
const maxRetries: number = 3;

function getUserById(userId: number): User {
  // function logic here
}
```

**Functions** should be verbs or verb phrases that describe their action.

```typescript
function calculateTotalPrice(price: number, quantity: number): number {
  return price * quantity;
}

function sendEmail(to: string, subject: string): void {
  // implementation
}
```


-----

### Constants

Use **PascalCase** or **UPPER\_CASE** for constant values that are truly immutable and widely used.

  * **PascalCase** is often used for constants within a class.
  * **UPPER\_CASE** (or "snake\_case") is the traditional choice for top-level or exported constant values.

<!-- end list -->

```typescript
export const API_KEY = "your-secret-key-here";
const MAXIMUM_LOGIN_ATTEMPTS = 5;

class Configuration {
  static readonly DefaultPort = 8080;
}
```


-----

### Classes, Enums, Interfaces, and Type Aliases

Use **PascalCase** for all constructs that define a type. This includes classes, enums, interfaces, and type aliases.

**Classes** should be nouns that represent objects.

```typescript
class ProductService {
  // class members
}

class DatabaseConnection {
  // class members
}
```

**Interfaces** and **Type Aliases** should also be descriptive nouns. A common practice is to use the suffix `Interface` or a prefix `I` for interfaces, but the modern approach often omits this to keep names clean.

```typescript
// Recommended
interface User {
  id: number;
  name: string;
}

type Point = {
  x: number;
  y: number;
};

// Also common, but can be verbose
interface IUser {
  id: number;
  name: string;
}
```

**Enums** should have a singular name that describes the set of values. Enum members should also be **PascalCase**.

```typescript
enum OrderStatus {
  Pending,
  Shipped,
  Delivered,
  Cancelled,
}

enum LogLevel {
  Info,
  Warning,
  Error,
}
```


-----

### Private Members

A common and recommended convention is to prefix private properties and methods with an underscore (`_`). This provides a quick visual cue that the member is not intended for external use, even though TypeScript's `private` keyword enforces this at compile-time.

```typescript
class Customer {
  private _id: number;

  constructor(id: number) {
    this._id = id;
  }

  private _log(): void {
    console.log(`Customer ID: ${this._id}`);
  }
}
```


-----

### File Names

File names should use **kebab-case** or **PascalCase**.

  * **kebab-case** (`my-component.ts`) is very common, especially in Angular and other frameworks.
  * **PascalCase** (`MyComponent.ts`) is often used when a file contains a single, primary class with the same name.

Choose one style and use it consistently across your project.

```bash
# Kebab-case (most common)
user-profile.component.ts
api.service.ts

# PascalCase (often for components/classes)
UserProfile.ts
ApiService.ts
```
