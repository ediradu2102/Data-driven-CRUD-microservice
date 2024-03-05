class IT_Projects {
    /**
     * Anew IT Project instance with all specified attributes is constructed.
     * @param {number} projectId
     * @param {string} projectName
     * @param {string} startDate
     * @param {string} targetEndDate
     * @param {string} actualEndDate
     * @param {string} createdOn
     * @param {string} createdBy
     * @param {string} modifiedOn
     * @param {string} modifiedBy
     */
    constructor(projectId, projectName, startDate, targetEndDate, actualEndDate, createdOn, createdBy, modifiedOn, modifiedBy) {
        this.projectId = projectId;
        this.projectName = projectName;
        this.startDate = startDate;
        this.targetEndDate = targetEndDate;
        this.actualEndDate = actualEndDate;
        this.createdOn = createdOn;
        this.createdBy = createdBy;
        this.modifiedOn = modifiedOn;
        this.modifiedBy = modifiedBy;
    }

    /**
     * A new IT_Projects instance from a database row is created.
     */
    static fromDb(dbRow) {
        return new IT_Projects(
            dbRow.PROJECT_ID, 
            dbRow.PROJECT_NAME, 
            dbRow.START_DATE, 
            dbRow.TARGET_END_DATE, 
            dbRow.ACTUAL_END_DATE, 
            dbRow.CREATED_ON, 
            dbRow.CREATED_BY, 
            dbRow.MODIFIED_ON, 
            dbRow.MODIFIED_BY
        );
    }
}

module.exports = IT_Projects;