## Architecture

This multi-step wizard form uses:

- react-hook-form for form management/validation
- react-router-dom for routing
- little-state-machine for state management
- custom components/views

Data is persisted through sessionStorage which was a technical decision based off of what I assumed to be the most optimal UX.

## Acceptance Criteria

As a user, I should be able to fill out all required information and submit the form to see a confirmation status page.

As a user, I should receive feedback when the form is incomplete or there is a server error and not be able to progress through the wizard form until all criteria are met.
