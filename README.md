# Crossming Challenge

## Introduction

Thank you, Crossmint Team, for such an engaging challenge! Developing this architecture has been a fun and enlightening experience.

Below are details about the architectural decisions made for this project, followed by several notes and observations that might be of interest.

## How to Run

To set up and run the project, please follow these instructions:

1. **Set Up Environment Variables**:
   Copy the `.env.example` file to `.env` to set your environment variables:
   ```bash
   cp .env.local .env
   ```
   Also add a valid candidateId.

2. **Install Dependencies**:
   Install the necessary npm packages by running:
   ```bash
   npm install
   ```

3. **Solve Next Goal**:
   To solve the next goal, execute the following command:
   ```bash
   npm run solveNext
   ```

Please ensure you are in the project's root directory when executing these commands.

--- 

## What's that structure about?

You are looking at what is known as 'Clean Architecture', an architectural style designed to classify and decouple all the logics and structures relative to an application—or even a set of applications that work in parallel. This architecture aims to create a system that is highly decoupled, flexible, elegant, organized, and easy to configure.

--- 

### Project Structure

```
src/
├── adapters/
│   └── repositories/
│       └── api/
│           └── MegaverseApiFetcher.ts    # Implements fetching logic for the Megaverse API
│
├── core/
│   └── domain/
│       └── astrals/                      # Entities representing different 'Astral' concepts
│   └── services/
│       └── MegaverseEditor/              # Contains use case implementations for editing the Megaverse
│
├── drivers/
│   └── Fetcher.ts                        # Abstraction over network requests, implementing retries, etc.
│
├── main/
│   ├── context.ts                        # Creates and connects all the pieces that generate the environment (adapters, services, etc.)
│   ├── solveAllChallenges.ts             # Script for running the 'solve all challenges' use case
│   └── solveOneChallenge.ts              # Script for running the 'solve one challenge' use case
│
└── shared/
    └── utils/
        ├── env.ts                        # Environment configuration settings
        ├── executeInBatches.ts           # Utility function for batch execution
        └── log2dMatrix.ts                # Utility function for logging 2D matrices

```

Please note how the core directory just contains Domain & Application Business Rules Layers and how it never imports things from outside itself—it works by injection of expected structures.

Also note how main/context.ts defines all the environment of execution (logics). This file would also define databases, event gateways, even infrastructure.

--- 

## Notes

### Request Limiter:
I understand that the request limiter was explicitly created and under-documented on purpose to show my creativity and engineering abilities.
I opted to create the classic delayed retry and also added batching to leverage the amount of parallel request that the server allowed me.
Clearly a more intelligent logic could be used to do this, like decremental delays or something like that, but I found the classic good enough.
(Please read last note also)

### Core MegaverseEditor could be improved:
Some methods could be extracted and used inside main/... because those do not entirely belong to the business logics (solveNextGoalMap mainly).
I choose to let it be there, because that would require more time and I don't really have much right now! Hope you can understand (not that bad anyway).

### About logs and error handling:
This time I choose to make logs at the request level (just to get a feedback of what's happening). For a real project, I'd make an environment-dependent logging framework.
This time I chose to handle errors at the highest level, mainly because there is no need (relative to requirements) to be handled at the low level. A system that needs to publish error metrics or similar stuff would be adequate to implement low-level handling, and maybe spread the error to the higher level by rethrowing it.

### Dependencies
- **TypeScript**: Adopted for its robust type-safety features, which greatly enhance code reliability and maintainability. Its use aligns with the project's aim for high-quality standards.

- **dotenv**: Utilized for its simplicity in managing environment variables, making setup and configuration straightforward and developer-friendly.

A minimalist approach was taken regarding library usage to minimize the final bundle size, ensuring efficiency and streamlined deployments.

### On Using Language Models:
AI is a tool, and it's meant to be utilized. The integration of Language Models in this project is a testament to our commitment to harnessing advanced technologies to their fullest potential.

### Server Logic Issue:
You might have seen my comment inside core -> MegaverseEditor/index.ts -> solveNextGoalMap. I tried to implement my batching system for parallel requests there (again, not the best place).
I noticed that your server returns responses with a 200 code for the requests while the database does not reflect the change, and only when I do parallel requests.
If I have to guess, you are using a NoSQL database like MongoDB, the Megaverse structure is stored inside the same key-value, and you haven't properly configured the queries to fail if the data changed between the start and end of the execution of the update. That translates to updates overwriting each other.
This issue can be critical to a system and denotes a lack of safeguards in handling concurrent updates, which could result in data discrepancies. It's very important to address this to maintain data integrity over high concurrency systems.

Please keep in mind that the issue may be mine and I didn't notice. In that case, I would really appreciate getting feedback!

## Conclusion

I hope this documentation provides a clear view of the architectural choices and their rationales. I look forward to your feedback and am eager to discuss any aspect of this project further.

---