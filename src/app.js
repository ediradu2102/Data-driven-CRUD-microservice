const express = require('express');
const projectRoutes = require('./routers/IT_PROJECTS_Router');

const app = express();
app.use(express.json());
app.use('/api', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
