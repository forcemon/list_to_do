
# Task List Application

This is a simple Task List application built with Flask, which allows users to add, edit, delete, and reorder tasks.

## Structure

The application has a standard Flask project structure:

```
/todo_app
|-- /static
|   |-- script.js
|   `-- style.css
|-- /templates
|   |-- base.html
|   `-- index.html
`-- app.py
```

### `/static`

This directory contains static files like JavaScript and CSS.

- `script.js`: Contains all the JavaScript logic for handling tasks operations like add, edit, delete, and reorder.
- `style.css`: Contains the CSS styles for the application.

### `/templates`

This directory contains HTML templates.

- `base.html`: The base HTML which includes the necessary Bootstrap and Font Awesome links.
- `index.html`: The main HTML file which extends `base.html` and includes the task list logic.

### `app.py`

The main Flask application file. It includes the backend logic to serve the `index.html` file and the API endpoints to manage tasks.

## Features

- **Add Tasks**: Users can add new tasks to the list.
- **Edit Tasks**: Users can edit existing tasks.
- **Delete Tasks**: Users can delete tasks from the list.
- **Reorder Tasks**: Users can reorder tasks using up and down arrow buttons.

## Usage

To run the application:

1. Ensure you have Python and Flask installed.
2. Navigate to the root directory of the project and run `app.py`:
   ```bash
   python app.py
   ```
3. Open a web browser and go to `http://127.0.0.1:5000/`.

## Dependencies

- Flask: For serving the web pages and backend API.
- jQuery: For AJAX calls and DOM manipulation.
- Bootstrap: For responsive design and styling.
- Font Awesome: For icons.

## API Endpoints

- `GET /api/tareas`: Fetch all tasks.
- `POST /api/tareas`: Add a new task.
- `PUT /api/tareas/<int:indice>`: Edit an existing task.
- `DELETE /api/tareas/<int:indice>`: Delete a task.
- `POST /api/reordenar`: Reorder tasks.

---

Developed with ❤️ by forcemon - Mauricio Saenz Sastoque
