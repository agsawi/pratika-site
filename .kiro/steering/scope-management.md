# Scope Management Guidelines

When working on any specification or task:

## Stay Within Defined Scope
- Read the requirements carefully and stick to the defined acceptance criteria
- If you encounter related issues, note them but don't automatically expand scope
- Ask for clarification before making changes that go beyond the original requirements

## Avoid Common Rabbit Holes
- **Don't replace working systems** unless explicitly required
- **Don't optimize unrelated code** unless it's part of the task
- **Don't refactor entire codebases** when only specific changes are needed
- **Don't change default frameworks/libraries** unless they're broken
- **Don't develop plugins of libraries** unless there is really no battle tested version available

## When in Doubt
- Prefer minimal changes that meet requirements
- Keep existing patterns and conventions
- Focus on the specific problem being solved
- Ask the user before expanding scope significantly

## Red Flags to Watch For
- Changing more than 10-15 files for a simple feature
- Modifying framework defaults or core utilities
- Replacing working code with "better" alternatives not requested
- Making changes that affect unrelated functionality