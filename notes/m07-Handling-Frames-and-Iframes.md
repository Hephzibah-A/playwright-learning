## M07: Handling Frames and Iframes

### 1. Understanding Frames
* Frames in Playwright refer to individual browser components located in separate parts of a page that contain their own independent content.
* Pages contain a main frame and may have additional frames attached using the HTML `<iframe>` tag.
* Playwright allows you to interact with elements inside frames, but you must explicitly target the frame first before interacting with its internal elements.

### 2. Approaches to Frame Selectors
Playwright offers two primary ways to work with frames:
* **Frame Locators:** Creates a locator specifically for a frame within the page (e.g., `page.frameLocator('iframe.frame-class')`).
* **Frame Objects:** Represents a specific frame in the page, providing a more direct way to access and manipulate it (e.g., `page.frame('frame-name')`).

### 3. Identifying and Accessing Frames
Frames can be identified and accessed using several strategies:
* **By Name:** Frames often have a `name` attribute in their HTML definition, which Playwright can use directly (e.g., `page.frame({ name: 'SingleFrame' })`).
* **By URL:** Frames can be identified by their `src` attribute URL, often using regex to match part of the path (e.g., `page.frame({ url: /SingleFrame/ })`).
* **By CSS Selector:** If a frame lacks a name or standard URL, you can locate the `<iframe>` element using a CSS selector and then access its content using `.contentFrame()` (e.g., `page.locator('iframe#my-frame').contentFrame()`).
* **By Index:** Playwright assigns an index to each frame on the page, accessible via the `page.frames()` array, where index `0` is the main page.

### 4. Handling Nested Frames (Child Frames)
* Nested frames refer to frames that are contained within another frame (typically iframes within other iframes).
* Interacting with nested frames is identical to regular frames, except you must traverse multiple layers by chaining child frame locators.
* **Navigation Steps:**
  1. Identify the parent frame locator.
  2. Identify the child frame locator from the parent.
  3. Continue chaining if there are deeper nested child frames.
  4. Locate and interact with the web element within the final child frame.