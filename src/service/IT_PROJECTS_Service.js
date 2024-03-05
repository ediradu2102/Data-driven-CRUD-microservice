const projectRepository = require('../repositories/IT_PROJECTS_Repository');

class ProjectService {

    /**
     * The function creates a new project after validating the date constraints.
     */
    createProject(projectData, callback) {
        try {
            const startDate = new Date(projectData.START_DATE);
            const targetEndDate = new Date(projectData.TARGET_END_DATE);
            const actualEndDate = projectData.ACTUAL_END_DATE ? new Date(projectData.ACTUAL_END_DATE) : null;

            if (startDate > targetEndDate) {
                return callback(new Error('START_DATE cannot be later than TARGET_END_DATE.'));
            }

            if (actualEndDate && startDate > actualEndDate) {
                return callback(new Error('START_DATE cannot be later than ACTUAL_END_DATE.'));
            }

            projectRepository.create(projectData, (err, project) => {
                if (err) {
                    callback(err);
                } else {
                    const creationMessage = {
                        message: "Project successfully created",
                        project: projectData
                    };
                    callback(null, creationMessage);
                }
            });
        } catch (error) {
            callback(error);
        }
    }

    /**
     * The function retrieves all projects from the repository.
     */
    getAllProjects(callback) {
        try {
            projectRepository.findAll((err, projects) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, projects.map(project => {
                        return { ...project };
                    }));
                }
            });
        } catch (error) {
            callback(error);
        }
    }

    /**
     * The function retrieves a single project by its ID from the repository.
     */
    getProjectById(projectId, callback) {
        try {
            projectRepository.findById(projectId, (err, project) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, project);
                }
            });
        } catch (error) {
            callback(error);
        }
    }

    /**
     * The function updates an existing project.
     */
    updateProject(projectId, projectData, callback) {
        try {
            const startDate = new Date(projectData.START_DATE);
            const targetEndDate = new Date(projectData.TARGET_END_DATE);
            const actualEndDate = projectData.ACTUAL_END_DATE ? new Date(projectData.ACTUAL_END_DATE) : null;

            if (startDate > targetEndDate) {
                return callback(new Error('START_DATE cannot be later than TARGET_END_DATE.'));
            }

            if (actualEndDate && startDate > actualEndDate) {
                return callback(new Error('START_DATE cannot be later than ACTUAL_END_DATE.'));
            }

            projectRepository.findById(projectId, (err, existingProject) => {
                if (err) {
                    return callback(err);
                }
                if (!existingProject) {
                    return callback(new Error(`Project with ID ${projectId} not found.`));
                }

                projectRepository.update(projectId, projectData, (err, project) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, { message: `Project with ID ${projectId} successfully updated.`, project: projectData });
                    }
                });
            });
        } catch (error) {
            callback(error);
        }
    }

    /**
     * The function deletes an existing project.
     */
    deleteProject(projectId, callback) {
        try {
            projectRepository.findById(projectId, (err, existingProject) => {
                if (err) {
                    return callback(err);
                }
                if (!existingProject) {
                    return callback(new Error(`Project with ID ${projectId} not found.`));
                }

                projectRepository.delete(projectId, (err, result) => {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, { message: `Project with ID ${projectId} successfully deleted.` });
                    }
                });
            });
        } catch (error) {
            callback(error);
        }
    }

}

module.exports = new ProjectService();
