const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../dataBase/IT_PROJECTS.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the IT projects database.');
        
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='IT_PROJECTS'", (err, row) => {
            if (err) {
                console.error('Error checking for IT_PROJECTS table', err.message);
                return;
            }
            //If the table is not existent, a table gets created.
            if (!row) {
                db.run(`CREATE TABLE IT_PROJECTS (
                    PROJECT_ID INTEGER PRIMARY KEY AUTOINCREMENT,
                    PROJECT_NAME TEXT,
                    START_DATE TEXT,
                    TARGET_END_DATE TEXT,
                    ACTUAL_END_DATE TEXT,
                    CREATED_ON TEXT,
                    CREATED_BY TEXT,
                    MODIFIED_ON TEXT,
                    MODIFIED_BY TEXT
                )`, (err) => {
                    if (err) {
                        console.error('Error creating IT_PROJECTS table', err.message);
                    } else {
                        console.log('Created the IT_PROJECTS table.');
                    }
                });
            }
        });
    }
});

class ProjectRepository {
     // This function inserts a new project into the database.
    create(projectData, callback) {
        const sql = `INSERT INTO IT_PROJECTS (PROJECT_NAME, START_DATE, TARGET_END_DATE, ACTUAL_END_DATE, CREATED_ON, CREATED_BY, MODIFIED_ON, MODIFIED_BY)
                     VALUES (?, ?, ?, ?, datetime('now'), ?, datetime('now'), ?)`;
        db.run(sql, [
            projectData.PROJECT_NAME, 
            projectData.START_DATE, 
            projectData.TARGET_END_DATE, 
            projectData.ACTUAL_END_DATE, 
            projectData.CREATED_BY, 
            projectData.MODIFIED_BY
        ], function(err) {
            callback(err, { projectId: this.lastID, ...projectData });
        });
    }    

    // This function retrieves all projects from the database.
    findAll(callback) {
        const sql = `SELECT * FROM IT_PROJECTS`;
        db.all(sql, [], (err, rows) => {
            callback(err, rows);
        });
    }

    findById(projectId, callback) {
        const sql = `SELECT * FROM IT_PROJECTS WHERE PROJECT_ID = ?`;
        db.get(sql, [projectId], (err, row) => {
            callback(err, row);
        });
    }

    // This function retrieves a single project by its ID from the database.
    update(projectId, projectData, callback) {
        const sql = `UPDATE IT_PROJECTS SET PROJECT_NAME = ?, START_DATE = ?, TARGET_END_DATE = ?, ACTUAL_END_DATE = ?, CREATED_BY = ?, MODIFIED_ON = datetime('now'), MODIFIED_BY = ? WHERE PROJECT_ID = ?`;
        db.run(sql, [
            projectData.PROJECT_NAME, 
            projectData.START_DATE, 
            projectData.TARGET_END_DATE, 
            projectData.ACTUAL_END_DATE,
            projectData.CREATED_BY,
            projectData.MODIFIED_BY,
            projectId
        ], function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null, { projectId, ...projectData });
            }
        });
    }
    
    // This function deletes a project from the database.
    delete(projectId, callback) {
        const sql = `DELETE FROM IT_PROJECTS WHERE PROJECT_ID = ?`;
        db.run(sql, [projectId], function(err) {
            callback(err, { projectId });
        });
    }
}

module.exports = new ProjectRepository();
