const express = require('express');
const router = express.Router();
const projectService = require('../service/IT_PROJECTS_Service');

// POST: /projects/new to create a new project.
router.post('/projects/new', (req, res) => {
    projectService.createProject(req.body, (err, creationMessage) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(201).json(creationMessage);
        }
    });
});


// GET: /projects/all to retrieve all the projects.
router.get('/projects/all', (req, res) => {
    projectService.getAllProjects((err, projects) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(projects);
        }
    });
});

// GET: /projects/:id to retrieve a project by id.
router.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    projectService.getProjectById(id, (err, project) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    });
});

// PUT: /projects/delete/:id to update an existing project.
router.put('/projects/update/:id', (req, res) => {
    const { id } = req.params;
    projectService.updateProject(id, req.body, (err, project) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(project);
        }
    });
});

// DELETE: /projects/:id to delete an existing project.
router.delete('/projects/delete/:id', (req, res) => {
    const { id } = req.params;
    projectService.deleteProject(id, (err, result) => {
        if (err) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;
