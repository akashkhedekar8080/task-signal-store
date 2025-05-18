# Angular 19 In-Memory CRUD App with NgRx Signals Store

## Overview

This is a small Angular 19 application that allows users to perform CRUD operations on in-memory data using NgRx Signals. The app includes real-time charts that update when the store changes.

## Features

- Add/Edit/Delete Tasks
- Store all data in NgRx signals store
- Reactive forms for form handling
- Live updating distribution by task status pie chart and trend over time task date line chart

## Architecture

- app
  - core
  - constants
  - store
    - methods
      - task.methods.ts
    - effects
      - task.effects.ts
    - computed
      - task.computed.ts
    - state
      - task.state.ts
    - task.store.ts
  - task
  - components
    - task graph
    - task dialog
    - task table
  - page
    - task dashboard
  - layout
  - header
  - footer

## NgRx Signal Usage

- Used signal method to add, update, delete, select task
- Used computed signals to get task by status for distribution pie chart and task by date for trend over time line chart

## Charts

- Task Status Distribution (Pie Chart)
- Tasks trend Over Time (Line Chart)

## Design Rationale

### Module & Signal Store Organization

I organized the signal store into a core module to centralize state management and make it accessible throughout the application. This separation allows components to focus on presentation while the store handles data operations and transformations.

### Pattern Selection

I chose NgRx Signals Store over traditional NgRx for several reasons:

- **Computed Signals**: These provide reactive, derived state without the boilerplate of classic selectors. For example, our chart data is automatically recalculated whenever tasks change.
- **SignalEffects**: Used for side effects like logging changes and ensuring UI updates synchronously with state changes.
- **Simplified Architecture**: The signals approach eliminates the need for actions, reducers, and effects files, resulting in more maintainable code.

### Trade-offs & Alternatives

- **Alternative Considered**: Traditional NgRx Store with actions/reducers would provide more explicit state transitions but at the cost of additional boilerplate.
- **Trade-off**: While NgRx Signals Store has less middleware support than classic NgRx, the simplified mental model and reduced code complexity outweighed this limitation for our app's size.
- **Performance Benefit**: Signal-based reactivity provides more granular updates than zone-based change detection, improving performance for our real-time charts.

This architecture provides a good balance between maintainability and reactivity while leveraging Angular 19's latest features.
