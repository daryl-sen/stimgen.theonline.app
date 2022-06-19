# V4 Brainstorming

## Planned revamps
- UI revamp: Use React and MUI
- Backend API: handle accounts and project settings
- Continue with Python Flask as backend and host on PythonAnywhere
  - Easier to learn, lab can stick to one programming language
  - Stop using web templates, use React as the only UI
- Module library
  - A modular library that allows users to freely combine modules for projects

## Module Library

The general process of stimgen can be broken down into 5 steps:

1. Generate coordinates
2. Build object structure
3. Select object
4. Manipulate object
5. Render objects

So these can be 5 different types of modules that a user can install in their project. Modules need version control.

### Coordinates Generator

Generates coordinates for stimuli. Based on existing requirements, we already have 2 different modules that need to be created.

1. Radial Coordinates Generator: generates coordinates that are equi-distant from the center of the image.
2. Simple Segments Coordinates Generator: generates coordinates within a predefined number of segments as defined by x number of columns and y number of rows.

Only one Coordinates Generator can be installed per project.

### Object Constructor

Generates a data structure for the object with specific fields. This needs to be carefully designed, only one module should exist and it should be installed for all projects by default.

### Stimulus Selector

Module that selects a stimulus, modules can have different selection algorithms.

### Stimulus Manipulator

Performs a specific manipulation on an selected object. Current requirements will need 3 different types of modules:

1. Color flip
2. Color swap
3. Displacement

Multiple Stimulus Manipulators can be installed in a single project

### Stimulus Renderer

Renders stimuli on canvases. Can have different modules for different stimulus object types:

1. Colored blocks
2. Striated blocks
3. Circles

Only 1 renderer can be installed per project.