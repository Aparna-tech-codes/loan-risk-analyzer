# @loan-risk/logger

Reusable TypeScript logger package for the loan risk analyzer ecosystem.

![npm](https://img.shields.io/npm/v/@loan-risk/logger)

---

# Installation

```bash
pnpm add @loan-risk/logger
```

---

# Features

- Info logging
- Warning logging
- Error logging
- Debug logging
- Lightweight TypeScript API

---

# Usage

```ts
import { Logger } from "@loan-risk/logger";

const logger = new Logger({
  debug: true,
});

logger.info("Application started");

logger.warn("Warning message");

logger.error("Something failed");

logger.debug("Debug details");
```

---

# Example

```txt
[INFO] Application started
[WARN] Warning message
[ERROR] Something failed
```

---

# License

MIT